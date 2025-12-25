import styles from "./ServiceTable.module.css";
import { Calendar, MapPin, ChevronRight, Search } from 'lucide-react'; // Instale: npm install lucide-react

export default function ServiceTable({ orders }) {
  
  // Helpers para classes dinâmicas
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendente': return styles.statusPendente;
      case 'Em Anamento': return styles.statusEmAndamento;
      case 'Em Andamento': return styles.statusEmAndamento;
      case 'Retirada': return styles.statusRetirada;
      default: return '';
    }
  };

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

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>ID / Data</th>
            <th className={styles.th}>Detalhes da Solicitação</th>
            <th className={styles.th}>Local</th>
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

              {/* Localização */}
              <td className={styles.cell}>
                <div className={styles.location}>
                  <MapPin size={14} />
                  {order.location}
                </div>
              </td>

              {/* Prioridade */}
              <td className={styles.cell}>
                <span className={getPriorityClass(order.priority)}>
                  {order.priority}
                </span>
              </td>

              {/* Status */}
              <td className={styles.cell}>
                <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
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