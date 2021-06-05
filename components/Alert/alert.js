import styles from "./alert.module.css";
import cn from 'classnames'

function Alert({children, type}) {
    return (
        <div className={
            cn({
                [styles.success]: type==='dung',
                [styles.error]: type==='sai'
        })
        }>
            {children}
        </div>
    );
}

export default Alert;