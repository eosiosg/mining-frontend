// 单个矿机的收益详情
import React, { useState } from 'react'
import {connect} from 'react-redux'
import { AppAction } from 'typings/feature';
import { AppState } from 'store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { accountCtrl } from 'api/backendAPI';
import InfiniteScroll from 'react-infinite-scroller';
import classnames from 'classnames'
import listStyles from '../styles/listItem.module.scss';
import { Pageable, MinerRewardDetail, MinerInfo } from 'typings/api';
import { useParams } from 'react-router-dom';
import { Sticky } from 'componentDecorator/stickyComponent';
import meStyle from 'styles/me.module.scss'
type Props = LinkDispatchProps & LinkStateProps;

export const MinerRewardDetailPage: React.FC<Props> = (props) => {
  const { minerInfoList } =props;
  let { minerId } = useParams<{minerId: string}>();

  // minerSummary 是收益总结
  const minerSummary = minerInfoList.find((miner) => miner.minerId == minerId);
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
      <div className={classnames(meStyle.infoPanel, meStyle.wrapper, meStyle.panelMargin)}>
        <div className={classnames(meStyle.inlineBlock)}>
          <p className={classnames(meStyle.accountName, meStyle.summaryPageAccount)}>
            矿机ID: {minerId}
          </p>
          {minerSummary && <p className={meStyle.eosReward}>{minerSummary.totalRewardInEos}</p>}
          {minerSummary && <p className={meStyle.cnyReward}>{minerSummary.totalRewardInCny}</p>}
        </div>
      </div>
      <InfiniteScroll
        pageStart={pageInfo.pageNumber}
        loadMore={loadData}
        hasMore={!isEnd}
        loader={<div className="loader" key={0}>Loading ...</div>}
    >
      <Sticky sides={{top: 0}}>
        <div className={classnames(listStyles.itemContainer, listStyles.listHeader)}>
          <span>时间</span>
          <span>收益</span>
        </div>
      </Sticky>
      {rewardList.map((reward, index) => (
        <a href={reward.link} target="_blank">
        <div key={index} className={listStyles.itemContainer}>
          <span>{reward.rewardTimestamp}</span>
          <span className={classnames(listStyles.buy)}>{`+${reward.reward}`}</span>
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
  minerInfoList: MinerInfo[]
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
  minerInfoList: state.activeMiner.content,
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