// 个人中心下面矿机列表
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../typings/feature";
import { bindActionCreators } from "redux";
import { setActiveMinerList } from "../actions/account/effects";
import { accountCtrl } from '../api/backendAPI';
import { MinerInfo, Pageable } from "../typings/api";
import InfiniteScroll from 'react-infinite-scroller';
import styles from '../styles/listItem.module.scss';
import classnames from 'classnames'
import { Link } from "react-router-dom";

interface MinerListPageProps {

}

type Props = MinerListPageProps & LinkDispatchProps & LinkStateProps;

const MinerList: React.FC<Props> = (props) => {
  const [isEnd, setIsEnd] = useState(
    props.totalPages
      ? props.pageInfo!.pageNumber! > props.totalPages 
      : false  
  )
  // useEffect(() => {
  //   if (!props.userName || isEnd) return;
  //   accountCtrl.getActiveMinerUsingGET(props.userName, props.pageInfo.pageNumber, props.pageInfo.pageSize)
  //   .then(res => {
  //     props.dispatch(setMinerList(res));
  //     setIsEnd(props.totalPages
  //       ? props.pageInfo!.pageNumber!+1 > props.totalPages 
  //       : false )
  //   });
  // }, [props.userName])

  const loadData = () => {
    if (!props.userName || isEnd) return;
    accountCtrl.getActiveMinerUsingGET(props.userName, props.pageInfo.pageNumber, props.pageInfo.pageSize)
    .then(res => {
      props.dispatch(setActiveMinerList(res));
      setIsEnd(props.totalPages
        ? props.pageInfo!.pageNumber!+1 > props.totalPages 
        : false )
    });
  }
  const { activeMinerList } = props;

  return (
    <div>
      <InfiniteScroll
        pageStart={props.pageInfo.pageNumber}
        loadMore={loadData}
        hasMore={!isEnd}
        loader={<div className="loader" key={0}>Loading ...</div>}
    >
        <div className={classnames(styles.itemContainer, styles.listHeader)}>
            <span>矿机ID</span>
            <span>算力</span>
            <span>累计收益</span>
        </div>
        {activeMinerList.map((miner, index) => (
          <Link to={`/miner/${miner.minerId}`}>
            <div key={miner.minerId} className={styles.itemContainer}>
              <span>{miner.minerId}</span>
              <span>{miner.pow}</span>
              <span className={classnames({[styles.buy]: !miner.sold})}>+{miner.totalRewardInEos}</span>
            </div>
          </Link>
        ))}
    </InfiniteScroll>
    </div>
  );
}

interface LinkStateProps {
  userName?: string;
  activeMinerList: MinerInfo[];
  pageInfo: Pageable;
  totalPages?: number;
}

interface LinkDispatchProps {
  dispatch: (action: AppAction) => void
}
const mapStateToProps = (state: AppState, props: MinerListPageProps): LinkStateProps => ({
  userName: state.accountInfo.accountName,
  activeMinerList: state.activeMiner.content,
  pageInfo: state.activeMiner.pageable,
  totalPages: state.activeMiner.totalPages

});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>, props: MinerListPageProps): LinkDispatchProps => ({
  dispatch: dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinerList);