import styles from "./SearchBar.module.css"
import searchIcon from "@/assets/Search.svg"

export default function SearchBar({ onSearch, onFilter, filterStatus }) {
  
  const getButtonClass = (statusName) => {
    return statusName === filterStatus 
      ? `${styles.filter} ${styles.active}`
      : styles.filter;
  };

  return(
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <img src={searchIcon} alt="" />
        <input 
          type="text" 
          placeholder="Nome do cliente ou N° de OS" 
          className={styles.searchInput}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <div className={styles.filtersContainer}>
        <button 
          className={getButtonClass('Todos')} 
          onClick={() => onFilter('Todos')}
        >
          Todos
        </button>
        
        <button 
          className={getButtonClass('Pendentes')} 
          onClick={() => onFilter('Pendentes')}
        >
          Pendentes
        </button>
        
        <button 
          className={getButtonClass('Em andamento')} 
          onClick={() => onFilter('Em andamento')}
        >
          Em andamento
        </button>
        
        <button 
          className={getButtonClass('Retirada')} 
          onClick={() => onFilter('Retirada')}
        >
          Retirada
        </button>
      </div>
    </div>
  )
}