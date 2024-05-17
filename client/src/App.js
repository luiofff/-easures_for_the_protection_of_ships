
import './App.css';
import Auth from './pages/AuthPage/auth';
import ProtectionMeasures from './pages/ProtectionMeasures/protectionMeasures';
import SecurityIndicators from './pages/SecurityIndicators/securityIndicators';
import ShipsList from './pages/ShipsList/shipsList';
import ShipsSystems from './pages/ShipsSystems/shipsSystems';
import ShipsThreats from './pages/ShipsThreats/shipsThreats';
import ShipsVulnerabilities from './pages/ShipsVulnerabilities/shipsVulnerabilities';
import ThreatsShipSystems from './pages/ThreatsShipSystems/threatsShipSystems';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <main className='hero'>
        <div className='container-new'>
          <Routes>
            <Route path="/" exact element={<Auth />} />
            <Route path="/ShipsList" exact element={<ShipsList/>} />
            <Route path="/ShipsSystems" exact element={<ShipsSystems />} />
            <Route path="/ShipsThreats" exact element={<ShipsThreats />} />
            <Route path="/ShipsVulnerabilities" exact element={<ShipsVulnerabilities />} />
            <Route path="/ProtectionMeasures" exact element={<ProtectionMeasures />} />
            <Route path='/SecurityIndicators' exact element={<SecurityIndicators />} />
            <Route path='/ThreatsShipSystems' exact element={<ThreatsShipSystems />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
