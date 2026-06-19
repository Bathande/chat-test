import React, { useRef, useEffect } from 'react';
import { useConnect } from '../connectContext';
import "./css/ccps.css";

const Ccps = () => {
  const { initialized, initCCP, agentState, agentName } = useConnect();
  const ccpRef = useRef(null);

  useEffect(() => {
    if (ccpRef.current && !initialized) {
      initCCP(ccpRef.current);
    }
  }, [initCCP, initialized]);

  const currentStatus = agentState ? (agentState.name || agentState.type || 'Unknown') : 'Not Connected';

  return (
    <div className="ccp-wrapper">
      <div className="ccp-header">
        <h1 className="ccp-title">Contact Control Panel</h1>
        <p className="ccp-subtitle">Handle inbound and outbound contacts</p>
      </div>

      {initialized && (
        <div className="ccp-status-bar">
          <div className="ccp-agent-info">
            <span className="status-indicator connected"></span>
            <span>{agentName} — {currentStatus}</span>
          </div>
        </div>
      )}

      <div className="ccp-container">
        <div ref={ccpRef} id="container-ccp" className="ccp-embed"></div>
      </div>
    </div>
  );
};

export default Ccps;
