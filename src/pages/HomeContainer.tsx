import React from 'react';
import HomeComponent from '../feature/HomePage'
import ForgeComponent from '../feature/Forge'
import ActiveMiner from '../feature/ActiveMiner'
import SoldMiner from '../feature/SoldMiner'

export class HomePage extends React.Component<{}> {

  render() {
    return (
      <>
        <div><HomeComponent title='bigTitle' /></div>
        <ForgeComponent />
        {/* <ActiveMiner /> */}
        <SoldMiner />
      </>
    )
  }
 
}
export default HomePage;