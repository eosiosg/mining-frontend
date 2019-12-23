import ActiveMiner from '../feature/ActiveMiner'
import React from 'react'
import {
  RouteComponentProps
} from 'react-router-dom'
import HeaderBar from '../components/HeaderBar'
import MeInfo from 'feature/MeInfo'
import { BackgroundBlock } from 'components/headBackGround'

type Props = {} & RouteComponentProps
const MeContainer: React.FC<Props> = (props) => {
    return (
      <div>
        <BackgroundBlock />
        <HeaderBar title="个人中心" hasGoback={() => props.history.replace("/")}/>
        <MeInfo />
        <ActiveMiner />
      </div>
    )
  }
export default MeContainer;