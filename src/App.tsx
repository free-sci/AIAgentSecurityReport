import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VulnerabilityPage from './pages/VulnerabilityPage';
import IncidentsPage from './pages/IncidentsPage';
import AppendixPage from './pages/AppendixPage';
import TablesPage from './pages/TablesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vulnerability" element={<VulnerabilityPage />} />
        <Route path="/appendix" element={<AppendixPage />} />
        <Route path="/tables" element={<TablesPage />} />
        <Route path="/protocol" element={<Navigate to="/tables" replace />} />
        <Route path="/product" element={<Navigate to="/tables" replace />} />
        <Route path="/team" element={<Navigate to="/tables" replace />} />
        <Route path="/policy" element={<Navigate to="/tables" replace />} />
        <Route path="/incidents" element={<IncidentsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
