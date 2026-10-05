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
        <p>{es ? 'Esta versión incluye casos de uso de demostración, señalados expresamente. Las cifras simuladas no son resultados de clientes.' : 'This version includes explicitly labeled demonstration use cases. Simulated figures are not client results.'}</p>
        <p>{es ? 'La web guarda tu idioma y tema en el almacenamiento local del navegador. El asistente envía el texto de la conversación a OpenAI para generar cada respuesta; la web no conserva la conversación entre recargas.' : 'The website saves your language and theme in browser local storage. The assistant sends conversation text to OpenAI to generate each response; the website does not retain the conversation between reloads.'}</p>
        <p>{es ? 'Los formularios preparan información para tu aplicación de correo o WhatsApp. Revisa y envía el mensaje allí. Un recordatorio de Google Calendar no confirma una reserva.' : 'Forms prepare information for your email app or WhatsApp. Review and send the message there. A Google Calendar reminder does not confirm a booking.'}</p>
        <p>{es ? 'Al abrir WhatsApp o Google Calendar, utilizas servicios externos. Las fuentes tipográficas de esta versión se cargan desde Google Fonts.' : 'Opening WhatsApp or Google Calendar uses external services. This version loads typefaces from Google Fonts.'}</p>
        <p>{es ? 'Contacto: ' : 'Contact: '}<a className="text-cyan-400 break-all underline" href="mailto:alpha.digital.ia@gmail.com">alpha.digital.ia@gmail.com</a></p>
      </div>
    </div>
  </div>;
}
