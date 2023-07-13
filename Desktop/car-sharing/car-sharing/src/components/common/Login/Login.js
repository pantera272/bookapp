import styles from './Login.module.scss';

const Login = () => {
  return(
    <div className={styles.container}>
      <p>ACCOUNT LOGIN</p>
      <input type='text' placeholder='User'></input>
      <input type='password' placeholder='Password'></input>
    </div>
  )
}

export default Login;