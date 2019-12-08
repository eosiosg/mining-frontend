import React, { useState } from 'react';
import { 
  useRouteMatch,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import HeaderBar from '../components/HeaderBar';
import NavBar from '../components/navLink';
import ContentWrapper from 'components/blockContent';
import EosTopup from 'feature/EosTopup'
import BosTopup from 'feature/BosTopup'
import { platform } from 'os';
export const platformType: {
  [key: string]: string;
} = {
  "1": "钱包",
  "2": "交易所"
}

export type StateType = {
  platform: keyof (typeof platformType),
  amountBos: number;
}
// export class HomePage extends React.Component<{}> {
export const TopupPage: React.FC<{}> = () => {
  let { path, url } = useRouteMatch();
  const [transactionInfo, setTransactionInfo] = useState<StateType>({
    platform: "1",
    amountBos: 0
  });
  const handleChange = (field: keyof StateType) => (value: string | number) => {
    if (field == "amountBos" && typeof value == "string") {
      value = value !== "" ? parseInt(value, 10) : 0;
      if (isNaN(value)) return
    }
    setTransactionInfo({
      ...transactionInfo,
      [field]: value
    })
  }
    return (
      <div>
        <HeaderBar title="充值" hasGoback />
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
            <EosTopup transactionInfo={transactionInfo} onchange={handleChange('platform')} />
          </Route>
          <Route path={`${path}/bos`}>
            <BosTopup transactionInfo={transactionInfo} onchange={handleChange('amountBos')} />
          </Route>
        </Switch>
      </div>
    )
  }
export default TopupPage;