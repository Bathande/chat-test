import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import "amazon-connect-streams";
import { ccpConfig } from './conf/configurations';

const ConnectContext = createContext(null);

export const useConnect = () => useContext(ConnectContext);

export const ConnectProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [agentState, setAgentState] = useState(null);
  const [agentName, setAgentName] = useState('');
  const [contacts, setContacts] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [metrics, setMetrics] = useState({
    contactsInQueue: 0,
    contactsHandled: 0,
    avgHandleTime: '0:00',
    serviceLevel: '—',
    agentsAvailable: 0,
    agentsOnCall: 0,
    agentsInACW: 0,
    missedContacts: 0,
  });

  const contactsHandledRef = useRef(0);
  const handleTimesRef = useRef([]);
  const missedRef = useRef(0);

  const initCCP = useCallback((containerDiv) => {
    if (initialized) return;

    window.connect.core.initCCP(containerDiv, ccpConfig);
    setInitialized(true);

    // Subscribe to agent events
    window.connect.agent((agent) => {
      const config = agent.getConfiguration();
      setAgentName(config.name || config.username || 'Agent');

      // Update agent state on change
      agent.onStateChange((stateChange) => {
        setAgentState(stateChange.newState);
        updateAgentMetrics();
      });

      // Set initial state
      const currentState = agent.getState();
      setAgentState(currentState);
      updateAgentMetrics();
    });

    // Subscribe to contact events
    window.connect.contact((contact) => {
      const contactId = contact.getContactId();
      const queue = contact.getQueue();

      // Contact connected
      contact.onConnected(() => {
        setContacts((prev) => {
          const exists = prev.find(c => c.id === contactId);
          if (exists) return prev;
          return [...prev, {
            id: contactId,
            queue: queue ? queue.name : 'Unknown',
            status: 'Connected',
            startTime: Date.now(),
          }];
        });
        updateAgentMetrics();
      });

      // Contact ended
      contact.onEnded(() => {
        setContacts((prev) => prev.filter(c => c.id !== contactId));

        contactsHandledRef.current += 1;

        // Track handle time
        setContacts((prev) => {
          const c = prev.find(ct => ct.id === contactId);
          if (c && c.startTime) {
            const duration = (Date.now() - c.startTime) / 1000;
            handleTimesRef.current.push(duration);
          }
          return prev;
        });

        updateMetrics();
        updateAgentMetrics();
      });

      // Contact missed
      contact.onMissed(() => {
        missedRef.current += 1;
        updateMetrics();
      });

      // Update queue metrics when contact arrives
      updateMetrics();
      updateAgentMetrics();
    });
  }, [initialized]);

  const updateMetrics = useCallback(() => {
    const avgHT = handleTimesRef.current.length > 0
      ? handleTimesRef.current.reduce((a, b) => a + b, 0) / handleTimesRef.current.length
      : 0;

    const minutes = Math.floor(avgHT / 60);
    const seconds = Math.floor(avgHT % 60);
    const avgFormatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    setMetrics((prev) => ({
      ...prev,
      contactsHandled: contactsHandledRef.current,
      avgHandleTime: avgFormatted,
      missedContacts: missedRef.current,
    }));
  }, []);

  const updateAgentMetrics = useCallback(() => {
    try {
      const agentStates = [];
      let available = 0;
      let onCall = 0;
      let inACW = 0;
      let queuedContacts = 0;

      // Get agent info from the current agent
      if (window.connect && window.connect.agent) {
        window.connect.agent((agent) => {
          const state = agent.getState();
          const stateName = state.name || state.type;

          if (stateName === 'Available') available++;
          else if (stateName === 'Busy' || stateName === 'CallingCustomer') onCall++;
          else if (stateName === 'AfterCallWork') inACW++;

          // Get queue information
          const agentConfig = agent.getConfiguration();
          const routingProfile = agentConfig.routingProfile;
          if (routingProfile && routingProfile.queues) {
            queuedContacts = routingProfile.queues.length;
          }

          agentStates.push({
            name: agentConfig.name || agentConfig.username || 'Agent',
            status: stateName,
            duration: '—',
            queue: routingProfile ? routingProfile.name : '—',
          });
        });
      }

      setAgentList(agentStates);
      setMetrics((prev) => ({
        ...prev,
        agentsAvailable: available,
        agentsOnCall: onCall,
        agentsInACW: inACW,
        contactsInQueue: queuedContacts,
      }));
    } catch (e) {
      console.warn('Error updating agent metrics:', e);
    }
  }, []);

  const value = {
    initialized,
    initCCP,
    agentState,
    agentName,
    contacts,
    agentList,
    metrics,
  };

  return (
    <ConnectContext.Provider value={value}>
      {children}
    </ConnectContext.Provider>
  );
};
