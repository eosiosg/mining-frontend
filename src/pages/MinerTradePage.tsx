import React from 'react';
import MinerTrade from '../feature/MinerTrade'
import {
  RouteComponentProps
} from 'react-router-dom'
import HeaderBar from 'components/HeaderBar';

type Props = {} & RouteComponentProps
const MinerTradeContainer: React.FC<Props> = (props) => {
    return (
      <div>
        <HeaderBar title="矿机交易记录" hasGoback/>
        <MinerTrade />
      </div>
    )
  }
export default MinerTradeContainer;