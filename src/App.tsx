import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Overview } from './pages/Overview';
import { ParliamentaryResults } from './pages/ParliamentaryResults';
import { AssemblyExplorer } from './pages/AssemblyExplorer';
import { ElectoralTrends } from './pages/ElectoralTrends';
import { DataSources } from './pages/DataSources';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Overview />} />
          <Route path="parliamentary" element={<ParliamentaryResults />} />
          <Route path="assembly" element={<AssemblyExplorer />} />
          <Route path="trends" element={<ElectoralTrends />} />
          <Route path="sources" element={<DataSources />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
