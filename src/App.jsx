import Header from "./components/Header"
import AA from "./components/AA"
import InfoCard from "./components/InfoCard"
import SearchBar from "./components/SearchBar"
import ServiceTable from "./components/ServiceTable"
import styles from'./App.module.css'

import rea from "./assets/ottoro.png"
import aberta from "./assets/page_icon.svg"
import pendente from "./assets/allert_icon.svg"
import andamento from "./assets/clock.svg"
import retirada from "./assets/check_icon.svg"

export default function App() {
  const mockOrders = [
  {
    id: 'OS-2024-001',
    title: 'Manutenção de Ar Condicionado',
    description: 'Aparelho do setor financeiro pingando e fazendo barulho.',
    location: 'Bloco B - Sala 204',
    date: '2024-10-28',
    status: 'Em Andamento', // Testando cor Azul
    priority: 'Alta',       // Testando cor Laranja
    category: 'Climatização'
  },
  {
    id: 'OS-2024-002',
    title: 'Troca de Lâmpada Queimada',
    description: 'Lâmpada do corredor principal piscando intermitentemente.',
    location: 'Corredor Térreo',
    date: '2024-10-29',
    status: 'Pendente',     // Testando cor Amarela
    priority: 'Baixa',      // Testando cor Verde
    category: 'Elétrica'
  },
  {
    id: 'OS-2024-003',
    title: 'Vazamento na Copa',
    description: 'Torneira da pia não fecha completamente, desperdício de água.',
    location: 'Copa - 2º Andar',
    date: '2024-10-25',
    status: 'Concluído',    // Testando cor Verde
    priority: 'Média',      // Testando cor Amarela
    category: 'Hidráulica'
  },
  {
    id: 'OS-2024-004',
    title: 'Sem conexão de Internet',
    description: 'Ponto de rede R-45 danificado, cabo rompido.',
    location: 'Sala de Reuniões 1',
    date: '2024-10-30',
    status: 'Pendente',
    priority: 'Crítica',    // Testando cor Vermelha/Negrito
    category: 'TI / Redes'
  },
  {
    id: 'OS-2024-005',
    title: 'Porta emperrada',
    description: 'A porta de vidro da entrada está travando ao abrir.',
    location: 'Recepção',
    date: '2024-10-27',
    status: 'Concluído',
    priority: 'Alta',
    category: 'Predial'
  },
  {
    id: 'OS-2024-006',
    title: 'Instalação de Projetor',
    description: 'Instalar novo projetor comprado para o auditório.',
    location: 'Auditório Principal',
    date: '2024-11-01',
    status: 'Em Andamento',
    priority: 'Média',
    category: 'TI / Infra'
  }
];
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
  <ServiceTable 
    orders={mockOrders}
  />
  </>
 )
}