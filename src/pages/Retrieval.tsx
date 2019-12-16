import React from 'react';
import HeaderBar from '../components/HeaderBar';
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