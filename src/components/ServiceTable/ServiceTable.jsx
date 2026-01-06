import { useEffect, useState } from "react";
import styles from "./ServiceTable.module.css";
import { Calendar, ChevronRight, Key } from 'lucide-react';

export default function ServiceTable({ orders }) {
  
  const [statusModal, setStatusModal] = useState(false)
  let otherStatus;

  // Helpers para classes dinâmicas
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendente':
        otherStatus = ['Em Andamento', 'Retirada'];
        return styles.statusPendente;
        case 'Em Andamento': 
          otherStatus = ['Pendente', 'Retirada'];
          return styles.statusEmAndamento;
        case 'Retirada': 
          otherStatus = ['Em Andamento', 'Pendente'];
          return styles.statusRetirada;
      default: return '';
    }
  };

  useEffect (()=>{

  },[])
  

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Baixa': return styles.priorityBaixa;
      case 'Média': return styles.priorityMedia;
      case 'Alta': return styles.priorityAlta;
      case 'Crítica': return styles.priorityCritica;
      default: return '';
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className={styles.container} style={{ textAlign: 'center', padding: '48px' }}>
        <h3 className={styles.title}>Nenhuma ordem encontrada</h3>
      </div>
    );
  }

  function handleStatusClick(e){
    console.log(e);
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
                <span onClick={setStatusModal(false)} className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
                <div hidden={statusModal}>
                  <div className={styles.statusModal}>
                    {otherStatus.map((newStatus)=> (
                      <span key={newStatus} onClick={setStatusModal(true)} className={`${styles.statusBadge} ${getStatusClass(newStatus)}`}>
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