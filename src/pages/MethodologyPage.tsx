import {
    // ArrowRight,
    // BookOpen,
    Boxes,
    CalendarClock,
    // Database,
    GraduationCap,
    Grid2X2,
    Layers3,
    Scale,
    // TableProperties,
    // FileBarChart,
    // Table2,
    // Image,
    Trash2
} from "lucide-react";

// import {Link} from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
// import {REPORT_META} from '../data/latestReportData';
// import {useEffect, useState, useRef, useCallback} from 'react';


const lifeCycleList = [
    {title: "需求规划", desc: "", icon: Layers3},
    {title: "架构设计", desc: "", icon: GraduationCap},
    {title: "编码开发", desc: "", icon: Boxes},
    {title: "安全测试", desc: "", icon: CalendarClock},
    {title: "部署交付", desc: "", icon: Scale},
    {title: "运行迭代", desc: "", icon: Grid2X2},
    {title: "退役销毁", desc: "", icon: Trash2}
];


export default function HomePage() {

    return (
        <div className="min-h-screen bg-white">
            <Header/>
            <section className="border-b border-slate-200 bg-slate-50">
                <div className="mx-auto max-w-7xl px-5 py-9 md:px-8">
                    {/* 父容器 flex items-center gap-2 并排图标+标题 */}
                    <div className="mb-2 flex items-center gap-2">
                        {/* 渐变图标方块，单独元素 */}
                        <div
                            className="flex h-[35px] w-[35px] items-center justify-center rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-400 flex-none">
                            <Layers3 size={24} className="text-white"
                                     style={{shapeRendering: "geometricPrecision"}}/>
                        </div>
                        {/* h1 和图标同级，不要嵌套！ */}
                        <h1 className="text-3xl font-bold text-slate-950 md:text-3xl">调研方法</h1>
                    </div>
                    <p className="leading-7 text-slate-600">
                        本报告以自主 AI 智能体安全为研究对象，构建全生命周期的调研分析框架。
                        该框架以需求规划、架构设计、编码开发、安全测试、部署交付、运行迭代、退役销毁七大递进阶段作为生命周期主线覆盖智能体
                        从研发至下线完整链路，沿业务流转链路划分感知、记忆、决策、行动、交互、治理六大功能模块构成横向切面以定位风险实体分布边界，
                        依托该分析框架完成全阶段系统性的风险研判与防护体系梳理。
                    </p>
                </div>
            </section>
            <main>

                {/*<section className="mx-auto max-w-7xl px-5 py-10 md:px-8">*/}
                {/*    <div className="mb-7">*/}
                {/*        /!*<div className="text-xs font-bold text-blue-600">REPORT NAVIGATION</div>*!/*/}
                {/*        /!*<h2 className="mt-2 text-2xl font-bold text-slate-950">调研分析方法</h2>*!/*/}
                {/*        <h2 className="text-center text-3xl font-bold">全生命周期调研方法</h2>*/}
                {/*    </div>*/}
                {/*    <div className="grid border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-3">*/}
                {/*        {METHODOLOGY_ENTRY_POINTS.map((item) => {*/}
                {/*            const Icon = item.icon;*/}
                {/*            return (*/}
                {/*                <Link*/}
                {/*                    key={item.path}*/}
                {/*                    to={item.path}*/}
                {/*                    className="group min-h-44 border-b border-r border-slate-200 p-6 hover:bg-slate-50"*/}
                {/*                >*/}
                {/*                    <Icon size={22} className="text-blue-600"/>*/}
                {/*                    <h3 className="mt-6 text-lg font-bold text-slate-950 group-hover:text-blue-700">{item.title}</h3>*/}
                {/*                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>*/}
                {/*                </Link>*/}
                {/*            );*/}
                {/*        })}*/}
                {/*    </div>*/}

                <section className="mt-1 mx-auto max-w-7xl px-5 py-12">
                    <h2 className="text-center text-3xl font-bold mb-6">全生命周期调研方法</h2>

                    <div className="relative mb-10">
                        {/* 中间连接线 */}
                        <div className="absolute top-[44px] left-0 w-full h-[2px] bg-blue-300 z-0"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-7 gap-4 relative z-10">
                            {lifeCycleList.map((item) => (
                                <div key={item.title} className="flex flex-col items-center text-center">
                                    <div
                                        className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-500 bg-white">
                                        <item.icon size={35} className="text-blue-500"/>
                                    </div>
                                    <h4 className="mt-4 font-bold text-lg">{item.title}</h4>
                                    <p className="mt-2 text-sm text-slate-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 图片横向容器：自动换行、水平均分、居中 */}
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 mb-12">
                        <img
                            src="/report-figures/figure-1-2.png"
                            alt="调研方法图"
                            className="w-full h-auto max-h-[780px] object-contain select-none pointer-events-none"
                        />
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-1 py-1 mb-1">
                    {/*<h2 className="text-center text-3xl font-bold mb-12">全生命周期逐阶段自研安全OpenClaw框架</h2>*/}

                    {/*<div className="relative">*/}
                    {/*    /!* 中间连接线 *!/*/}
                    {/*    <div className="absolute top-[44px] left-0 w-full h-[2px] bg-blue-300 z-0"></div>*/}
                    {/*    <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-7 gap-4 relative z-10">*/}
                    {/*        {lifeCycleList.map((item) => (*/}
                    {/*            <div key={item.title} className="flex flex-col items-center text-center">*/}
                    {/*                <div*/}
                    {/*                    className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-500 bg-white">*/}
                    {/*                    <item.icon size={24} className="text-blue-500"/>*/}
                    {/*                </div>*/}
                    {/*                <h4 className="mt-4 font-bold text-lg">{item.title}</h4>*/}
                    {/*                <p className="mt-2 text-sm text-slate-500">{item.desc}</p>*/}
                    {/*            </div>*/}
                    {/*        ))}*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/* 图片横向容器：自动换行、水平均分、居中 */}
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                        <img
                            src="/report-figures/figure-1-9.png"
                            alt="自研安全OpenClaw框架"
                            className="w-full h-auto max-h-[780px] object-contain select-none pointer-events-none"
                        />
                    </div>
                </section>


                <div className="mx-auto max-w-7xl px-5 md:px-8"><Footer/></div>

            </main>
            {/*<div className="mx-auto max-w-7xl px-5 md:px-8"><Footer/></div>*/}

        </div>
    );
}
