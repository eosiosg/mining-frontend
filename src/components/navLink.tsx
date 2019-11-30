import React from 'react'
import { 
  NavLink,

} from 'react-router-dom';
import navStyles from '../styles/navLink.module.scss';
import { exact } from 'prop-types';

type Props = {
  noBottomBorder?: boolean;
  routes: Array<{
    exact: boolean;
    url: string;
    display: string;
  }>
  gap?: number;
}
const NavBar: React.FC<Props> = ({
  routes,
  noBottomBorder,
  gap
}) => {
  return (
    
      <ul className={navStyles.linkContainer}>
        {routes.map((route, index) => (
          <li 
            className={noBottomBorder ? navStyles.noBottomBorder : ''}
            style={{
              marginRight: !!gap ? `${(gap/37.5).toFixed(8)}rem` : ""
            }}
          >
            <NavLink exact={route.exact} key={index} to={route.url} activeClassName={navStyles.selected}>{route.display}</NavLink>
          </li>
        ))}
      </ul>
  )
}

export default NavBar;