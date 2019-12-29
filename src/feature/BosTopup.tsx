import React from 'react';
import ContentWrapper from 'components/blockContent';
import styles from 'styles/topup/topup.module.scss'
import TextInput from 'components/inputElement';
import { StateType } from 'pages/topupPage';
import {connect} from 'react-redux'
import config from '../config/config'
import { AppState } from 'store/configureStore';
import { AccountInfo, ForgePage } from 'typings/api';
import scatterEos from 'transaction/ScatterService';
import { accountCtrl, poolCtrl } from 'api/backendAPI';
import { setUserInfo } from 'actions/account/effects';
import { AppAction } from 'typings/feature';
import { ThunkDispatch } from 'redux-thunk';
import { setForgePageInfo } from 'actions/pool/effects';

const BosTopup: React.FC<{
  transactionInfo: StateType,
  onchange: (value: string | number) => void
} & LinkStateProps & LinkDispatchProps> = (props) => {
  const handleTopUp = () => {
    scatterEos.transferbos(
      props.accountInfo.accountName, 
      config.contract, 
      `${(+props.transactionInfo.amountBos).toFixed(4)} BOS`,
      ''
    ).then(res => {
      if (res) {
        props.onchange(0)
        accountCtrl.getAccountInfoUsingGET(props.accountInfo.accountName, {})
        .then(res => props.dispatch(setUserInfo(res)));
        poolCtrl.getForgePageUsingGET(props.accountInfo.accountName)
          .then(res => {
            props.dispatch(setForgePageInfo(res));
          });
      }
    })
  }
  return (
    <div>
    <ContentWrapper>
      <div style={{height: `${20/37.5}rem`}}></div>
      <div className={styles.hintTips}>
        充值数量
        <span className={styles.extraAction}>
          <span>BOS</span>|<span onClick={() => props.onchange(props.forgePageInfo!.accountInfo!.availableBosOutside.split(' ')[0])}>全部</span> 
        </span>  
      </div>
      <TextInput
        value={props.transactionInfo.amountBos}
        placeholder="最小充值数量10"
        onchange={props.onchange}
        fontSize={14}
        prefix={null}
      />
      <div className={styles.bosRemain}>{`当前账户可用 ${props.forgePageInfo!.accountInfo!.availableBosOutside}`}</div>
      <div className={styles.btnWrapper}>
        <button onClick={handleTopUp}>充值</button>
      </div>
  
      </ContentWrapper>
      </div>
  )
}


interface LinkStateProps {
  accountInfo?: AccountInfo,
  forgePageInfo?: ForgePage
}
interface LinkDispatchProps {
  dispatch: (action: AppAction) => void;
}
const mapStateToProps = (state: AppState): LinkStateProps => ({
  accountInfo: state.accountInfo,
  forgePageInfo: state.forge.forgePageInfo
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>): LinkDispatchProps => ({
  dispatch: dispatch
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BosTopup);