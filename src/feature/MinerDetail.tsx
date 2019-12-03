import React, { useState } from 'react'
import {connect} from 'react-redux'
import { AppAction } from 'typings/feature';
import { AppState } from 'store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { accountCtrl } from 'api/backendAPI';
import InfiniteScroll from 'react-infinite-scroller';
import classnames from 'classnames'
import listStyles from '../styles/listItem.module.scss';
import { Pageable, MinerRewardDetail } from 'typings/api';
import { useParams } from 'react-router-dom';
type Props = LinkDispatchProps & LinkStateProps;

export const MinerRewardDetailPage: React.FC<Props> = (props) => {
  let { minerId } = useParams<{minerId: string}>();
  const [rewardList, setRewardList] = useState<MinerRewardDetail[]>([])
  const [pageInfo, setPageInfo] = useState<Pageable & {totalPages?: number}>({
    pageSize: 40,
    pageNumber: 0,
  })
  const [isEnd, setIsEnd] = useState(
    pageInfo.totalPages
      ? pageInfo.pageNumber! > pageInfo.totalPages 
      : false  
  )
  
  const loadData = () => {
    if (!props.userName || isEnd) return;
    accountCtrl.getMinerRewardDetailInfoUsingGET(props.userName, parseInt(minerId, 10), pageInfo.pageNumber!, pageInfo.pageSize)
    .then(res => {
      setRewardList(rewardList.concat(res.content!))
      setPageInfo({
        pageSize: 40,
        pageNumber: res.pageable!.pageNumber!+1,
        totalPages: res.totalPages
      })
      setIsEnd(pageInfo.totalPages
        ? pageInfo.pageNumber!+1 > pageInfo.totalPages
        : false )
    });
  }
  return (
    <div>
      <InfiniteScroll
        pageStart={pageInfo.pageNumber}
        loadMore={loadData}
        hasMore={!isEnd}
        loader={<div className="loader" key={0}>Loading ...</div>}
    >
      <div className={classnames(listStyles.itemContainer, listStyles.listHeader)}>
        <span>时间</span>
        <span>收益</span>
      </div>
      {rewardList.map((reward, index) => (
        <a href={reward.link} target="_blank">
        <div key={index} className={listStyles.itemContainer}>
          <span>{reward.rewardTimestamp}</span>
          <span>{reward.reward}</span>
        </div>
        </a>
      ))}
    </InfiniteScroll>
    {isEnd && "我是有底线的"}
    </div>
  );
}

interface LinkStateProps {
  userName?: string;
  // minerRewardList: MinerRewardDetail[];
  // minerId: 
  // pageInfo: Pageable;
  // totalPages?: number;
}

interface LinkDispatchProps {
  dispatch: (action: AppAction) => void
}
const mapStateToProps = (state: AppState): LinkStateProps => ({
  userName: state.accountInfo.accountName,
  // minerRewardList: state.minerReward.content,
  // pageInfo: state.minerReward.pageable,
  // totalPages: state.minerReward.totalPages

});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>): LinkDispatchProps => ({
  dispatch: dispatch
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinerRewardDetailPage);