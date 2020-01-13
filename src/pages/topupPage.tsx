import React, { useState } from "react";
import { 
  useRouteMatch,
  Switch,
  Route,
  RouteComponentProps,
  useHistory,
  useLocation,
} from "react-router-dom"
import HeaderBar from "../components/HeaderBar";
import NavBar from "../components/navLink";
import ContentWrapper from "components/blockContent";
import EosTopup from "feature/EosTopup"
import BosTopup from "feature/BosTopup"

// depreciated
// export const platformType: {
//   [key: string]: string;
// } = {
//   "1": "钱包",
//   "2": "交易所"
// }

export type StateType = {
  // don"t export
  // platform: keyof (typeof platformType),
  amountBos: number;
  amountEos: number
}
// export class HomePage extends React.Component<{}> {
export const TopupPage: React.FC<{}> = () => {
  let { path } = useRouteMatch();
  let { state } = useLocation();
  let history = useHistory();
  const [transactionInfo, setTransactionInfo] = useState<StateType>({
    // platform: "1",
    amountBos: state ? state.topupBos : 0,
    amountEos: state ? state.topupEos : 0,
  });
  // console.log("state.topupEos", state.topupEos)
  console.log("state.topupBos", state)
  const handleChange = (field: keyof StateType) => (value: string | number) => {
    if ( (field === "amountBos" || field === "amountEos") && typeof value === "string") {
      const reg = /^([0-9]*)(\.?)(\d{0,4})$/
      if (!value.match(reg)) return
      value = value.replace(reg, "$1$2$3")
    }
    
    setTransactionInfo({
      ...transactionInfo,
      [field]: value
    })
  }
    return (
      <div>
        <HeaderBar title="充值" hasGoback={() => history.replace("/me")} />
        <ContentWrapper>
          <NavBar
            routes={[
              {
                url: `${path}/eos`,
                display: "EOS充值"
              },
              {
                url: `${path}/bos`,
                display: "BOS充值"
              }
            ]}
          />
        </ContentWrapper>
        <Switch>
          <Route path={`${path}/eos`}>
            {/* <EosTopup transactionInfo={transactionInfo} onchange={handleChange("platform")} /> */}
            <EosTopup transactionInfo={transactionInfo} onchange={handleChange("amountEos")} />
          </Route>
          <Route path={`${path}/bos`}>
            <BosTopup transactionInfo={transactionInfo} onchange={handleChange("amountBos")} />
          </Route>
        </Switch>
      </div>
    )
  }
export default TopupPage;