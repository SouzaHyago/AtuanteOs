import styles from "./InfoCard.module.css"

export default function InfoCard({title, value, icon}){
  return(
    <div className={styles.card}>
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <p className={styles.value}>{value}</p>
      </div>
      
      <div className={styles.icon}>
        <img src={icon} alt="Icon" className={styles.icon} />
      </div>
    </div>
  )
}