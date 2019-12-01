import React from 'react'
import styles from '../styles/headerBar.module.scss'
import { RouteComponentProps, Link, withRouter} from 'react-router-dom'
import { ReactComponent as Holder } from '../static/no-activity.svg';
type Props = {
  title: string;
  hasGoback?: boolean;
  hasMe?: boolean;
} & RouteComponentProps
const HeaderBar: React.FC<Props> = (props) => {

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {props.hasGoback && <span onClick={() => props.history.goBack()}>back</span>}
      </div>
      <span>{props.title}</span>
      <div className={styles.right}>
        {props.hasMe && <Link to='/me'><Holder /></Link>}
        </div>
    </div>
  )
}

export default withRouter(HeaderBar)
