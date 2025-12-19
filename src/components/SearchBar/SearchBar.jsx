import styles from "./SearchBar.module.css"
import searchIcon from "@/assets/Search.svg"
import filterIcon from "@/assets/Filter.svg"
export default function SearchBar(){
  return(
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <img src={searchIcon} alt="" />
        <input type="text" placeholder="Buscar por cliente ou N° de OS..." className={styles.searchInput} />
      </div>
      <div className={styles.filtersContainer}>
        <button className={styles.filter}>Todos</button>
        <button className={styles.filter}>Pendentes</button>
        <button className={styles.filter}>Em andamento</button>
        <button className={styles.filter}>Retirada</button>
      </div>
    </div>
  )
}