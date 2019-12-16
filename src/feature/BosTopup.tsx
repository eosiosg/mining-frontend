import React from 'react';
import ContentWrapper from 'components/blockContent';
import styles from 'styles/topup/topup.module.scss'
import TextInput from 'components/inputElement';
import { StateType } from 'pages/topupPage';
import {connect} from 'react-redux'
import config from '../config/config'
import { AppState } from 'store/configureStore';
import { AccountInfo } from 'typings/api';
import scatterEos from 'transaction/ScatterService';

const BosTopup: React.FC<{
  transactionInfo: StateType,
  onchange: (value: string | number) => void
} & LinkStateProps> = (props) => {
  const handleTopUp = () => {
    scatterEos.transferbos(
      props.accountInfo.accountName, 
      config.contract, 
      `${props.transactionInfo.amountBos.toFixed(4)} BOS`,
      ''
    )
  }
  return (
    <div>
    <ContentWrapper>
      <div style={{height: `${20/37.5}rem`}}></div>
      <div className={styles.hintTips}>
        充值数量
        <span className={styles.extraAction}>
          <span>BOS</span>|<span onClick={() => props.onchange(props.accountInfo!.bosBalance!.split(' ')[0])}>全部</span> 
        </span>  
      </div>
      <TextInput
        value={props.transactionInfo.amountBos}
        placeholder="最小充值数量10"
        onchange={props.onchange}
        fontSize={14}
        prefix={null}
      />
      <div className={styles.bosRemain}>{`当前账户可用 ${props.accountInfo!.bosBalance}`}</div>
      <div className={styles.btnWrapper}>
        <button onClick={handleTopUp}>充值</button>
      </div>
  
      </ContentWrapper>
      </div>
  )
}


interface LinkStateProps {
  accountInfo?: AccountInfo,
}
const mapStateToProps = (state: AppState): LinkStateProps => ({
  accountInfo: state.accountInfo,
});
export default connect(
  mapStateToProps,
  null
)(BosTopup);