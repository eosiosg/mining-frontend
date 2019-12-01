import React from 'react'
import HeaderBar from 'components/HeaderBar'

export const NoPage: React.SFC<{}> = (props) => {
  return (
    <div>
      <HeaderBar title="功能未完成" hasGoback/>
      <h3>正在开发中....</h3>
    </div>
  )
}

