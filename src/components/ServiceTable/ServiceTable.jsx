import { useState } from "react";
import styles from "./ServiceTable.module.css";
import { Calendar, ChevronRight } from 'lucide-react';

// Adicionada a prop onUpdatePriority
export default function ServiceTable({ orders, onUpdateStatus, onUpdatePriority }) {
  
  const [openedStatusId, setOpenedStatusId] = useState(null);
  const [openedPriorityId, setOpenedPriorityId] = useState(null); // Novo estado

  const priorities = ['Baixa', 'Média', 'Alta', 'Crítica']; // Lista de prioridades

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendente': return styles.statusPendente;
      case 'Em Andamento': return styles.statusEmAndamento;
      case 'Retirada': return styles.statusRetirada;
      default: return '';
    }
  };

  const getOtherStatus = (currentStatus) => {
    const allStatus = ['Pendente', 'Em Andamento', 'Retirada'];
    return allStatus.filter(s => s !== currentStatus);
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

  const toggleStatus = (id) => {
    setOpenedPriorityId(null); // Fecha o de prioridade se abrir o de status
    setOpenedStatusId(prevId => prevId === id ? null : id);
  }

  const togglePriority = (id) => {
    setOpenedStatusId(null); // Fecha o de status se abrir o de prioridade
    setOpenedPriorityId(prevId => prevId === id ? null : id);
  }

  const handleStatusChange = (orderId, newStatus) => {
    if (onUpdateStatus) onUpdateStatus(orderId, newStatus);
    setOpenedStatusId(null);
  };

  // Nova função para lidar com a mudança de prioridade
  const handlePriorityChange = (orderId, newPriority) => {
    if (onUpdatePriority) onUpdatePriority(orderId, newPriority);
    setOpenedPriorityId(null);
  };

  if (!orders || orders.length === 0) {
    return (
      <div className={styles.container} style={{ textAlign: 'center', padding: '48px' }}>
        <h3 className={styles.title}>Nenhuma ordem encontrada</h3>
      </div>
    );
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
              <td className={styles.cell}>
                <div className={styles.idText}>{order.id}</div>
                <div className={styles.dateText}>
                  <Calendar size={12} /> 
                  {new Date(order.date).toLocaleDateString('pt-BR')}
                </div>
              </td>

              <td className={styles.cell}>
                <div className={styles.title}>{order.title}</div>
                <div className={styles.description}>{order.description}</div>
                <span className={styles.categoryTag}>{order.category}</span>
              </td>

              <td className={styles.cell}>
                <div className={styles.client}>{order.client}</div>
              </td>

              {/* Célula de Prioridade com Modal */}
              <td className={`${styles.cell} ${styles.relativeCell}`}>
                <span 
                  onClick={() => togglePriority(order.id)} 
                  className={`${styles.priorityBadge} ${getPriorityClass(order.priority)}`}
                >
                  {order.priority}
                </span>

                {openedPriorityId === order.id && (
                  <div className={styles.priorityModal}>
                    {priorities.filter(p => p !== order.priority).map((p) => (
                      <span 
                        key={p} 
                        onClick={() => handlePriorityChange(order.id, p)} 
                        className={`${styles.priorityOption} ${getPriorityClass(p)}`}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </td>

              <td className={`${styles.cell} ${styles.relativeCell}`}>
                <span 
                  onClick={() => toggleStatus(order.id)} 
                  className={`${styles.statusBadge} ${getStatusClass(order.status)}`}
                >
                  {order.status}
                </span>

                {openedStatusId === order.id && (
                  <div className={styles.statusModal}>
                    {getOtherStatus(order.status).map((newStatus) => (
                      <span 
                        key={newStatus} 
                        onClick={() => handleStatusChange(order.id, newStatus)} 
                        className={`${styles.statusBadge} ${getStatusClass(newStatus)}`}
                      >
                        {newStatus}
                      </span>
                    ))}
                  </div>
                )}
              </td>

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