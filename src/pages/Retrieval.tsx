import React, { useState } from 'react';
import { 
  useRouteMatch,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import HeaderBar from '../components/HeaderBar';
import NavBar from '../components/navLink';
import ContentWrapper from 'components/blockContent';
import RetrievalComponent from 'feature/retrieve'


// export class HomePage extends React.Component<{}> {
export const Retrieval: React.FC<{}> = () => {

    return (
      <div>
        <HeaderBar title="提币" hasGoback />
        <RetrievalComponent />
      </div>
    )
  }
export default Retrieval;