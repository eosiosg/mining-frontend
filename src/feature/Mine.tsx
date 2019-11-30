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
import NavBar from '../components/navLink';
import { 
  useRouteMatch,
  NavLink,
  Switch,
  Route
} from 'react-router-dom'
import { accountCtrl } from '../api/backendAPI';
import styles from '../styles/homepage.module.scss'
import ContentWrapper from "components/blockContent";
import { AccountInfo } from "typings/api";

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
      <ContentWrapper>
        <div className={styles.accountInfo}> 
          <div className={styles.banner}>
            <div className={styles.content}>
              <p className={styles.title}>矿池总额</p>
              <p className={styles.totleEos}>{props.accountInfo.totalReward}</p>
              <p className={styles.minerPrice}>矿机单价：<span>{props.accountInfo.eosBalance}</span></p>
            </div>
          </div>
          <div className={styles.minerReward}>
            <div className={styles.content}>
              <div className={styles.block}>
                <p>
                  <span>矿机数量</span><br/>
                  <span>{props.accountInfo.minerCount}个</span>
                </p>
              </div>
              <div className={styles.sep}></div>
              <div className={styles.block}>
                <p>
                  <span>昨日收益</span><br/>
                  <span>+{props.accountInfo.lastReward}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
       
      <NavBar 
        noBottomBorder={true}
        routes={[
          {
            url: url,
            exact: true,
            display: "简介"
          },
          {
            url: `${url}/recenttrade`,
            exact: true,
            display: "最近交易"
          }
        ]}
      />
   
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
  accountInfo: AccountInfo;
}

interface LinkDispatchProps {
  dispatch: (action: AppAction) => void
}
const mapStateToProps = (state: AppState, props: HomePageProps): LinkStateProps => ({
  userName: state.accountInfo.accountName,
  accountInfo: state.accountInfo
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>, props: HomePageProps): LinkDispatchProps => ({
  dispatch: dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
