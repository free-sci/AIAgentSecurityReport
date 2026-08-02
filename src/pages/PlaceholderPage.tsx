import {Construction} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface PlaceholderPageProps {
    title?: string;
    description?: string;
}

// 赋值默认参数
export default function PlaceholderPage(
    {
        title = "页面建设中",
        description
    }: PlaceholderPageProps
) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header/>
            <main className="flex-1 relative overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-[0.4] pointer-events-none"></div>
                <div
                    className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>

                <div
                    className="relative z-10 p-8 md:p-12 lg:p-16 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
                    <div
                        className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-8">
                        <Construction size={40}/>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                        {title}
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl text-center leading-relaxed">
                        {description || '此页面正在建设中，相关内容即将推出。请关注我们的最新研究进展。'}
                    </p>
                    <div
                        className="mt-8 flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                        Coming Soon
                    </div>
                </div>

                <div className="relative z-10 px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
                    <Footer/>
                </div>
            </main>
        </div>
    );
}