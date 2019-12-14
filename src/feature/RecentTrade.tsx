// 个人中心下面矿机列表
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../typings/feature";
import { setRecentTradeList } from "../actions/account/effects";
import { poolCtrl } from '../api/backendAPI';
import {MinerTradeInfo } from "../typings/api";
import listStyles from '../styles/listItem.module.scss';
import styles from '../styles/homepage.module.scss'
import classnames from 'classnames'
import { timeFormat } from "util/time";
import { Link } from "react-router-dom";
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
            <a href={trade.link} target="_blank" key={index}>
            <div key={index} className={listStyles.itemContainer}>
              <span>{timeFormat(trade.tradeTimestamp)}</span>
              <span>{trade.account}</span>
              <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}>
                <p 
                  className={classnames({
                    [listStyles.buy]: !trade.buy
                  })}
                  style={{
                    padding: '3px 0'
                  }}
                >{trade.tradeEos}</p>
                <p 
                  className={classnames({
                    [listStyles.buy]: !trade.buy
                  })}
                  style={{
                    padding: '3px 0'
                  }}
                >{trade.tradeBos}</p>
              </div>
              
            </div>
            </a>
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