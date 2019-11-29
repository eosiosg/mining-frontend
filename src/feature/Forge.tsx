// 熔币
// 倒计时那玩意

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { AppAction } from "../typings/feature";
import { bindActionCreators } from "redux";
import { setForgeInfo } from "../actions/pool/effects";
import { poolCtrl } from '../api/backendAPI';
import { getUserInfo } from "../actions/account/effects";
import { ForgeInfo } from "../typings/api";

interface ForgePageProps {

}

type Props = ForgePageProps & LinkDispatchProps & LinkStateProps;

const ForgePage: React.FC<Props> = (props) => {
  useEffect(() => {
    if (!props.userName) return;
    poolCtrl.getForgeInfoUsingGET()
    .then(res => props.dispatch(setForgeInfo(res)));
  }, [props.userName])
  const { forgeInfo } = props;
  return (
    <div>
      {JSON.stringify(forgeInfo)}
    </div>
  );
}

interface LinkStateProps {
  userName?: string;
  forgeInfo: ForgeInfo;
}

interface LinkDispatchProps {
  getUserInfo: () => void;
  dispatch: (action: AppAction) => void
}
const mapStateToProps = (state: AppState, props: ForgePageProps): LinkStateProps => ({
  userName: state.accountInfo.accountName,
  forgeInfo: state.forgeInfo

});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any,AppAction>, props: ForgePageProps): LinkDispatchProps => ({
  getUserInfo: bindActionCreators(getUserInfo, dispatch),
  dispatch: dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgePage);