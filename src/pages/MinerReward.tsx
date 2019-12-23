import React from 'react'
import HeaderBar from 'components/HeaderBar'
import MinerRewardDetail from 'feature/MinerDetail'
import { BackgroundBlock } from 'components/headBackGround'
export const MinerRewardDetailPage: React.SFC<{}> = (props) => {
  return (
    <div>
      <BackgroundBlock />
      <HeaderBar title="收益详情" hasGoback/>
      <MinerRewardDetail />
    </div>
  )
}

