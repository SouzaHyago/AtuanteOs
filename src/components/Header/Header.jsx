import styles from "../Header/Header.module.css";
import menu from "../../assets/Menu.svg"
import Avatar from "../Avatar";

export default function Header({title,name,position,image}){
  return(
    <div className={styles.header}>
      <img src={menu} alt="Menu Icon" className={styles.menu} />
      <p className={styles.title}>{title}</p>
      <Avatar
        name={name}
        position={position}
        image={image}
      />
    </div>
  )
}