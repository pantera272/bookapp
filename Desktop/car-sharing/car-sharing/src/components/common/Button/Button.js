import styles from './Button.module.scss';

const Button = ({name, icon}) => {
  return (
    <button className={styles.button}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.text}>{name}</span>
    </button>
  )
}

export default Button