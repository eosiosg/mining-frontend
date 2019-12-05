import React from 'react';
import MineComponent from '../feature/Mine'
import ForgeComponent from '../feature/Forge'
import { 
  useRouteMatch,
  Switch,
  Route
} from 'react-router-dom'
import HeaderBar from '../components/HeaderBar';
import NavBar from '../components/navLink';
import ContentWrapper from 'components/blockContent';

// export class HomePage extends React.Component<{}> {
const HomePage: React.FC<{}> = () => {
  let { path, url } = useRouteMatch();
    return (
      <div>
        <HeaderBar title="首页" hasMe/>
          <ContentWrapper>
            <NavBar
              routes={[
                {
                  url: `${url}/mine`,
                  display: "挖矿"
                },
                {
                  url: `${url}/forge`,
                  display: "熔币"
                }
              ]}
            />
          </ContentWrapper>
        <Switch>
          <Route path={`${path}/mine`}>
            <MineComponent />
          </Route>
          <Route path={`${path}/forge`}>
            <ForgeComponent />
          </Route>
          
        </Switch>
        {/* <ActiveMiner /> */}
        {/* <SoldMiner /> */}
      </div>
    )
  }
export default HomePage;