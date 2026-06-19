import './App.css';
import Ccps from "./component/Ccps";
import Dashboard from "./component/Dashboard";
import Sidebar from "./component/Sidebar";
import { ConnectProvider } from './connectContext';
import { useState } from 'react';

function AppContent() {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <div className="App">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'ccp' && <Ccps />}
      </main>
    </div>
  );
}

function App() {
  return (
    <ConnectProvider>
      <AppContent />
    </ConnectProvider>
  );
}

export default App;
