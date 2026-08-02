import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import FullReportPage from './pages/FullReportPage.tsx';
import MethodologyPage from './pages/MethodologyPage.tsx';
import AcademiaPage from './pages/AcademiaPage.tsx';
import IndustryPage from './pages/IndustryPage.tsx';
import IncidentsPage from './pages/IncidentsPage.tsx';
import PolicyPage from './pages/PolicyPage.tsx';
import FutureDirectionsPage from './pages/FutureDirectionsPage.tsx';
import ReferencesPage from './pages/ReferencesPage.tsx';
import TeamPage from './pages/TeamPage.tsx';
// import TablesPage from './pages/TablesPage';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/fullreport" element={<FullReportPage/>}/>
                <Route path="/methodology" element={<MethodologyPage/>}/>
                <Route path="/academia" element={<AcademiaPage/>}/>
                <Route path="/industry" element={<IndustryPage/>}/>
                <Route path="/incidents" element={<IncidentsPage/>}/>
                <Route path="/policy" element={<PolicyPage/>}/>
                <Route path="/futuredirections" element={<FutureDirectionsPage/>}/>
                <Route path="/references" element={<ReferencesPage/>}/>
                <Route path="/team" element={<TeamPage/>}/>
                {/*<Route path="/tables" element={<TablesPage />} />*/}

                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </BrowserRouter>
    );
}

