import React from 'react'
import {connect} from 'react-redux'
import { AccountInfo } from 'typings/api';
import { AppAction } from 'typings/feature';
import { AppState } from 'store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import styles from '../styles/me.module.scss'

type Props = LinkDispatchProps & LinkStateProps;

const MeInfo: React.FC<Props> = (props) => {
  return (
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