import {useMemo, useState} from 'react';
import {BookOpen, FileText} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import {APPENDIX_FILTERS, APPENDIX_TEXTS} from '../data/appendixContent';

export default function AppendixPage() {
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = useMemo(() => {
        const available = new Set(APPENDIX_TEXTS.flatMap((item) => item.keywords));
        return APPENDIX_FILTERS.filter((filter) => filter.id === 'all' || available.has(filter.id));
    }, []);

    const visibleTexts = useMemo(() => {
        if (activeFilter === 'all') return APPENDIX_TEXTS;
        return APPENDIX_TEXTS.filter((item) => item.keywords.includes(activeFilter));
    }, [activeFilter]);

    const paragraphCount = visibleTexts.reduce((sum, item) => sum + item.paragraphs.length, 0);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header/>

            <main className="flex-1">
                <section className="border-b border-slate-200 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 py-12">
                        <div className="flex items-start gap-5">
                            <div
                                className="w-14 h-14 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                                <FileText size={28}/>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-600 mb-3">
                                    PDF Appendix Text
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-950 tracking-tight">
                                    Appendix
                                </h1>
                                <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">
                                    展示 PDF 附录中的说明性正文内容。结构化表格已迁移到 Tables 页面独立查看。
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    type="button"
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`px-4 py-3 rounded-lg border text-left transition-colors ${
                                        activeFilter === filter.id
                                            ? 'bg-blue-600 border-blue-600 text-white'
                                            : 'bg-white border-slate-200 text-slate-700 hover:border-blue-200 hover:text-blue-700'
                                    }`}
                                >
                                    <span className="block text-sm font-bold">{filter.label}</span>
                                    <span className={`block text-[11px] mt-1 ${
                                        activeFilter === filter.id ? 'text-blue-100' : 'text-slate-400'
                                    }`}>
                    {filter.description}
                  </span>
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 text-xs font-bold uppercase tracking-widest text-slate-400">
                            当前显示 {visibleTexts.length} 个附录文本 / {paragraphCount} 行原文
                        </div>
                    </div>
                </section>

                <section className="max-w-5xl mx-auto px-8 md:px-12 lg:px-16 py-10 space-y-10">
                    {visibleTexts.map((item) => (
                        <section key={item.title} className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div
                                    className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                                    <BookOpen size={18}/>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1">
                                        {item.appendix}
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">{item.title}</h2>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {item.keywords.map((keyword) => (
                                            <span key={keyword}
                                                  className="px-2 py-1 rounded bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {keyword}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="border-l-4 border-blue-600 pl-6 space-y-3">
                                {item.paragraphs.map((paragraph, index) => (
                                    <p key={`${item.title}-${index}`} className="text-sm leading-7 text-slate-700">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </section>
                    ))}
                </section>

                <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
                    <Footer/>
                </div>
            </main>
        </div>
    );
}
