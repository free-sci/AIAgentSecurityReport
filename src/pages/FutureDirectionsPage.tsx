import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import {Boxes, CalendarClock, GraduationCap, Grid2X2, Scale} from "lucide-react";
// import PageIntro from "../components/report/PageIntro.tsx";
import {REPORT_TABLES} from "../data/latestReportData.ts";
import TableExplorer from "../components/report/TableExplorer.tsx";


const FUTURE_DIRECTIONS = [
    // {
    //     title: "AI 智能体规模化落地安全研究",
    //     desc: "",
    //     icon: Database,
    //     color: "from-blue-500 to-cyan-400",
    // },
    {
        title: "大规模自主协同多智能体系统安全",
        desc: "",
        icon: GraduationCap,
        color: "from-indigo-500 to-purple-400",
    },
    {
        title: "AI智能体的漏洞挖掘与修复体系",
        desc: "",
        icon: Boxes,
        color: "from-cyan-500 to-blue-400",
    },
    {
        title: "多模型集成安全推理体系",
        desc: "",
        icon: CalendarClock,
        color: "from-orange-400 to-red-400",
    },
    {
        title: " 国产化多模型聚合安全网关",
        desc: "",
        icon: Scale,
        color: "from-blue-500 to-indigo-400",
    },
];

const TABLES = REPORT_TABLES.filter((table) => table.category === 'research-directions');


export default function HomePage() {
    // const citedWithUrl = REFERENCES.filter((reference) => reference.url).length;

    return (
        <div className="min-h-screen bg-white">
            <Header/>
            <section className="border-b border-slate-200 bg-slate-50">
                <div className="mx-auto max-w-7xl px-5 py-9 md:px-8">
                    {/* 父容器 flex items-center gap-2 并排图标+标题 */}
                    <div className="mb-2 flex items-center gap-2">
                        {/* 渐变图标方块，单独元素 */}
                        <div
                            className="flex h-[35px] w-[35px] items-center justify-center rounded-xl overflow-hidden bg-gradient-to-br from-pink-500 to-purple-400 flex-none">
                            <Grid2X2 size={24} className="text-white" style={{shapeRendering: "geometricPrecision"}}/>
                        </div>
                        {/* h1 和图标同级，不要嵌套！ */}
                        <h1 className="text-3xl font-bold text-slate-950 md:text-3xl">未来研究方向</h1>
                    </div>
                    <p className="leading-7 text-slate-600">
                        本报告聚焦 AI 智能体规模化落地的现实安全难题，梳理现有安全技术应用现状，总结当前防护方案的工程瓶颈与落地障碍。
                        围绕四项高价值研究方向开展调研，分析各领域技术进展与落地矛盾，识别实用化推进过程中的技术壁垒与研究空白，
                        为构建可信可控的 AI 智能体安全体系提供支撑。
                        {/*突破工程化关键阻碍、推进安全规范与产业配套建设、支撑 AI 智能体安全规模化部署落地提供依据。*!/*/}
                    </p>
                </div>
            </section>

            <main>

                {/* Modules Section */}
                <section className="mx-auto max-w-[1270px] px-5 py-8">
                    <div className="mt-1 grid gap-8 md:grid-cols-4">
                        {FUTURE_DIRECTIONS.map(({title, desc, icon: Icon, color}) => (
                            <div
                                key={title}
                                className="group rounded-3xl border bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shrink-0`}>
                                        <Icon size={35}/>
                                    </div>
                                    <h4 className="text-lg font-bold">{title}</h4>
                                </div>

                                <p className="mt-4 leading-7 text-slate-500">{desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-1 gap-6 mb-24">
                        <img
                            src="/report-figures/figure-6-1.png"
                            alt="未来研究方向"
                            className="w-full h-auto max-h-[780px] object-contain select-none pointer-events-none"
                        />
                    </div>
                </section>

                <TableExplorer tables={TABLES} filters={[{id: 'all', label: '未来研究方向'}]}/>
                <div className="mx-auto max-w-7xl px-5 md:px-8"><Footer/></div>

            </main>

        </div>
    );
}
