import React from 'react';
import './css/sidebar.css';

const Sidebar = ({ activeView, setActiveView }) => {
  return (
    <nav className="sidebar" aria-label="Main navigation">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 15.5C20 18.54 16.42 21 12 21C7.58 21 4 18.54 4 15.5C4 12.46 7.58 10 12 10C16.42 10 20 12.46 20 15.5Z" fill="#FF9900"/>
            <path d="M12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3Z" fill="#FF9900"/>
          </svg>
          <span className="sidebar-title">Connect Hub</span>
        </div>
      </div>

      <ul className="sidebar-menu">
        <li>
          <button
            className={`sidebar-item ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveView('dashboard')}
            aria-current={activeView === 'dashboard' ? 'page' : undefined}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            <span>Dashboard</span>
          </button>
        </li>
        <li>
          <button
            className={`sidebar-item ${activeView === 'ccp' ? 'active' : ''}`}
            onClick={() => setActiveView('ccp')}
            aria-current={activeView === 'ccp' ? 'page' : undefined}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <span>CCP Panel</span>
          </button>
        </li>
      </ul>

      <div className="sidebar-footer">
        <div className="agent-status">
          <span className="status-dot available"></span>
          <span className="status-text">Available</span>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
