import React, { useEffect } from "react";
import { connect } from "react-redux";
import { startEditExpense, startRemoveExpense } from "../actions/expense/effects";
import { getUserInfo, setUserInfo } from "../actions/account/effects";
import { Expense } from "../typings/feature/Expense";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../typings/feature";
import { bindActionCreators } from "redux";
import linkStyles from '../styles/homepage.module.scss'
import { 
  useRouteMatch,
  NavLink,
  Switch,
  Route
} from 'react-router-dom'
import { accountCtrl } from '../api/backendAPI';
import styles from '../styles/style.module.scss'

interface HomePageProps {
  id?: string;
  color?: string;
  title?: string;
}

type Props = HomePageProps & LinkDispatchProps & LinkStateProps;

const HomePage: React.FC<Props> = (props) => {
  let { path, url } = useRouteMatch();
  useEffect(() => {
    if (!props.userName) return;
    accountCtrl.getAccountInfoUsingGET(props.userName, {})
    .then(res => props.dispatch(setUserInfo(res)));
  }, [props.userName])
  return (
    <div>
      <ul>
          <li>
            <NavLink to={`${url}`} activeClassName={linkStyles.selected}>简介</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/recenttrade`} activeClassName={linkStyles.selected}>最近交易</NavLink>
          </li>
        </ul>
      <h1 className={styles.fontColor}>{props.title}</h1>
      <Switch>
          <Route exact path={`${path}`}>
            简介
          </Route>
          <Route path={`${path}/recenttrade`}>
            最近交易
          </Route>
        </Switch>
    </div>
  );
}

interface LinkStateProps {
  userName?: string;
}

interface LinkDispatchProps {
  dispatch: (action: AppAction) => void
}
const mapStateToProps = (state: AppState, props: HomePageProps): LinkStateProps => ({
  userName: state.accountInfo.accountName
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>, props: HomePageProps): LinkDispatchProps => ({
  dispatch: dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
