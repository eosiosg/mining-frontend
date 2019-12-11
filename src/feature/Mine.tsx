import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setUserInfo, TypeAccountInfo } from "../actions/account/effects";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../typings/feature";
import NavBar from '../components/navLink';
import { 
  useRouteMatch,
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
import { ReactComponent as MineSVG } from '../static/svg/mine3.svg';
import { ReactComponent as BenefitSVG } from '../static/svg/benefit3.svg';
import { Sticky } from "componentDecorator/stickyComponent";
import scatterEos from '../transaction/ScatterService'
interface HomePageProps {
  id?: string;
  color?: string;
  title?: string;
}

type Props = HomePageProps & LinkDispatchProps & LinkStateProps;

const HomePage: React.FC<Props> = (props) => {
  let { path, url } = useRouteMatch();
  const [buyMinerCount, setBuyMinerCount] = useState<number | string>('');
  useEffect(() => {
    if (!props.userName) return;
    accountCtrl.getAccountInfoUsingGET(props.userName, {})
    .then(res => props.dispatch(setUserInfo(res)));
  }, [props.userName])
  const handleMinerAccount = (value : string | number) => {
    if (typeof value == "string") {
      value = value !== "" ? parseInt(value, 10) : 0;
      if (isNaN(value)) return
    }
    setBuyMinerCount(value)
  }
  const handleBuyMiner = () => {
    scatterEos.buyminer(props.userName, buyMinerCount, props.accountInfo!.query!.refer)
  }
  const connection = async () => {
    const connected = await scatterEos.isConnected()
    console.log("connected:", connected)
    if (!connected) return false;
    await scatterEos.login();
  }
  useEffect(() => {
    connection()
  },[])
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
              <MineSVG />
                <p>
                  <span>矿机数量</span><br/>
                  <span>{props.accountInfo.minerCount}个</span>
                </p>
              </div>
              <div className={styles.sep}></div>
              <div className={styles.block}>
              <BenefitSVG />
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
          value={buyMinerCount}
          onchange={handleMinerAccount}
          fontSize={12}
          placeholder="输入购买矿机数量"
        />
        <div className={styles.balance}>
          账户余额：
          <span>{props.accountInfo.eosBalance}，</span>
          <span>{props.accountInfo.bosBalance}</span>
        </div>
        {/*todo: slider here*/}
        <span className={styles.estimate}>*预计收益增加</span>
        <div className={styles.btnWrapper}>
          <button onClick={handleBuyMiner}>立刻挖矿</button>
        </div>

        <div className={styles.warnning}>
          <div>
            <span>*预计到期收益只是估计值，不作为最终收益标准。</span><br/>
            <span>*投资有风险。请谨慎购买。</span>
          </div>
        </div>
        
      </ContentWrapper>
      <Sticky sides={{top: 0}}>
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
      </Sticky>
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
          <RecentTrades  />
        </Route>
        
      </Switch>
    </div>
  );
}

interface LinkStateProps {
  userName?: string;
  accountInfo: TypeAccountInfo;
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

const InputPrefix: React.FC<{}> = (props) => <span style={{padding: '8px'}}>台</span>