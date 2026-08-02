// import {BookOpen, ExternalLink, ShieldCheck} from 'lucide-react';
import {Link, NavLink} from 'react-router-dom';

const NAV_ITEMS = [
    {label: '报告正文', enLabel: 'FullReport', path: '/fullreport'},
    {label: '调研方法', enLabel: 'Methodology', path: '/methodology'},
    {label: '学术现状', enLabel: 'Academia', path: '/academia'},
    {label: '产业现状', enLabel: 'Industry', path: '/industry'},
    {label: '安全事件', enLabel: 'Incidents', path: '/incidents'},
    {label: '政策法规', enLabel: 'Policies', path: '/policy'},
    {label: '研究展望', enLabel: 'FutureDirections', path: '/futuredirections'},
    {label: '参考文献', enLabel: 'References', path: '/references'},
];

export default function Header() {
    return (
        <header className="sticky top-0 z-50 h-[72px] w-full border-b border-slate-800 bg-slate-950 text-white">
            <div className="mx-auto flex h-full max-w-[1600px] items-center px-4 md:px-6">
                <Link to="/" className="flex h-10 flex-none items-center gap-3 pr-5 md:border-r md:border-slate-700">
                    {/*<div className="flex h-9 w-9 items-center justify-center rounded bg-blue-600">*/}
                    {/*    <ShieldCheck size={21}/>*/}
                    {/*</div>*/}
                    <div className="flex items-center justify-center">
                        <img
                            src="cnic-logo.jpeg"
                            alt="计算机网络信息中心"
                            className="h-8 w-auto object-contain"
                        />
                    </div>
                    <div className="hidden sm:block">
                        <div className="text-base font-bold">首页</div>
                        {/*<div className="text-[10px] text-slate-400">REPORT 2026</div>*/}
                    </div>
                </Link>

                <nav className="no-scrollbar flex h-full min-w-0 flex-1 items-center gap-6 overflow-x-auto px-5">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({isActive}) =>
                                `nav-link flex h-full flex-none items-center text-base font-bold ${
                                    isActive ? 'active text-white' : 'text-slate-400 hover:text-white'
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="hidden flex-none items-center gap-2 border-l border-slate-700 pl-4 xl:flex">
                    <a
                        href="https://github.com/qzx-ikun/SecurityReport.git"
                        target="_blank"
                        rel="noreferrer"
                        title="GitHub项目"
                        // className="flex h-9 w-9 items-center justify-center rounded border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"

                    >
                        {/*<ExternalLink size={16}/>*/}
                        <img
                            src="github-logo.png"
                            alt="Github项目"
                            className="h-[38px] w-auto object-contain"
                        />
                    </a>

                    <Link
                        to="/team"
                        title="团队"
                    >
                        <img
                            src="team-logo.png"
                            alt="team-logo"        // 图片加载失败时，页面显示替代文字
                            className="h-[45px] w-auto object-contain select-none pointer-events-none"
                        />
                    </Link>

                    {/*<Link*/}
                    {/*    to="/references"*/}
                    {/*    title="查看参考文献"*/}
                    {/*    className="flex h-9 w-9 items-center justify-center rounded bg-blue-600 text-white hover:bg-blue-500"*/}
                    {/*>*/}
                    {/*    <BookOpen size={16}/>*/}
                    {/*</Link>*/}
                </div>
            </div>
        </header>
    );
}
