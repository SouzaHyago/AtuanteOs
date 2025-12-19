import Header from "./components/Header"
import AA from "./components/AA"
import InfoCard from "./components/InfoCard"
import SearchBar from "./components/SearchBar"
import styles from'./App.module.css'

import rea from "./assets/ottoro.png"
import aberta from "./assets/page_icon.svg"
import pendente from "./assets/allert_icon.svg"
import andamento from "./assets/clock.svg"
import retirada from "./assets/check_icon.svg"


export default function App() {
 return(
  <>
    <Header
      title={"Portal de Serviços"} 
      image={rea}
      name={"Otto Souza"}
      position={"Captão"}
    />

    <AA />

  <div className={styles.cards}>
    <InfoCard 
      title={"Ordens Abertas"}
      value={3}
      icon={aberta}
    />
    <InfoCard 
      title={"Pendentes"}
      value={3}
      icon={pendente}
    />
    <InfoCard 
      title={"Em Andamento"}
      value={3}
      icon={andamento}
    />
    <InfoCard 
      title={"Aguardando Retirada"}
      value={3}
      icon={retirada}
    />
  </div>
  <SearchBar />
  </>
 )
}