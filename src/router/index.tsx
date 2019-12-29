import React, { useEffect } from "react";
import { 
  Router, 
  Route, 
  Switch, 
  Redirect, 
  useParams,
  useLocation} from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import HomeContainer from "../pages/HomeContainer";
import SoldMinerContainer from "../pages/SoldMinerContainer";
import { getUserInfo, setUserInfo } from "../actions/account/effects";
import { bindActionCreators } from "redux";
import { AppAction } from "../typings/feature";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import MeContainer from "../pages/Me";
import { NoPage } from "pages/NoPage";
import { MinerRewardDetailPage } from "pages/MinerReward";
import MinerTradeContainer from "pages/MinerTradePage";
import TopupPage from "pages/topupPage";
import Retrieval from "pages/Retrieval";
import { accountCtrl, poolCtrl } from "api/backendAPI";
import { setForgePageInfo } from "actions/pool/effects";
import { useScatter } from "hooks";

export const history = createHistory();

// Instead of BrowserRouter, we use the regular router,
// but we pass in a customer history to it.
type Props = LinkDispatchProps & LinkStateProps;
const AppRouter: React.FC<Props> = (props) => {
  const {connected, accountName, error, isLoading} = useScatter()
  useEffect(() => {
    if (!connected && !isLoading) {
      if (process.env.NODE_ENV === "development") {
        props.dispatch(setUserInfo({accountName: "mytestalice1"}))
      }
      return;
    }
    !isLoading && props.dispatch(setUserInfo({accountName}))
  },[connected, accountName, isLoading])
  useEffect(() => {
    props.getUserInfo()
  }, [])
  useEffect(() => {
    if (!accountName) return;
    accountCtrl.getAccountInfoUsingGET(accountName, {})
    .then(res => props.dispatch(setUserInfo(res)));
  }, [accountName])
  useEffect(() => {
    if (!accountName) return;
    poolCtrl.getForgePageUsingGET(accountName)
    .then(res => {
      props.dispatch(setForgePageInfo(res));
    });
  }, [accountName]);
  return  (
    <div>
      
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home/mine" />
            </Route>
            <Route exact path="/topup">
              <Redirect to={`/topup/bos`} />
            </Route>
            <Route path="/home" component={HomeContainer} />
            <Route path="/soldminer" component={SoldMinerContainer} />
            <Route path="/me" component={MeContainer} />
            <Route path={'/miner/:minerId'} component={MinerRewardDetailPage} />
            <Route path={'/minertrade'} component={MinerTradeContainer} />
            <Route path={'/topup'} component={TopupPage} />
            <Route path={'/retrieval'} component={Retrieval} />
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
  dispatch: (action: AppAction) => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  userName: state.accountInfo.accountName
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>): LinkDispatchProps => ({
  getUserInfo: bindActionCreators(getUserInfo, dispatch),
  dispatch: dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter);