// 个人中心下面矿机列表
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../typings/feature";
import { bindActionCreators } from "redux";
import { setSoldMinerList } from "../actions/account/effects";
import { accountCtrl } from '../api/backendAPI';
import { MinerInfo, Pageable } from "../typings/api";
import InfiniteScroll from 'react-infinite-scroller';
import styles from '../styles/listItem.module.scss';
import classnames from 'classnames'
import { Sticky } from "componentDecorator/stickyComponent";
import { Link } from "react-router-dom";
import { EndFlag, Loader } from "components/loadingHolder";
interface MinerListPageProps {

}

type Props = MinerListPageProps & LinkDispatchProps & LinkStateProps;

const MinerList: React.FC<Props> = (props) => {
  const [isEnd, setIsEnd] = useState(
    props.totalPages
      ? props.pageInfo!.pageNumber! > props.totalPages 
      : false  
  )
  const loadData = () => {
    if (!props.userName || isEnd) return;
    accountCtrl.getSoldMinerUsingGET(props.userName, props.pageInfo.pageNumber, props.pageInfo.pageSize)
    .then(res => {
      props.dispatch(setSoldMinerList(res));
      setIsEnd(props.totalPages
        ? props.pageInfo!.pageNumber!+1 >= props.totalPages 
        : false )
    });
  }
  const { soldMinerList } = props;

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
          <span>矿机ID</span>
          <span>累计收益</span>
        </div>
      </Sticky>
      {soldMinerList.map((miner, index) => (
        <Link to={{pathname: `/miner/${miner.minerId}`, state: {from: 'soldMiner'}}}>
        <div key={miner.minerId} className={styles.itemContainer}>
          <span>{miner.minerId}</span>
          <span>{miner.totalRewardInEos}</span>
        </div>
        </Link>
      ))}
    </InfiniteScroll>
    {isEnd && <EndFlag />}
    </div>
  );
}

interface LinkStateProps {
  userName?: string;
  soldMinerList: MinerInfo[];
  pageInfo: Pageable;
  totalPages?: number;
}

interface LinkDispatchProps {
  dispatch: (action: AppAction) => void
}
const mapStateToProps = (state: AppState, props: MinerListPageProps): LinkStateProps => ({
  userName: state.accountInfo.accountName,
  soldMinerList: state.soldMiner.content,
  pageInfo: state.soldMiner.pageable,
  totalPages: state.soldMiner.totalPages

});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>, props: MinerListPageProps): LinkDispatchProps => ({
  dispatch: dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinerList);