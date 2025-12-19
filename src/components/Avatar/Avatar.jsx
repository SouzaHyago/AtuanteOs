import styles from "./Avatar.module.css"


export default function Avatar({image, name, position}){
  return(
    <div className={styles.avatar}>

      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.position}>{position}</p>
      </div>

      <img src={image} alt="User Image" className={styles.image} />
      
    </div>
  )
}