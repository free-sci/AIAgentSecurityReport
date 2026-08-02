import {Scale} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
// import PageIntro from '../components/report/PageIntro';
import TableExplorer from '../components/report/TableExplorer';
import {REPORT_TABLES} from '../data/latestReportData';

const TABLES = REPORT_TABLES.filter((table) => table.category === 'policy');

export default function PolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header/>
            {/*<PageIntro*/}
            {/*    // eyebrow="第 2.6 节"*/}
            {/*    eyebrow=""*/}
            {/*    title="全球政策、法规与出口管制"*/}
            {/*    description="展示北美、欧洲与我国的 AI 智能体安全政策法规，以及面向模型、芯片、软件和技术的出口管制体系"*/}
            {/*    meta={`${TABLES.length} 张表 · 安全治理与出口管制`}*/}
            {/*    icon={<Scale size={35}/>}*/}
            {/*/>*/}

            <section className="border-b border-slate-200 bg-slate-50">
                <div className="mx-auto max-w-7xl px-5 py-9 md:px-8">
                    {/* 父容器 flex items-center gap-2 并排图标+标题 */}
                    <div className="mb-2 flex items-center gap-2">
                        {/* 渐变图标方块，单独元素 */}
                        <div
                            className="flex h-[35px] w-[35px] items-center justify-center rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-400 flex-none">
                            <Scale size={24} className="text-white" style={{shapeRendering: "geometricPrecision"}}/>
                        </div>
                        {/* h1 和图标同级，不要嵌套！ */}
                        <h1 className="text-3xl font-bold text-slate-950 md:text-3xl">全球政策、法规与出口管制</h1>
                    </div>
                    {/* 独立段落，换行展示正文 */}
                    <p className="leading-7 text-slate-600">
                        {/*当前全球AI治理已从通用大模型合规管控，细化聚焦至AI智能体专属安全治理层面。各国及地区基于自身技术优势、产业格局、数据主权诉求与地缘安全考量，形成了差异化的政策法规体系。*/}
                        本报告立足全球 AI 治理格局，分区域梳理北美、欧洲及我国 AI 智能体安全相关政策法规体系，
                        系统归集各区域监管主管机构、核心规范性文件、生效规制条款与重点管控方向。
                    </p>
                </div>
            </section>

             {/* Modules Section */}
                <section className="mx-auto max-w-[1270px] px-5 py-8">
                    {/*<div className="mt-1 grid gap-8 md:grid-cols-4">*/}
                    {/*    {FUTURE_DIRECTIONS.map(({title, desc, icon: Icon, color}) => (*/}
                    {/*        <div*/}
                    {/*            key={title}*/}
                    {/*            className="group rounded-3xl border bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"*/}
                    {/*        >*/}
                    {/*            <div className="flex items-center gap-3">*/}
                    {/*                <div*/}
                    {/*                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shrink-0`}>*/}
                    {/*                    <Icon size={35}/>*/}
                    {/*                </div>*/}
                    {/*                <h4 className="text-lg font-bold">{title}</h4>*/}
                    {/*            </div>*/}

                    {/*            <p className="mt-4 leading-7 text-slate-500">{desc}</p>*/}
                    {/*        </div>*/}
                    {/*    ))}*/}
                    {/*</div>*/}

                    <div className="mt-1 grid grid-cols-1 sm:grid-cols-1 gap-6 mb-24">
                        <img
                            src="/report-figures/figure-2-7.png"
                            alt="国家政策与法规"
                            className="w-full h-auto max-h-[780px] object-contain select-none pointer-events-none"
                        />
                    </div>
                </section>

            <TableExplorer tables={TABLES} filters={[{id: 'all', label: '全部政策'}]}/>
            <div className="mx-auto max-w-7xl px-5 md:px-8"><Footer/></div>
        </div>
    );
}

