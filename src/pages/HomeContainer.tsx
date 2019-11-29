import React from 'react';
import HomeComponent from '../feature/HomePage'
import ForgeComponent from '../feature/Forge'
import { 
  useRouteMatch,
  NavLink,
  Switch,
  Route
} from 'react-router-dom'
import styles from '../styles/homepage.module.scss'
import HeaderBar from '../components/HeaderBar';
// export class HomePage extends React.Component<{}> {
const HomePage: React.FC<{}> = () => {
  let { path, url } = useRouteMatch();
    return (
      <div>
        <HeaderBar title="首页" hasMe/>
        <ul>
          <li>
            <NavLink to={`${url}/mine`} activeClassName={styles.selected}>挖矿</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/forge`} activeClassName={styles.selected}>熔币</NavLink>
          </li>
        </ul>
        <Switch>
          <Route path={`${path}/mine`}>
            <HomeComponent title={'hehe'}/>
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