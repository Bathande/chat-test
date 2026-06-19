import React from 'react';
import { useConnect } from '../connectContext';
import './css/queuetable.css';

const QueueTable = () => {
  const { contacts } = useConnect();

  const formatDuration = (startTime) => {
    if (!startTime) return '—';
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="queue-table-wrapper">
      {contacts.length === 0 ? (
        <div className="empty-state">
          <p>No active contacts</p>
          <span className="empty-hint">Contacts will appear here when they connect</span>
        </div>
      ) : (
        <table className="queue-table">
          <thead>
            <tr>
              <th>Contact ID</th>
              <th>Queue</th>
              <th>Status</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td className="queue-name">{contact.id.substring(0, 8)}...</td>
                <td>{contact.queue}</td>
                <td>
                  <span className="sla-badge sla-good">{contact.status}</span>
                </td>
                <td>{formatDuration(contact.startTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QueueTable;
