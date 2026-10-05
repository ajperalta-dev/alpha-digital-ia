import { useLanguage } from '../../context/language';

export function FaqSection() {
  const { lang } = useLanguage();
  const items = lang === 'es' ? [
    ['¿Por dónde empiezo si todavía no tengo claro el proyecto?', 'Empieza por una consultoría. Revisaremos tu situación, tus objetivos y los datos disponibles para definir un alcance y los próximos pasos.'],
    ['¿Las tutorías requieren conocimientos previos?', 'Adaptamos el plan a tu punto de partida. Puedes comenzar con fundamentos de Python, SQL o Power BI, o trabajar sobre un proyecto avanzado de ciencia de datos e IA.'],
    ['¿Trabajáis con profesionales y equipos?', 'Sí. Las tutorías pueden ser individuales o para equipos. La consultoría puede centrarse en una decisión puntual o acompañar el desarrollo de una iniciativa.'],
    ['¿Cómo se confirma una sesión?', 'Elige un servicio y un horario preferido en el formulario. Envía la solicitud por WhatsApp y acordaremos contigo la disponibilidad y el formato de la sesión.'],
    ['¿Cómo se determina el presupuesto?', 'Depende del alcance, la complejidad y la modalidad de trabajo. Definimos contigo los objetivos y entregables antes de preparar una propuesta.'],
  ] : [
    ['Where should I start if my project is not defined yet?', 'Start with a consultation. We review your situation, goals and available data to define a scope and next steps.'],
    ['Do I need prior knowledge for tutoring?', 'We adapt the plan to your starting point. Begin with Python, SQL or Power BI fundamentals, or work on an advanced data science and AI project.'],
    ['Do you work with individuals and teams?', 'Yes. Tutoring is available for individuals and teams. Consulting can focus on a specific decision or support an ongoing initiative.'],
    ['How is a session confirmed?', 'Choose a service and preferred time in the form. Send the request via WhatsApp and we will agree on availability and session format with you.'],
    ['How is pricing determined?', 'Pricing depends on scope, complexity and engagement format. We agree on goals and deliverables before preparing a proposal.'],
  ];
  return <section id="faq" className="py-24 border-t border-slate-800 bg-[#030712]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
      <div><span className="text-xs font-mono text-cyan-400 tracking-widest">{lang === 'es' ? 'ANTES DE EMPEZAR' : 'BEFORE WE START'}</span><h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight">{lang === 'es' ? 'Resolvemos tus dudas.' : 'Your questions, answered.'}</h2><p className="mt-5 text-slate-400 max-w-md leading-relaxed">{lang === 'es' ? 'Cada proyecto y cada persona tienen un punto de partida. Encontramos contigo la mejor forma de avanzar.' : 'Every project and every person has a different starting point. We help you find your next step.'}</p></div>
      <div>{items.map(([question, answer]) => <details key={question} className="group border-b border-slate-800 py-5"><summary className="cursor-pointer font-semibold text-slate-200 leading-relaxed pr-4">{question}</summary><p className="mt-4 text-sm leading-relaxed text-slate-400">{answer}</p></details>)}</div>
    </div>
  </section>;
}
