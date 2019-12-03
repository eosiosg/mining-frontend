import React from 'react'
import HeaderBar from 'components/HeaderBar'
import MinerRewardDetail from 'feature/MinerDetail'
export const MinerRewardDetailPage: React.SFC<{}> = (props) => {
  return (
    <div>
      <HeaderBar title="收益详情" hasGoback/>
      <MinerRewardDetail />
    </div>
  )
}

