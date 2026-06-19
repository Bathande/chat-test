import React from 'react';
import { useConnect } from '../connectContext';
import './css/agentstatus.css';

const AgentStatusPanel = () => {
  const { agentState, agentName, metrics } = useConnect();

  const getStatusClass = (status) => {
    switch (status) {
      case 'Available': return 'status-available';
      case 'Busy':
      case 'CallingCustomer': return 'status-oncall';
      case 'AfterCallWork': return 'status-acw';
      case 'MissedCallAgent':
      case 'Default': return 'status-break';
      default: return '';
    }
  };

  const currentStatus = agentState ? (agentState.name || agentState.type || '—') : '—';

  return (
    <div className="agent-status-panel">
      <div className="status-summary">
        <div className="summary-item">
          <span className="summary-dot available"></span>
          <span className="summary-label">Available</span>
          <span className="summary-count">{metrics.agentsAvailable}</span>
        </div>
        <div className="summary-item">
          <span className="summary-dot oncall"></span>
          <span className="summary-label">On Call</span>
          <span className="summary-count">{metrics.agentsOnCall}</span>
        </div>
        <div className="summary-item">
          <span className="summary-dot acw"></span>
          <span className="summary-label">ACW</span>
          <span className="summary-count">{metrics.agentsInACW}</span>
        </div>
        <div className="summary-item">
          <span className="summary-dot break"></span>
          <span className="summary-label">Missed</span>
          <span className="summary-count">{metrics.missedContacts}</span>
        </div>
      </div>

      <div className="current-agent-section">
        <h3 className="section-subtitle">Your Status</h3>
        {agentName ? (
          <div className="agent-row">
            <div className="agent-info">
              <div className="agent-avatar">
                {agentName.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              <div>
                <p className="agent-name">{agentName}</p>
                <p className="agent-queue">Current Agent</p>
              </div>
            </div>
            <div className="agent-meta">
              <span className={`agent-status-badge ${getStatusClass(currentStatus)}`}>
                {currentStatus}
              </span>
            </div>
          </div>
        ) : (
          <div className="empty-state-small">
            <p>Agent data will appear after CCP connects</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentStatusPanel;
