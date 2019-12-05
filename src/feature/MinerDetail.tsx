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
import { useParams, useLocation } from 'react-router-dom';
import { Sticky } from 'componentDecorator/stickyComponent';
import meStyle from 'styles/me.module.scss'
import { timeFormat } from 'util/time';
import { EndFlag, Loader } from 'components/loadingHolder';
type Props = LinkDispatchProps & LinkStateProps;

export const MinerRewardDetailPage: React.FC<Props> = (props) => {
  const { minerInfoList, soldMinerList } = props;
  let { minerId } = useParams<{minerId: string}>();
  const location = useLocation();
  // minerSummary 是收益总结
  const infoList = location.state.from === 'soldMiner'
                    ? soldMinerList
                    : location.state.from === 'activeMiner'
                      ? minerInfoList : []

  const minerSummary = infoList.find((miner) => miner.minerId === minerId);
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
  const [isFetching, setIsFetching] = useState(false);
  const loadData = () => {
    if (!props.userName || isFetching || isEnd) return;
    setIsFetching(true)
    accountCtrl.getMinerRewardDetailInfoUsingGET(props.userName, parseInt(minerId, 10), pageInfo.pageNumber!, pageInfo.pageSize)
    .then(res => {
      setRewardList(rewardList.concat(res.content!))
      setPageInfo({
        pageSize: 40,
        pageNumber: res.pageable!.pageNumber!+1,
        totalPages: res.totalPages
      })
      setIsEnd(res.totalPages! > -1
        ? res.pageable!.pageNumber!+1 >= res.totalPages!
        : false )
      setIsFetching(false);
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
        loader={<Loader />}
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
          <span>{timeFormat(reward.rewardTimestamp)}</span>
          <span className={classnames(listStyles.buy)}>{`+${reward.reward}`}</span>
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
  minerInfoList: MinerInfo[],
  soldMinerList: MinerInfo[],
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
  soldMinerList: state.soldMiner.content
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