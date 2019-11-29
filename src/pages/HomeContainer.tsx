import React from 'react';
import HomeComponent from '../feature/HomePage'
import ForgeComponent from '../feature/Forge'
import { 
  useRouteMatch,
  NavLink,
  Switch,
  Route
} from 'react-router-dom'
import styles from './homepage.module.scss'
// export class HomePage extends React.Component<{}> {
const HomePage: React.FC<{}> = () => {
  let { path, url } = useRouteMatch();
    return (
      <div>
        <ul>
          <li>
            <NavLink to={`${url}/mine`} activeClassName={styles.selected}>挖矿</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/forge`} activeClassName={styles.selected}>熔币</NavLink>
          </li>
        </ul>
        <Switch>
          <Route exact path={path}>
            <HomeComponent />
          </Route>
          <Route path={`${path}/mine`}>
            <HomeComponent />
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