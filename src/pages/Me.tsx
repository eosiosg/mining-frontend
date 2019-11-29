import ActiveMiner from '../feature/ActiveMiner'
import React from 'react'

import {
  RouteComponentProps
} from 'react-router-dom'
import HeaderBar from '../components/HeaderBar'

type Props = {} & RouteComponentProps
const MeContainer: React.FC<Props> = (props) => {
    console.log(props)
    return (
      <div>
        <HeaderBar title="首页" hasMe hasGoback/>
        <ActiveMiner />
      </div>
    )
  }
export default MeContainer;