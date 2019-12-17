import React from 'react'
import styles from '../styles/headerBar.module.scss'
import { RouteComponentProps, Link, withRouter} from 'react-router-dom'
import { ReactComponent as Holder } from '../static/no-activity.svg';
type Props = {
  title: string;
  hasGoback?: boolean | Function;
  hasMe?: boolean;
} & RouteComponentProps
const HeaderBar: React.FC<Props> = (props) => {
  const handleClick = () => {
    if(typeof props.hasGoback === "function") {
      props.hasGoback()
    } else if (props.hasGoback) {
      props.history.goBack()
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {props.hasGoback && <span onClick={handleClick}>back</span>}
      </div>
      <span>{props.title}</span>
      <div className={styles.right}>
        {props.hasMe && <Link to='/me'><Holder /></Link>}
        </div>
    </div>
  )
}

export default withRouter(HeaderBar)
