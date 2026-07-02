import { useNavigate } from 'react-router-dom';
import { Microscope, BrainCircuit, Zap, Code2 } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import StatCard from '../components/home/StatCard';
import OverviewCard from '../components/home/OverviewCard';
import TOCSection from '../components/home/TOCSection';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 grid-pattern opacity-[0.4] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>

        <div className="relative z-10 p-8 md:p-12 lg:p-16 max-w-7xl mx-auto">
          {/* Page Title Section */}
          <div className="mb-12">
            <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
              <Microscope size={14} />
              <span>AI Security Research Division</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
              Agent 安全现状报告
            </h1>
            <p className="text-slate-500 text-lg max-w-3xl leading-relaxed">
              本门户提供针对 Agentic AI 的深度漏洞分析、交互合规协议与安全评估框架。致力于构建可信任的自主智能体研究体系。
            </p>
          </div>

          {/* Statistics Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <StatCard type="threats" />
            <StatCard type="audit" />
            <StatCard type="safety" />
            <StatCard type="protocol" />
          </div>

          {/* Main Overview Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <OverviewCard
              accentColor="blue"
              icon={<BrainCircuit size={24} />}
              title="核心概念与范式"
              description={'探讨以 LLM 为核心的 Agent 系统在“感知-决策-行动”循环中的特有攻击面，定义自主性与安全边界的学术界定。'}
              linkText="Explore Research"
              onExplore={() => navigate('/vulnerability')}
            />
            <OverviewCard
              accentColor="indigo"
              icon={<Zap size={24} />}
              title="典型脆弱性库"
              description="涵盖提示词注入、过度赋权、不安全输出处理等常见安全缺陷，包含跨平台的测试用例与漏洞评级指标。"
              linkText="View CVE Dataset"
              onExplore={() => navigate('/vulnerability')}
            />
            <OverviewCard
              accentColor="cyan"
              icon={<Code2 size={24} />}
              title="Agent 安全交互协议"
              description="旨在规范 Agent 与工具、Agent 与用户、Agent 与 Agent 之间的通讯标准，建立可信的权限握手机制。"
              linkText="Access Protocols"
              onExplore={() => navigate('/appendix')}
            />
          </div>

          {/* Report Outline Section */}
          <TOCSection />

          {/* Footer */}
          <Footer />
        </div>
      </main>
    </div>
  );
}
