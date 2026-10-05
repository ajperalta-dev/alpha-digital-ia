import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Bot, LoaderCircle, Send, X } from 'lucide-react';
import { useLanguage } from '../../context/language';

type Message = { id: string; role: 'user' | 'assistant'; content: string };

export function ChatbotWidget({ onOpenBooking }: { onOpenBooking: () => void }) {
  const { lang } = useLanguage();
  const es = lang === 'es';
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [provider, setProvider] = useState<'ollama' | 'openai' | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [messages, loading, open]);
  useEffect(() => {
    if (!open || configured !== null) return;
    fetch('/api/health').then(response => response.json()).then(data => {
      setConfigured(Boolean(data.aiConfigured));
      setProvider(data.provider === 'openai' ? 'openai' : 'ollama');
    }).catch(() => setConfigured(false));
  }, [open, configured]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const send = async (text = input) => {
    const content = text.trim();
    if (!content || loading) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content };
    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setInput('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang, messages: conversation.map(({ role, content }) => ({ role, content })) }),
      });
      const data = await response.json() as { message?: string; error?: string };
      if (!response.ok || !data.message) throw new Error(data.error || 'Request failed');
      setMessages(previous => [...previous, { id: crypto.randomUUID(), role: 'assistant', content: data.message! }]);
    } catch (requestError) {
      const code = requestError instanceof Error ? requestError.message : '';
      if (code === 'AI_NOT_CONFIGURED') {
        setError(es ? 'El asistente aún no tiene configurada la clave del servidor.' : 'The assistant server key has not been configured yet.');
      } else if (code === 'AI_CREDITS_EXHAUSTED') {
        setError(es ? 'El asistente está conectado, pero la cuenta de OpenAI no tiene saldo disponible.' : 'The assistant is connected, but the OpenAI account has no available credit.');
      } else if (code === 'AI_UNAVAILABLE') {
        setError(es ? 'El modelo local no está disponible y el respaldo de OpenAI no pudo responder.' : 'The local model is unavailable and the OpenAI fallback could not respond.');
      } else {
        setError(es ? 'No hemos podido obtener una respuesta. Inténtalo de nuevo.' : 'We could not get a response. Please try again.');
      }
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const prompts = es
    ? ['¿Qué solución me conviene?', 'Quiero una tutoría', 'Necesito consultoría']
    : ['Which solution fits me?', 'I want tutoring', 'I need consulting'];

  return <div className="fixed bottom-5 right-4 sm:right-6 z-40">
    <button ref={triggerRef} onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="alpha-assistant" aria-label={es ? 'Abrir asistente con IA' : 'Open AI assistant'} className={`${open ? 'sr-only' : ''} flex items-center gap-2 p-4 rounded-2xl bg-cyan-400 text-slate-950 shadow-xl hover:bg-cyan-300`}>
      <Bot size={24} /><span className="hidden sm:block text-sm font-semibold">{es ? 'Asistente IA' : 'AI assistant'}</span>
    </button>

    {open && <section id="alpha-assistant" aria-label={es ? 'Asistente con IA' : 'AI assistant'} onKeyDown={event => { if (event.key === 'Escape') close(); }} className="w-[calc(100vw-2rem)] sm:w-[390px] h-[560px] max-h-[82dvh] flex flex-col rounded-2xl overflow-hidden border border-slate-700 bg-[#091124] shadow-2xl">
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <div><h2 className="font-semibold text-white">ALPHA · {es ? 'Asistente IA' : 'AI assistant'}</h2><p className={`text-xs mt-1 ${configured ? 'text-emerald-400' : 'text-amber-400'}`}>{configured === null ? (es ? 'Comprobando conexión…' : 'Checking connection…') : configured ? (provider === 'ollama' ? (es ? 'Modelo local · Ollama' : 'Local model · Ollama') : (es ? 'Conectado a OpenAI' : 'Powered by OpenAI')) : (es ? 'Configuración del servidor pendiente' : 'Server setup pending')}</p></div>
        <button onClick={close} aria-label={es ? 'Cerrar asistente' : 'Close assistant'} className="p-2 text-slate-400 hover:text-white"><X size={20} /></button>
      </div>

      <div ref={logRef} role="log" aria-live="polite" aria-relevant="additions" className="p-4 flex-1 min-h-0 overflow-y-auto space-y-3">
        <p className="text-sm leading-relaxed text-slate-300">{es ? 'Hola. Cuéntame qué quieres conseguir y te orientaré sobre nuestras soluciones, consultoría o tutorías.' : 'Hello. Tell me what you want to achieve and I will guide you through our solutions, consulting or tutoring.'}</p>
        {messages.map(message => <p key={message.id} className={`whitespace-pre-wrap text-sm leading-relaxed rounded-xl p-3 ${message.role === 'user' ? 'bg-cyan-400 text-slate-950 ml-8' : 'bg-slate-900 text-slate-200 mr-4'}`}>{message.content}</p>)}
        {loading && <div className="flex items-center gap-2 text-sm text-slate-400"><LoaderCircle size={16} className="animate-spin" />{es ? 'Pensando…' : 'Thinking…'}</div>}
        {error && <p role="alert" className="text-sm rounded-xl border border-rose-500/30 bg-rose-950/30 p-3 text-rose-300">{error}</p>}
      </div>

      {messages.length === 0 && <div className="flex gap-2 px-4 py-2 overflow-x-auto">{prompts.map(prompt => <button key={prompt} onClick={() => send(prompt)} disabled={loading} className="text-xs shrink-0 text-cyan-400 border border-slate-700 rounded-lg px-3 py-2 hover:border-cyan-400">{prompt}</button>)}</div>}
      <button className="px-4 py-2 text-xs text-cyan-400 flex items-center gap-2" onClick={() => { close(); onOpenBooking(); }}>{es ? 'Solicitar una sesión' : 'Request a session'}<ArrowUpRight size={14} /></button>
      <form className="p-3 flex gap-2 border-t border-slate-700" onSubmit={event => { event.preventDefault(); send(); }}>
        <input ref={inputRef} aria-label={es ? 'Tu pregunta' : 'Your question'} placeholder={es ? 'Escribe tu pregunta…' : 'Type your question…'} maxLength={2000} value={input} onChange={event => setInput(event.target.value)} className="min-w-0 flex-1 p-2 rounded-lg bg-slate-900 text-white text-sm" />
        <button type="submit" disabled={!input.trim() || loading} aria-label={es ? 'Enviar pregunta' : 'Send question'} className="p-3 rounded-lg bg-cyan-400 text-slate-950 disabled:opacity-40"><Send size={18} /></button>
      </form>
      <p className="px-4 pb-3 text-[10px] text-slate-500">{es ? 'Se usa el modelo local; OpenAI puede actuar como respaldo. No compartas datos sensibles.' : 'The local model is used; OpenAI may act as fallback. Do not share sensitive data.'}</p>
    </section>}
  </div>;
}
