import styles from './Main.module.scss';
import Title from '../../common/Title/Title';
import Button from '../../common/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons';

const icon = <FontAwesomeIcon icon={faFlagCheckered} />;

const Main = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <Title />
        </div>
        <div className={styles.start}>
          <Button name='Let start' icon={icon}/>
        </div>
      </div>
    </>
  )
}

export default Main;