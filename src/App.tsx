import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VulnerabilityPage from './pages/VulnerabilityPage';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vulnerability" element={<VulnerabilityPage />} />
        <Route
          path="/protocol"
          element={
            <PlaceholderPage
              title="Agent 安全交互协议"
              description="本页面将展示 Agent 与工具、Agent 与用户、Agent 与 Agent 之间的通讯标准与可信权限握手机制。我们的研究团队正在编制最新的 ASRP 交互协议规范文档。"
            />
          }
        />
        <Route
          path="/product"
          element={
            <PlaceholderPage
              title="安全产品矩阵"
              description="本页面将展示 Agent 安全相关的产品生态，包括安全评估工具、运行时防护系统及合规审计平台。产品数据库正在更新中。"
            />
          }
        />
        <Route
          path="/team"
          element={
            <PlaceholderPage
              title="研究团队"
              description="本页面将介绍参与 Agent 安全研究的全球学术合作伙伴与行业专家团队。团队成员信息正在汇总中。"
            />
          }
        />
        <Route
          path="/policy"
          element={
            <PlaceholderPage
              title="安全政策与标准"
              description="本页面将汇集 Agent 安全领域的政策法规、行业标准及伦理指南，包括 ASRP 框架的最新政策文件。"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
