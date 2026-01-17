import { useState } from 'react'
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

  const [orders, setOrders] = useState([
    {
      id: 'OS-2024-001',
      title: 'Ar Condicionado Xinix',
      description: 'Está deixando o ar gelado',
      date: '2024-10-28',
      status: 'Em Andamento',
      priority: 'Alta',
      client: 'Billy',
      category: 'R$250,00'
    },
    {
      id: 'OS-2024-002',
      title: 'Luminária',
      description: 'Lâmpada piscando intermitentemente.',
      date: '2024-10-29',
      status: 'Pendente',
      priority: 'Baixa',
      client: 'Otto',
      category: 'R$180'
    },
    {
      id: 'OS-2024-003',
      title: 'Microondas',
      description: 'Prato não gira',
      date: '2024-10-25',
      status: 'Retirada',
      priority: 'Média',
      client: 'Léo',
      category: 'R$80'
    },
    {
      id: 'OS-2024-004',
      title: 'Televisão Phillips',
      description: 'Deslinga depois de um tempo ligada',
      date: '2024-10-30',
      status: 'Pendente',
      priority: 'Baixa',
      client: 'Bardot',
      category: 'Sem orçamento'
    },
    {
      id: 'OS-2024-005',
      title: 'Som AIWA',
      description: 'Som baixo',
      date: '2024-10-27',
      status: 'Pendente',
      priority: 'Baixa',
      client: 'Brigitte',
      category: 'Sem Orçamento'
    }
  ]);

  // --- FUNÇÃO PARA SALVAR O NOVO STATUS ---
  const handleUpdateStatus = (id, newStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    // Nota: Se tivesse um banco de dados, o "fetch" ou "axios" entraria aqui.
  };

  const handleUpdatePriority = (id, newPriority) => {
  setOrders(prevOrders => 
    prevOrders.map(order => 
      order.id === id ? { ...order, priority: newPriority } : order
    )
  );
  } ;

  // Filtragem agora usa o estado 'orders' em vez de 'mockOrders'
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.client.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === 'Todos') return true;
    if (filterStatus === 'Pendentes' && order.status === 'Pendente') return true;
    if (filterStatus === 'Em andamento' && order.status === 'Em Andamento') return true;
    if (filterStatus === 'Retirada' && order.status === 'Retirada') return true;

    return false;
  });

  // Contadores atualizados conforme o estado muda
  const countPendentes = orders.filter(o => o.status === 'Pendente').length;
  const countEmAndamento = orders.filter(o => o.status === 'Em Andamento').length;
  const countConcluidas = orders.filter(o => o.status === 'Retirada').length;
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
          <InfoCard title={"Ordens Abertas"} value={countAbertas} icon={aberta} />
          <InfoCard title={"Pendentes"} value={countPendentes} icon={pendente} />
          <InfoCard title={"Em Andamento"} value={countEmAndamento} icon={andamento} />
          <InfoCard title={"Aguardando Retirada"} value={countConcluidas} icon={retirada} />
      </div>

      <SearchBar 
        onSearch={setSearchTerm} 
        onFilter={setFilterStatus} 
        filterStatus={filterStatus}
      />
      
      {/* MUDANÇA AQUI: Passamos a função handleUpdateStatus para a tabela */}
     <ServiceTable 
  orders={filteredOrders}
  onUpdateStatus={handleUpdateStatus}
  onUpdatePriority={handleUpdatePriority} // Nova prop
/>
    </>
  )
}