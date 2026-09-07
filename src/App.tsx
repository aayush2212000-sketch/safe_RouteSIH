
import FleetVehiclesPage from './pages/FleetVehiclesPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/Login';
import { CommandCenter } from './components/CommandCenter';
import { UserMap } from './pages/UserMap';
import { ModeratorFeed } from './pages/ModeratorFeed';

function App() {
  console.log("🔥 APP LOADED");

  return (

    <BrowserRouter>
      <Routes>
        <Route
  path="/fleet-vehicles"
  element={<FleetVehiclesPage />}
/>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Role-specific dashboards */}
        <Route path="/admin-dashboard" element={<CommandCenter />} />
        <Route path="/moderator-feed" element={<ModeratorFeed />} />
        <Route path="/user-map" element={<UserMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;