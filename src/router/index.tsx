import React, { useEffect } from "react";
import { 
  Router, 
  Route, 
  Switch, 
  Redirect,
  Link, 
  NavLink } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import HomeContainer from "../pages/HomeContainer";
import SoldMinerContainer from "../pages/SoldMinerContainer";
import { getUserInfo } from "../actions/account/effects";
import { bindActionCreators } from "redux";
import { AppAction } from "../typings/feature";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import MeContainer from "../pages/Me";
import { NoPage } from "pages/NoPage";

export const history = createHistory();

// Instead of BrowserRouter, we use the regular router,
// but we pass in a customer history to it.
type Props = LinkDispatchProps & LinkStateProps;
const AppRouter: React.FC<Props> = (props) => {

  useEffect(() => {
    if (props.userName) return
    props.getUserInfo()
  }, [props.userName])

  return  (
    <div>
      
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home/mine" />
            </Route>
            <Route path="/home" component={HomeContainer} />
            <Route path="/soldminer" component={SoldMinerContainer} />
            <Route path="/me" component={MeContainer} />
            <Route component={NoPage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

interface LinkStateProps {
  userName?: string;
}

interface LinkDispatchProps {
  getUserInfo: () => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  userName: state.accountInfo.accountName
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>): LinkDispatchProps => ({
  getUserInfo: bindActionCreators(getUserInfo, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter);