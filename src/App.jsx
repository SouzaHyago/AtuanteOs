import { useState } from 'react' //
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

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');

  const mockOrders = [
    {
      id: 'OS-2024-001',
      title: 'Manutenção de Ar Condicionado',
      description: 'Aparelho do setor financeiro pingando e fazendo barulho.',
      location: 'Bloco B - Sala 204',
      date: '2024-10-28',
      status: 'Em Andamento',
      priority: 'Alta',
      category: 'Climatização'
    },
    {
      id: 'OS-2024-002',
      title: 'Troca de Lâmpada Queimada',
      description: 'Lâmpada do corredor principal piscando intermitentemente.',
      location: 'Corredor Térreo',
      date: '2024-10-29',
      status: 'Pendente',
      priority: 'Baixa',
      category: 'Elétrica'
    },
    {
      id: 'OS-2024-003',
      title: 'Vazamento na Copa',
      description: 'Torneira da pia não fecha completamente, desperdício de água.',
      location: 'Copa - 2º Andar',
      date: '2024-10-25',
      status: 'Retirada',
      priority: 'Média',
      category: 'Hidráulica'
    },
    {
      id: 'OS-2024-004',
      title: 'Sem conexão de Internet',
      description: 'Ponto de rede R-45 danificado, cabo rompido.',
      location: 'Sala de Reuniões 1',
      date: '2024-10-30',
      status: 'Pendente',
      priority: 'Crítica',
      category: 'TI / Redes'
    },
    {
      id: 'OS-2024-005',
      title: 'Porta emperrada',
      description: 'A porta de vidro da entrada está travando ao abrir.',
      location: 'Recepção',
      date: '2024-10-27',
      status: 'Retirada',
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

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = 
      order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === 'Todos') return true;
    
    if (filterStatus === 'Pendentes' && order.status === 'Pendente') return true;
    if (filterStatus === 'Em andamento' && order.status === 'Em Andamento') return true;
    if (filterStatus === 'Retirada' && order.status === 'Retirada') return true;

    return false;
  });

  const countPendentes = mockOrders.filter(o => o.status === 'Pendente').length;
  const countEmAndamento = mockOrders.filter(o => o.status === 'Em Andamento').length;
  const countConcluidas = mockOrders.filter(o => o.status === 'Retirada').length;
  
  const countAbertas = countPendentes + countEmAndamento;
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
          value={countAbertas} 
          icon={aberta}
        />
        <InfoCard 
          title={"Pendentes"}
          value={countPendentes}
          icon={pendente}
        />
        <InfoCard 
          title={"Em Andamento"}
          value={countEmAndamento}
          icon={andamento}
        />
        <InfoCard 
          title={"Aguardando Retirada"}
          value={countConcluidas}
          icon={retirada}
        />
      </div>

    <SearchBar 
      onSearch={setSearchTerm} 
      onFilter={setFilterStatus} 
      filterStatus={filterStatus}
    />
    <ServiceTable 
      orders={filteredOrders}
    />
  </>
 )
}