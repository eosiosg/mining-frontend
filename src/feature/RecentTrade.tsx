// 个人中心下面矿机列表
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../typings/feature";
import { setRecentTradeList } from "../actions/account/effects";
import { accountCtrl, poolCtrl } from '../api/backendAPI';
import { MinerInfo, Pageable, MinerTradeInfo } from "../typings/api";
import listStyles from '../styles/listItem.module.scss';
import styles from '../styles/homepage.module.scss'
import classnames from 'classnames'
interface MinerListPageProps {

}

type Props = MinerListPageProps & LinkDispatchProps & LinkStateProps;

const RecentTrades: React.FC<Props> = (props) => {
  useEffect(() => {
    if (!props.userName) return;
    poolCtrl.getRecentTradesUsingGET(props.userName)
    .then(res => {
      props.dispatch(setRecentTradeList(res));
    });
  }, [props.userName])
  const { recentTradeList } = props;

  return (
    <div className={styles.recentTrade}>
      
        {recentTradeList.map((trade, index) => (
         
            <div key={index} className={listStyles.itemContainer}>
              <span>{trade.tradeTimestamp}</span>
              <span>{trade.account}</span>
              <span 
                className={classnames({
                  [listStyles.buy]: !trade.buy
                })}
              >{trade.tradeEos}</span>
            </div>
        ))}
    </div>
  );
}

interface LinkStateProps {
  userName?: string;
  recentTradeList: MinerTradeInfo[];
}

interface LinkDispatchProps {
  dispatch: (action: AppAction) => void
}
const mapStateToProps = (state: AppState, props: MinerListPageProps): LinkStateProps => ({
  userName: state.accountInfo.accountName,
  recentTradeList: state.recentTrade,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>, props: MinerListPageProps): LinkDispatchProps => ({
  dispatch: dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentTrades);