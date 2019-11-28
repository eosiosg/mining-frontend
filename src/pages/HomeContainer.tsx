import React from 'react';
import HomeComponent from '../feature/HomePage'
import ForgeComponent from '../feature/Forge'
import ActiveMiner from '../feature/ActiveMiner'

export class HomePage extends React.Component<{}> {

  render() {
    return (
      <>
        <div><HomeComponent title='bigTitle' /></div>
        <ForgeComponent />
        <ActiveMiner />
      </>
    )
  }
 
}
export default HomePage;