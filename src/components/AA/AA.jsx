import styles from "./AA.module.css"


export default function AA(){
  return(
    <div className={styles.container}>
      <div className={styles.phrase}>
        <p className={styles.title}>Minhas Solicitações</p>
        <p className={styles.subtitle}>Gerencie e acompanhe suas Ordens de Serviço</p>
      </div>
        <button className={styles.button}> + Nova Ordem de Serviço</button>
    </div>
  )
}