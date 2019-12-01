import React from 'react';
import SoldMiner from '../feature/SoldMiner'
import {
  RouteComponentProps
} from 'react-router-dom'
import HeaderBar from 'components/HeaderBar';

type Props = {} & RouteComponentProps
const SoldMinerContainer: React.FC<Props> = (props) => {
    return (
      <div>
        <HeaderBar title="已销毁矿机" hasGoback/>
        <SoldMiner />
      </div>
    )
  }
export default SoldMinerContainer;