import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import { AccountInfo } from 'typings/api';
import { AppAction } from 'typings/feature';
import { AppState } from 'store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import styles from '../styles/me.module.scss'
import { Link } from 'react-router-dom';
import { accountCtrl } from 'api/backendAPI';
import { setUserInfo } from 'actions/account/effects';
import { ReactComponent as Holder } from '../static/no-activity.svg';
type Props = LinkDispatchProps & LinkStateProps;

const MeInfo: React.FC<Props> = (props) => {
  const { accountInfo } = props;
  useEffect(() => {
    if (!accountInfo.accountName) return;
    accountCtrl.getAccountInfoUsingGET(accountInfo.accountName, {})
    .then(res => props.dispatch(setUserInfo(res)));
  }, [accountInfo.accountName])
  return (
    <div>
    <div className={styles.infoPanel}>
      <p className={styles.accountName}>当前账户： {props.accountInfo.accountName}</p>
      <div className={styles.minerReward}>
        <div className={styles.content}>
          <div className={styles.block}>
            <p className={styles.contentWrapper}>
              <span>BOS总额</span>
              <p>{props.accountInfo.bosBalance}</p>
            </p>
          </div>
          <div className={styles.sep}></div>
          <div className={styles.block}>
            <p className={styles.contentWrapper}>
              <span>EOS总额</span><br/>
              <p>{props.accountInfo.eosBalance}</p>
            </p>
          </div>
        </div>
      </div>
      
    </div>
    <div className={styles.actions}>
        <span className={styles.history}>
          <span><Link to="/traderecord">交易记录</Link></span>
          <span style={{paddingLeft: '20px'}}><Link to="/soldminer">已销毁矿机</Link></span>
        </span>
        <span className={styles.tradeItem}>
          <span><Link to="/cashout">提币</Link></span>
          <span style={{marginLeft: '16px', background: '#52F8EB'}}><Link to="/topup">充值</Link></span>
        </span>
      </div>

      <div className={styles.itemContainer}>
            <div className={styles.items}>
              <Holder />
              <p>矿机数量</p>
              <p>{accountInfo.minerCount}个</p>
              </div>
            <div className={styles.items}>
              <Holder />
              <p>昨日收益</p>
              <p>{accountInfo.lastReward}</p>
            </div>
            <div className={styles.items}>
              <Holder />
              <p>累计收益</p>
              <p>{accountInfo.totalReward}</p>
            </div>
           
      </div>
    </div>
  )
}


interface LinkStateProps {
  userName?: string;
  accountInfo: AccountInfo;
}

interface LinkDispatchProps {
  dispatch: (action: AppAction) => void
}
const mapStateToProps = (state: AppState): LinkStateProps => ({
  accountInfo: state.accountInfo
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>): LinkDispatchProps => ({
  dispatch: dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeInfo);