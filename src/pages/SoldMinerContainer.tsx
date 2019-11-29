import React from 'react';
import SoldMiner from '../feature/SoldMiner'
import {
  RouteComponentProps
} from 'react-router-dom'

type Props = {} & RouteComponentProps
const SoldMinerContainer: React.FC<Props> = (props) => {
    console.log(props)
    return (
      <div>
        <SoldMiner />
      </div>
    )
  }
export default SoldMinerContainer;