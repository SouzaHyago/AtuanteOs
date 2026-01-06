import { useState } from "react";
import styles from "./ServiceTable.module.css";
import { Calendar, ChevronRight } from 'lucide-react';

export default function ServiceTable({ orders }) {
  
  const [openedStatusId, setOpenedStatusId] = useState(null);

  // Helpers para classes dinâmicas
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendente': return styles.statusPendente;
        case 'Em Andamento': return styles.statusEmAndamento;
        case 'Retirada': return styles.statusRetirada;
      default: return '';
    }
  };
  const getOtherStatus = (currentStatus)=> {
    const allStatus = ['Pendente','Em Andamento','Retirada']
    return allStatus.filter( s => s !== currentStatus);
  }


  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Baixa': return styles.priorityBaixa;
      case 'Média': return styles.priorityMedia;
      case 'Alta': return styles.priorityAlta;
      case 'Crítica': return styles.priorityCritica;
      default: return '';
    }
  };

  const toggleStatus = (id)=> {
    setOpenedStatusId(prevId => prevId === id ? null : id)
  }

  if (!orders || orders.length === 0) {
    return (
      <div className={styles.container} style={{ textAlign: 'center', padding: '48px' }}>
        <h3 className={styles.title}>Nenhuma ordem encontrada</h3>
      </div>
    );
  }

  function handleStatusClick(id){
    if(id === openedStatusId){
      return 0;
    }else {
      return 1;
    }
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>ID / Data</th>
            <th className={styles.th}>Detalhes da Solicitação</th>
            <th className={styles.th}>Cliente</th>
            <th className={styles.th}>Prioridade</th>
            <th className={styles.th}>Status</th>
            <th className={`${styles.th} text-right`}>Ação</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className={styles.row}>
              
              {/* ID e Data */}
              <td className={styles.cell}>
                <div className={styles.idText}>{order.id}</div>
                <div className={styles.dateText}>
                  <Calendar size={12} /> 
                  {new Date(order.date).toLocaleDateString('pt-BR')}
                </div>
              </td>

              {/* Título e Descrição */}
              <td className={styles.cell}>
                <div className={styles.title}>{order.title}</div>
                <div className={styles.description}>{order.description}</div>
                <span className={styles.categoryTag}>{order.category}</span>
              </td>

              {/* Nome do CLiente */}
              <td className={styles.cell}>
                <div className={styles.client}>
                  {order.client}
                </div>
              </td>

              {/* Prioridade */}
              <td className={styles.cell}>
                <span className={getPriorityClass(order.priority)}>
                  {order.priority}
                </span>
              </td>

              {/* Status */}
              <td className={styles.cell} >
                <span onClick={(()=>toggleStatus(order.id))} className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
                <div hidden={handleStatusClick(order.id)}>
                  <div className={styles.statusModal}>
                    {getOtherStatus(order.status).map((newStatus)=> (
                      <span onClick={(()=>setOpenedStatusId(null))} key={newStatus} className={`${styles.statusBadge} ${getStatusClass(newStatus)}`}>
                        {newStatus}
                      </span>
                    ))}
                  </div>
                </div>
                
              </td>

              {/* Ação */}
              <td className={styles.cell} style={{ textAlign: 'right' }}>
                <button className={styles.actionButton}>
                  <ChevronRight size={20} />
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}