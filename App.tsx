
import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, Cell as RechartsCell
} from 'recharts';
import { 
  Building2, Users, TrendingUp, Newspaper, Landmark, Coins, Target, ShieldCheck,
  Printer, Search, ArrowUp, Sparkles, LayoutDashboard, Briefcase, Heart, AlertTriangle, ZapOff, Scale, Info, Activity, GraduationCap, Download
} from 'lucide-react';
import { 
  POAI_INVESTMENT, PURPOSES, 
  TOP_ORGANISMS, VULNERABLE_GROUPS,
  FUNDING_SOURCES, GROWTH_PERCENTAGE, TOP_PROGRAMS
} from './constants';

const COLORS = ['#086474', '#5c6c24', '#3b82f6', '#ef4444', '#8b5cf6', '#6366f1', '#ec4899', '#f59e0b'];

const DECREE_INFO = "Decreto No. 4112.010.20.1049 de 2025 (Diciembre 17)";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
};

const formatBillions = (value: number) => {
  return `$${(value / 1e12).toFixed(2)}B`;
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'challenges' | 'sources' | 'entities' | 'populations'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: <Newspaper size={18} /> },
    { id: 'challenges', label: 'Propósitos', icon: <Target size={18} /> },
    { id: 'sources', label: 'Fuentes', icon: <Coins size={18} /> },
    { id: 'entities', label: 'Inversión', icon: <Building2 size={18} /> },
    { id: 'populations', label: 'Social', icon: <Users size={18} /> },
  ];

  const allOrganismsSorted = useMemo(() => {
    return [...TOP_ORGANISMS].sort((a, b) => b.budget - a.budget);
  }, []);

  const filteredOrganismsTable = useMemo(() => {
    return allOrganismsSorted.filter(org => 
      org.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allOrganismsSorted]);

  const top7 = useMemo(() => allOrganismsSorted.slice(0, 7), [allOrganismsSorted]);
  const othersTotal = useMemo(() => allOrganismsSorted.slice(7).reduce((acc, curr) => acc + curr.budget, 0), [allOrganismsSorted]);

  const chartDataGrouped = useMemo(() => {
    return [
      ...top7,
      { name: 'Otros Organismos', budget: othersTotal }
    ];
  }, [top7, othersTotal]);

  const totalOrganismsBudget = allOrganismsSorted.reduce((acc, curr) => acc + curr.budget, 0);

  const icldSource = FUNDING_SOURCES.find(f => f.name.includes('ICLD') || f.name.includes('Libre')) || FUNDING_SOURCES[1];
  const creditSource = FUNDING_SOURCES.find(f => f.name.includes('Crédito') || f.name.includes('Empréstito')) || FUNDING_SOURCES[3];

  const downloadPDF = () => window.print();

  const downloadHTML = () => {
    const htmlContent = document.documentElement.outerHTML;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Cali_Presupuesto_2026_Dashboard.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pb-20 xl:pb-0">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          main { padding: 0 !important; }
          .bg-[#086474] { background-color: #086474 !important; -webkit-print-color-adjust: exact; }
          .rounded-[40px] { border-radius: 1rem !important; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Header */}
      <header className="bg-[#086474] text-white shadow-xl sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-20 items-center">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-xl text-[#086474]"><Landmark size={32} /></div>
            <div className="hidden sm:block leading-none">
              <h1 className="text-xl font-black uppercase tracking-tighter">Cali 2026</h1>
              <p className="text-[8px] text-slate-300 font-bold uppercase mt-1 tracking-widest">Sostenibilidad Fiscal</p>
            </div>
          </div>
          <nav className="hidden xl:flex space-x-1">
            {tabs.map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-black transition-all rounded-full ${activeTab === tab.id ? 'bg-white text-[#086474] shadow-lg' : 'text-white hover:bg-white/10'}`}
              >
                {tab.icon}{tab.label.toUpperCase()}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
             <button 
               onClick={downloadHTML} 
               title="Descargar HTML"
               className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all text-[10px] font-black uppercase"
             >
               <Download size={18} />
               <span className="hidden md:inline">Exportar HTML</span>
             </button>
             <button 
               onClick={downloadPDF} 
               title="Imprimir"
               className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all"
             >
               <Printer size={18} />
             </button>
             <span className="hidden sm:inline-flex bg-green-500 text-white text-[9px] px-3 py-1 rounded-full font-black uppercase shadow-sm">Aprobado</span>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <div className="bg-white border-b border-slate-200 py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                 <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                    <ZapOff size={14} className="text-amber-500" /> Planeación Financiera y Sostenibilidad Fiscal
                 </div>
                 <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter">
                    {activeTab === 'sources' ? 'Análisis de Fuentes 2026' : activeTab === 'challenges' ? 'Propósitos y Estructura de Inversión' : 'Cali 2026: Dashboard Ejecutivo'}
                 </h2>
              </div>
              <div className="bg-slate-900 text-white p-6 rounded-[30px] shadow-lg flex items-center gap-4">
                 <div className="bg-[#086474] p-3 rounded-2xl"><Coins size={24} /></div>
                 <div>
                    <div className="text-[10px] font-bold uppercase opacity-60">Total Inversión</div>
                    <div className="text-2xl font-black">{formatBillions(POAI_INVESTMENT)}</div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* PESTAÑA: PROPÓSITOS (CHALLENGES) */}
        {activeTab === 'challenges' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
               <div className="lg:col-span-2 bg-[#086474] text-white p-10 rounded-[40px] shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><Scale size={140} /></div>
                  <div className="relative z-10">
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Crecimiento de la Inversión</div>
                    <div className="text-5xl font-black mb-4 flex items-center gap-3">
                      <ArrowUp size={48} className="text-green-400" />
                      {GROWTH_PERCENTAGE}%
                    </div>
                    <div className="bg-amber-500 text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase inline-flex items-center gap-2 mb-6 shadow-lg">
                      <AlertTriangle size={14} /> Recursos No Recurrentes
                    </div>
                    <p className="text-sm font-medium leading-relaxed opacity-90 border-t border-white/10 pt-4">
                      <strong>Nota Técnica:</strong> Este incremento histórico está vinculado directamente a <strong>recursos del crédito</strong> ({formatBillions(creditSource.value)}). Al tratarse de fuentes extraordinarias, el cumplimiento de los retos estratégicos en 2026 presenta una alta dependencia de financiación que no se repetirá estructuralmente en las siguientes vigencias.
                    </p>
                  </div>
               </div>
               <div className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 overflow-hidden relative">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Sparkles size={16} className="text-amber-500" /> Programas con Mayor Apropiación
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {TOP_PROGRAMS.slice(0, 4).map((prog, i) => (
                       <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-colors">
                          <div className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">{prog.name}</div>
                          <div className="text-sm font-black text-slate-800">{formatBillions(prog.budget)}</div>
                          <div className="w-full bg-slate-200 h-1 mt-2 rounded-full">
                             <div className="h-full bg-[#086474] rounded-full" style={{ width: `${(prog.budget/TOP_PROGRAMS[0].budget)*100}%` }}></div>
                          </div>
                       </div>
                     ))}
                  </div>
                  <div className="mt-6 flex items-center gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                     <Info size={16} className="text-blue-500" />
                     <p className="text-[9px] font-bold text-slate-400 uppercase leading-tight italic">
                        La inversión en estos sectores estratégicos requiere una planeación fiscal rigurosa ante la finitud de las fuentes de crédito.
                     </p>
                  </div>
               </div>
            </div>

            <div className="space-y-8">
               {PURPOSES.map((purpose, idx) => (
                 <div key={idx} className="bg-white rounded-[50px] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                       <div className="lg:w-1/3 p-10 bg-slate-50/50 border-r border-slate-100 flex flex-col justify-between">
                          <div>
                             <div className="bg-white w-14 h-14 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                                {idx === 0 ? <Heart size={28} className="text-[#086474]" /> : 
                                 idx === 1 ? <LayoutDashboard size={28} className="text-[#086474]" /> : 
                                             <ShieldCheck size={28} className="text-[#086474]" />}
                             </div>
                             <h3 className="text-2xl font-black text-slate-900 mb-4">{purpose.name}</h3>
                             <p className="text-slate-500 text-xs font-medium leading-relaxed">{purpose.description}</p>
                          </div>
                          <div className="mt-8 pt-8 border-t border-slate-200">
                             <div className="text-3xl font-black text-slate-900">{purpose.percentage}%</div>
                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Peso en el POAI 2026</div>
                          </div>
                       </div>
                       <div className="lg:w-2/3 p-10">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Retos Estratégicos del Propósito</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                             {purpose.challenges?.map((reto, ridx) => (
                               <div key={ridx} className="relative">
                                  <div className="flex justify-between items-end mb-3">
                                     <div className="max-w-[70%]">
                                        <div className="text-[9px] font-black text-[#086474] uppercase mb-1">RETO {ridx + 1}</div>
                                        <span className="text-sm font-black text-slate-800 leading-tight block">{reto.name}</span>
                                     </div>
                                     <div className="text-right"><span className="text-lg font-black text-slate-900">{reto.percentage}%</span></div>
                                  </div>
                                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                     <div className="h-full bg-[#086474] rounded-full transition-all duration-1000 group-hover:bg-blue-500" style={{ width: `${reto.percentage}%` }}></div>
                                  </div>
                                  <div className="mt-3 text-[10px] font-bold text-slate-400">Presupuesto: {formatCurrency(reto.value)}</div>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* PESTAÑA: FUENTES (SOURCES) */}
        {activeTab === 'sources' && (
          <div className="space-y-10 animate-in zoom-in-95 duration-500">
            <div className="bg-white rounded-[50px] shadow-sm border border-slate-100 overflow-hidden">
               <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 p-10 lg:p-14 bg-slate-50/50 border-r border-slate-100">
                     <div className="flex items-center gap-3 mb-8">
                        <div className="bg-amber-100 p-3 rounded-2xl text-amber-600"><AlertTriangle size={28} /></div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Sostenibilidad de Fuentes</h3>
                     </div>
                     <div className="space-y-8">
                        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-4 opacity-10"><Scale size={48} /></div>
                           <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dependencia del Crédito</span>
                              <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded-full font-black uppercase">No Recurrente</span>
                           </div>
                           <div className="text-2xl font-black text-slate-900 mb-1">{formatCurrency(creditSource.value)}</div>
                           <p className="text-[10px] font-bold text-slate-500 uppercase">Equivale al {creditSource.percentage}% de la inversión</p>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-3xl text-white">
                           <h4 className="text-[10px] font-black text-[#086474] uppercase tracking-widest mb-3">Conclusión de Planeación</h4>
                           <p className="text-xs leading-relaxed opacity-80 italic">
                             "La baja participación de los ICLD ({icldSource.percentage}%) exige que el Distrito fortalezca el ahorro recurrente para no depender exclusivamente de deuda en vigencias futuras."
                           </p>
                        </div>
                     </div>
                  </div>
                  <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
                     <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie 
                              data={FUNDING_SOURCES} 
                              dataKey="value" 
                              outerRadius={140} 
                              innerRadius={90} 
                              stroke="none" 
                              paddingAngle={5}
                            >
                              {FUNDING_SOURCES.map((entry, i) => (
                                <Cell 
                                  key={i} 
                                  fill={entry.name.includes('Crédito') || entry.name.includes('Empréstito') ? '#ef4444' : (entry.name.includes('Libre') ? '#f59e0b' : COLORS[i % COLORS.length])} 
                                />
                              ))}
                            </Pie>
                            <Tooltip formatter={(v: any) => formatCurrency(v)} />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                          </PieChart>
                        </ResponsiveContainer>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* PESTAÑA: RESUMEN (OVERVIEW) */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <CompositionCard title="Inversión" value={6032669271143} percentage={77.6} color="bg-[#086474]" icon={<TrendingUp size={24} />} />
              <CompositionCard title="Funcionamiento" value={1452241028271} percentage={18.7} color="bg-slate-600" icon={<Building2 size={24} />} />
              <CompositionCard title="Servicio Deuda" value={285457172129} percentage={3.7} color="bg-slate-400" icon={<ShieldCheck size={24} />} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2"><Briefcase size={20} /> Distribución por Propósitos</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={PURPOSES} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value">
                        {PURPOSES.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip formatter={(v: any) => formatCurrency(v)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-[#086474] text-white p-10 rounded-[40px] shadow-xl flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform">
                  <Activity size={240} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-white/20 p-2 rounded-lg"><Activity size={20} className="text-green-400" /></div>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Inversión Bandera 2026</span>
                  </div>
                  <h4 className="text-3xl sm:text-4xl font-black mb-2 leading-none uppercase tracking-tighter">Salud Integral y de Calidad</h4>
                  <p className="text-xs font-medium opacity-60 mb-8 max-w-[80%] uppercase">Eje fundamental de la Cali Reconciliada y el bienestar social del Distrito.</p>
                  
                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-white/40 mb-1 tracking-widest">Presupuesto Asignado</p>
                      <p className="text-4xl sm:text-5xl font-black text-green-400 leading-none tracking-tighter">{formatBillions(1812098103592)}</p>
                    </div>
                    <div className="bg-white/10 px-4 py-2 rounded-2xl flex items-center gap-3">
                       <GraduationCap size={24} className="text-amber-400" />
                       <div className="text-left">
                          <p className="text-[9px] font-black opacity-40 uppercase leading-none">Cali Educada</p>
                          <p className="text-sm font-black">{formatBillions(1251240059614)}</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA: ORGANISMOS (ENTITIES) */}
        {activeTab === 'entities' && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Estructura por Organismos</h3>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">Análisis de la arquitectura financiera distrital</p>
              </div>
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Filtrar por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#086474]/20 focus:border-[#086474] outline-none transition-all"
                />
              </div>
            </div>
            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto max-h-[600px] overflow-y-auto scrollbar-hide">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/80 backdrop-blur-sm sticky top-0 text-[10px] text-slate-400 uppercase tracking-widest font-black z-20">
                      <tr><th className="px-8 py-6">Organismo</th><th className="px-8 py-6 text-right">Apropiación</th><th className="px-8 py-6 text-right">%</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredOrganismsTable.map((org, i) => (
                        <tr key={i} className="group hover:bg-slate-50 transition-all">
                          <td className="px-8 py-6">
                            <span className="font-black text-sm text-slate-800 group-hover:text-[#086474]">{org.name}</span>
                            <div className="text-[9px] font-bold text-slate-400 mt-1 uppercase">{org.projects} PROYECTOS</div>
                          </td>
                          <td className="px-8 py-6 text-right font-black text-sm text-slate-900">{formatCurrency(org.budget)}</td>
                          <td className="px-8 py-6 text-right font-black text-slate-500">{((org.budget / totalOrganismsBudget) * 100).toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </div>
          </div>
        )}

        {/* PESTAÑA: SOCIAL (POPULATIONS) */}
        {activeTab === 'populations' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[50px] shadow-sm border border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 mb-10 uppercase tracking-tighter">Inversión Social por Grupo</h3>
                <div className="space-y-8">
                  {VULNERABLE_GROUPS.map((group, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-slate-800 font-black text-sm uppercase tracking-tighter">{group.name}</span>
                        <span className="text-slate-900 font-black text-lg">{formatCurrency(group.budget)}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${(group.budget / 724000173657 * 100)}%`, backgroundColor: COLORS[i % COLORS.length] }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#086474] p-10 rounded-[50px] shadow-xl text-white flex flex-col justify-center">
                 <h4 className="text-xs font-black uppercase tracking-widest opacity-60 mb-6">Nota Metodológica Social</h4>
                 <div className="flex gap-4">
                    <div className="bg-white/10 p-3 h-12 w-12 rounded-2xl flex items-center justify-center shrink-0"><Users size={24}/></div>
                    <p className="text-sm font-medium leading-relaxed opacity-90 italic">
                      "El Plan Operativo Anual de Inversiones (POAI) 2026 garantiza que los recursos se destinen a mejorar la calidad de vida de quienes más lo necesitan, priorizando salud y educación como ejes de reconciliación."
                    </p>
                 </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer Minimalista */}
      <footer className="bg-white border-t border-slate-200 py-16 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="flex flex-col items-center gap-4">
              <div className="bg-[#086474] p-3 rounded-2xl text-white mb-2 shadow-lg"><Landmark size={28} /></div>
              <div>
                 <div className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight">Análisis de Planeación Financiera y Sostenibilidad Fiscal</div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">{DECREE_INFO}</div>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

const CompositionCard = ({ title, value, percentage, color, icon }: any) => (
  <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-lg transition-all">
    <div className="flex justify-between items-start mb-6">
      <div className={`p-4 ${color} text-white rounded-3xl shadow-lg`}>{icon}</div>
      <div className="text-right">
        <div className="text-2xl font-black text-slate-900">{percentage}%</div>
        <div className="text-[9px] font-black text-slate-400 uppercase">Peso</div>
      </div>
    </div>
    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</h4>
    <div className="text-xl font-black text-slate-800">{formatCurrency(value)}</div>
  </div>
);

export default App;
