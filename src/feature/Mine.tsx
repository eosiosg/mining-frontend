import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setUserInfo } from "../actions/account/effects";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../typings/feature";
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
import TextInput from "components/inputElement";
import Rules from "./rules";
import RecentTrades from './RecentTrade'
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
        <TextInput
          prefix={<InputPrefix />}
          value={'adasdf123'}
          onchange={(value) => console.log(value)}
          fontSize={12}
        />
        <div className={styles.balance}>
          账户余额：
          <span>{props.accountInfo.eosBalance}，</span>
          <span>{props.accountInfo.bosBalance}</span>
        </div>
        {/*todo: slider here*/}
        <span className={styles.estimate}>*预计收益增加</span>
        <div className={styles.btnWrapper}>
          <button onClick={() => alert('挖')}>立刻挖矿</button>
        </div>

        <div className={styles.warnning}>
          <div>
            <span>*预计到期收益只是估计值，不作为最终收益标准。</span><br/>
            <span>*投资有风险。请谨慎购买。</span>
          </div>
        </div>
        
      </ContentWrapper>
      <div className={styles.info}>
        <NavBar 
          noBottomBorder={true}
          routes={[
            {
              url: url,
              exact: true,
              display: "规则"
            },
            {
              url: `${url}/recenttrade`,
              exact: true,
              display: "最近交易"
            }
          ]}
          gap={5}
        />
      </div>
      
   
      <Switch>
        <Route exact path={`${path}`}>
          <div style={{
            marginTop: `${(13/37.5).toFixed(8)}rem`
          }}>
          <ContentWrapper>
            <Rules />
          </ContentWrapper>
          </div>
        </Route>
        <Route path={`${path}/recenttrade`}>
          <RecentTrades />
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

const InputPrefix: React.FC<{}> = (props) => <span>个</span>