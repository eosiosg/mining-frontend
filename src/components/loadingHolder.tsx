import React from 'react'

export const Loader: React.SFC<{}> = (props) => 
  <div 
    style={{
      textAlign: "center", 
      lineHeight: 3,
      marginBottom: `${(50/37.5).toFixed(8)}rem`
    }}>Loading ...</div>;

export const EndFlag: React.SFC<{}> = (props) => 
  <div 
    style={{
      textAlign: "center", 
      lineHeight: 3,
      marginBottom: `${(50/37.5).toFixed(8)}rem`
    }}>我是有底线的</div>;
