import React from 'react';
import styles from '../styles/homepage.module.scss'
const Rules: React.SFC<{}> = (props) => {
  return (
    <div className={styles.rules}>
      1.矿机购买
      <br/>
      <br/>
      - 矿机数量为 50万台, 定价为 500个BOS + Q个EOS, 其中 Q = 1000*P, P为BOS/EOS的市场价格. 例如当前市场价为1BOS = 0.01EOS, 则矿机价格为 500BOS + 10EOS. 
      <br/>
      <br/>
      - P的数值是根据交易所价格设定 
      <br/>
      - EOS通过中心化冲提币的方式映射到BOS链上 
      <br/>
      - 用户可以在任何时候向系统出售矿机, 换回1500BOS, 在T+3天到账. 
      <br/>
      <br/>
      2.资金流向 
      <br/>
      <br/>
      用户购买花费的Q个EOS分为3部分: 
      <br/>
      1. 80% * Q 进入到矿池 
      <br/>
      2. 5% * Q 作为渠道运营费用 
      <br/>
      3. 15% * Q 进入熔币池 
      <br/>
      <br/>
      
      3.熔币规则 
      <br/>
      <br/>
      熔币池的EOS数量会随着用户购买矿机而逐渐增加, 以3天为一个周期, 用户可以随时投入任意数量的BOS进入熔币池, 等到周期结束后, 熔币池的所有EOS会按照所有用户投入的BOS比例进行等比分发. 分发完毕后, 结束当前周期并开启下一周期. 
      <br/>
      <br/>
      4.活动终止方案 
      <br/>
      <br/>
      每天清算时检查活动是否达到终止条件, 最近连续七天(包括当天)每天的矿机购买数量低于100时,活动结束, 矿池的EOS全部按算力等比分发给所有矿机; 所有矿机自动销毁折算为1500BOS; 再从矿机资金里拿出1000万BOS奖励给最后购买的十台矿机(可以是同一人购买); 剩余BOS全部燃烧掉。
    </div>
  )
}

export default Rules;