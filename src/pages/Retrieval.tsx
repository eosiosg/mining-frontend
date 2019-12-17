import React from 'react';
import HeaderBar from '../components/HeaderBar';
import RetrievalComponent from 'feature/retrieve'
import { useHistory } from 'react-router';


// export class HomePage extends React.Component<{}> {
export const Retrieval: React.FC<{}> = () => {
    let history = useHistory();
    return (
      <div>
        <HeaderBar title="提币" hasGoback={() => history.replace("/me")} />
        <RetrievalComponent />
      </div>
    )
  }
export default Retrieval;