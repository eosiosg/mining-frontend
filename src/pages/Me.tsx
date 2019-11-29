import ActiveMiner from '../feature/ActiveMiner'
import React from 'react'

import {
  RouteComponentProps
} from 'react-router-dom'

type Props = {} & RouteComponentProps
const MeContainer: React.FC<Props> = (props) => {
    console.log(props)
    return (
      <div>
        <ActiveMiner />
      </div>
    )
  }
export default MeContainer;