import React from 'react';
import HomeComponent from '../feature/HomePage'
import ForgeComponent from '../feature/Forge'

export class HomePage extends React.Component<{}> {

  render() {
    return (
      <>
        <div><HomeComponent title='bigTitle' /></div>
        <ForgeComponent />
      </>
    )
  }
 
}
export default HomePage;