import React from 'react';
import { useConnect } from '../connectContext';
import MetricCard from './MetricCard';
import QueueTable from './QueueTable';
import AgentStatusPanel from './AgentStatusPanel';
import './css/dashboard.css';

const Dashboard = () => {
  const { metrics, initialized } = useConnect();

  const metricCards = [
    {
      title: 'Contacts in Queue',
      value: String(metrics.contactsInQueue),
      icon: 'queue'
    },
    {
      title: 'Avg Handle Time',
      value: metrics.avgHandleTime,
      icon: 'time'
    },
    {
      title: 'Service Level',
      value: metrics.serviceLevel,
      icon: 'level'
    },
    {
      title: 'Agents Available',
      value: String(metrics.agentsAvailable),
      icon: 'agents'
    },
    {
      title: 'Missed Contacts',
      value: String(metrics.missedContacts),
      icon: 'abandoned'
    },
    {
      title: 'Contacts Handled',
      value: String(metrics.contactsHandled),
      icon: 'handled'
    }
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Contact Center Dashboard</h1>
          <p className="dashboard-subtitle">Real-time metrics from Amazon Connect</p>
        </div>
        <div className="dashboard-time">
          <span className={`live-indicator ${initialized ? '' : 'disconnected'}`} aria-label={initialized ? 'Live data' : 'Not connected'}></span>
          {initialized ? 'Live' : 'Connecting...'}
        </div>
      </header>

      {!initialized && (
        <div className="connect-banner">
          <p>Initializing connection to Amazon Connect. Please sign in if the login popup appears.</p>
        </div>
      )}

      <section className="metrics-grid" aria-label="Key metrics">
        {metricCards.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </section>

      <div className="dashboard-panels">
        <section className="panel queue-panel" aria-label="Active contacts">
          <h2 className="panel-title">Active Contacts</h2>
          <QueueTable />
        </section>

        <section className="panel agents-panel" aria-label="Agent status">
          <h2 className="panel-title">Agent Status</h2>
          <AgentStatusPanel />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
