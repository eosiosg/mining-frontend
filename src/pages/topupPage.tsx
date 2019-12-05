import React from 'react';
import { 
  useRouteMatch,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import HeaderBar from '../components/HeaderBar';
import NavBar from '../components/navLink';
import ContentWrapper from 'components/blockContent';

// export class HomePage extends React.Component<{}> {
export const TopupPage: React.FC<{}> = () => {
  let { path, url } = useRouteMatch();
    return (
      <div>
        <HeaderBar title="充值" hasGoback />
        <ContentWrapper>
          <NavBar
            routes={[
              {
                url: `${path}/eos`,
                display: "EOS充值"
              },
              {
                url: `${path}/bos`,
                display: "BOS充值"
              }
            ]}
          />
        </ContentWrapper>
        <Switch>
          
          <Route path={`${path}/eos`}>
            eos
          </Route>
          <Route path={`${path}/bos`}>
            bos
          </Route>
        </Switch>
      </div>
    )
  }
export default TopupPage;