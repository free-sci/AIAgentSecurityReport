import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import IncidentsPage from './pages/IncidentsPage';
import PolicyPage from './pages/PolicyPage';
import ProductsPage from './pages/ProductsPage';
import ReferencesPage from './pages/ReferencesPage';
import ResearchPage from './pages/ResearchPage';
import SurveyPage from './pages/SurveyPage';
import TablesPage from './pages/TablesPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/incidents" element={<IncidentsPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/tables" element={<TablesPage />} />
        <Route path="/references" element={<ReferencesPage />} />

        <Route path="/vulnerability" element={<Navigate to="/survey" replace />} />
        <Route path="/appendix" element={<Navigate to="/references" replace />} />
        <Route path="/protocol" element={<Navigate to="/tables" replace />} />
        <Route path="/product" element={<Navigate to="/products" replace />} />
        <Route path="/team" element={<Navigate to="/research" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

