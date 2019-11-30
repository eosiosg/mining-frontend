import React from 'react'
type Props = {
  padding?: number;
  children: React.ReactNode
}
const ContentWrapper: React.SFC<Props> = ({
  padding,
  children
}) => {
  return (
    <div style={{
      padding: `0 ${padding || 20}px`
    }}
    >{children}</div>
  )
}

export default ContentWrapper;