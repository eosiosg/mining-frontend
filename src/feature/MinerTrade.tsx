// 最近交易 个人中心
// 个人中心下面矿机列表
import React, {useState, useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../typings/feature";
import { setMinerTrade, emptyMinerTrade } from "../actions/account/effects";
import { accountCtrl } from '../api/backendAPI';
import {Pageable, MinerTradeInfo } from "../typings/api";
import InfiniteScroll from 'react-infinite-scroller';
import styles from '../styles/listItem.module.scss';
import classnames from 'classnames'
import { Sticky } from "componentDecorator/stickyComponent";
import { timeFormat } from "util/time";
import { Loader, EndFlag } from "components/loadingHolder";
import listStyles from '../styles/listItem.module.scss';
interface MinerListPageProps {

}

type Props = MinerListPageProps & LinkDispatchProps & LinkStateProps;

const MinerTrade: React.FC<Props> = (props) => {
  const [isEnd, setIsEnd] = useState(
    props.totalPages
      ? props.pageInfo!.pageNumber! > props.totalPages 
      : false  
  )

  const loadData = () => {
    if (!props.userName || isEnd) return;
    accountCtrl.getMinerTradeUsingGET(props.userName, props.pageInfo.pageNumber, props.pageInfo.pageSize)
    .then(res => {
      props.dispatch(setMinerTrade(res));
      setIsEnd(typeof(props.totalPages) !== 'undefined'
        ? props.pageInfo!.pageNumber!+1 >= props.totalPages 
        : false )
    });
  }
  useEffect(() => {
    props.dispatch(emptyMinerTrade())
  }, [])
  const { minerTrade } = props;

  return (
    <div>
      <InfiniteScroll
        pageStart={props.pageInfo.pageNumber}
        loadMore={loadData}
        hasMore={!isEnd}
        loader={<Loader />}
    >
        <Sticky sides={{top: 0}}>
        <div className={classnames(styles.itemContainer, styles.listHeader)}>
            <span>时间</span>
            <span>交易数量（个）</span>
            <span>金额</span>
        </div>
        </Sticky>
        {minerTrade.map((miner, index) => (
          <a href={miner.link} target="_blank" key={index} rel="noopener noreferrer">
            <div className={styles.itemContainer}>
              <span>{timeFormat(miner.tradeTimestamp)}</span>
              {miner.buy ? <span>买入{miner.tradeAmount}个</span> : <span>卖出{miner.tradeAmount}个</span>}
              <span>
                <div className={styles.multilineWrapper}>
                <p className={classnames({
                    [listStyles.buy]: !miner.buy
                  })}>{miner.tradeEos}</p>
                <p className={classnames({
                    [listStyles.buy]: !miner.buy
                  })}>{miner.tradeBos}</p>
                </div>
              </span>
            </div>
          </a>
        ))}
    </InfiniteScroll>
    {isEnd && <EndFlag />}
    </div>
  );
}

interface LinkStateProps {
  userName?: string;
  minerTrade: MinerTradeInfo[];
  pageInfo: Pageable;
  totalPages?: number;
}

interface LinkDispatchProps {
  dispatch: (action: AppAction) => void
}
const mapStateToProps = (state: AppState, props: MinerListPageProps): LinkStateProps => ({
  userName: state.accountInfo.accountName,
  minerTrade: state.pageMinerTrade.content,
  pageInfo: state.pageMinerTrade.pageable,
  totalPages: state.pageMinerTrade.totalPages

});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>, props: MinerListPageProps): LinkDispatchProps => ({
  dispatch: dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinerTrade);
