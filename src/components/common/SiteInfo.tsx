import { X } from 'lucide-react';
import { useLanguage } from '../../context/language';
import { useDialog } from '../../hooks/useDialog';

export function SiteInfo({ onClose }: { onClose: () => void }) {
  const { lang } = useLanguage();
  const ref = useDialog(true, onClose);
  const es = lang === 'es';
  return <div className="fixed inset-0 z-[70] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
    <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="site-info-title" className="max-w-xl w-full max-h-[85dvh] overflow-auto rounded-2xl border border-slate-700 bg-[#091124] p-6 sm:p-8">
      <div className="flex justify-between items-center gap-4 mb-6"><h2 id="site-info-title" className="text-xl font-bold text-white">{es ? 'Información de esta web' : 'About this website'}</h2><button onClick={onClose} aria-label={es ? 'Cerrar información' : 'Close information'} className="p-2 text-slate-400"><X size={20} /></button></div>
      <div className="space-y-5 text-sm leading-relaxed text-slate-300">
        <p>{es ? 'La web guarda tu idioma y tema en el almacenamiento local del navegador. El asistente usa el proveedor configurado en el servidor y no conserva la conversación entre recargas.' : 'The website saves your language and theme in browser local storage. The assistant uses the provider configured on the server and does not retain the conversation between reloads.'}</p>
        <p>{es ? 'Cuando la agenda corporativa está conectada, el formulario de reserva comprueba disponibilidad y envía una invitación de Google Calendar al correo indicado.' : 'When the corporate calendar is connected, the booking form checks availability and sends a Google Calendar invitation to the supplied email address.'}</p>
        <p>{es ? 'Al abrir WhatsApp o Google Calendar, utilizas servicios externos. Las fuentes tipográficas de esta versión se cargan desde Google Fonts.' : 'Opening WhatsApp or Google Calendar uses external services. This version loads typefaces from Google Fonts.'}</p>
        <p>{es ? 'Contacto: ' : 'Contact: '}<a className="text-cyan-400 break-all underline" href="mailto:alpha.digital.ia@gmail.com">alpha.digital.ia@gmail.com</a></p>
      </div>
    </div>
  </div>;
}
