import React, { useState } from 'react';
import { useLanguage } from '../../context/language';
import type { BookingFormData } from '../../types';
import { useDialog } from '../../hooks/useDialog';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Building, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Video,

} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  initialNotes?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onClose, 
  preselectedService = '',
  initialNotes = '' 
}) => {
  const { t, lang, services } = useLanguage();
  const dialogRef = useDialog(isOpen, onClose);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [formData, setFormData] = useState<BookingFormData>(() => ({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceCategory: preselectedService || services[0].title[lang],
    companySize: 'individual',
    preferredDate: new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Madrid' }).format(new Date(Date.now() + 86400000)),
    preferredTime: '09:30 - 10:00 Europe/Madrid',
    projectDescription: initialNotes || '',
  }));

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateStep1 = () => true;

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.preferredDate || formData.preferredDate <= new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Madrid' }).format(new Date())) {
      newErrors.preferredDate = lang === 'es' ? 'Selecciona una fecha válida' : 'Please select a date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = lang === 'es' ? 'El nombre es obligatorio' : 'Name is required';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = lang === 'es' ? 'Introduce un correo corporativo válido' : 'Valid corporate email required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) { setStep(2); return; }
    if (!validateStep3()) return;

    if (submitting) return;
    setSubmitting(true); setSubmitError('');
    try {
      const response = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setIsSubmitted(true);
    } catch (error) {
      const code = error instanceof Error ? error.message : '';
      setSubmitError(['CALENDAR_NOT_CONFIGURED', 'CALENDAR_AUTH_FAILED', 'CALENDAR_WRONG_ACCOUNT'].includes(code)
        ? (lang === 'es' ? 'La agenda todavía no está conectada. Contacta con alpha.digital.ia@gmail.com para reservar.' : 'Calendar is not connected yet. Contact alpha.digital.ia@gmail.com to book.')
        : code === 'SLOT_UNAVAILABLE'
          ? (lang === 'es' ? 'Ese horario está ocupado. Selecciona otro.' : 'This time is already booked. Choose another slot.')
          : (lang === 'es' ? 'No se pudo confirmar el envío. Reintenta con los mismos datos; no se duplicará la invitación.' : 'Could not confirm delivery. Retry with the same details; the invitation will not be duplicated.'));
    } finally { setSubmitting(false); }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setStep(1);
    setSubmitError('');
    onClose();
  };

  const timeSlots = [
    '09:30 - 10:00 Europe/Madrid',
    '10:30 - 11:00 Europe/Madrid',
    '12:00 - 12:30 Europe/Madrid',
    '15:00 - 15:30 Europe/Madrid',
    '16:30 - 17:00 Europe/Madrid',
    '17:30 - 18:00 Europe/Madrid',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={t('booking.modal.title')} className="relative w-full max-w-xl rounded-3xl bg-[#091124] border border-cyan-500/40 shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-xs font-mono font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{lang === 'es' ? 'CONSULTORÍA ESTRATÉGICA 1-ON-1' : '1-ON-1 TECHNICAL CONSULTATION'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {t('booking.modal.title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {t('booking.modal.subtitle')}
              </p>
            </div>

            {/* Stepper progress indicator */}
            <div className="flex items-center justify-between gap-2 mb-8 p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-semibold">
              <div className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all ${step === 1 ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'text-slate-400'}`}>
                1. {lang === 'es' ? 'Alcance' : 'Scope'}
              </div>
              <div className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all ${step === 2 ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'text-slate-400'}`}>
                2. {lang === 'es' ? 'Horario' : 'Schedule'}
              </div>
              <div className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all ${step === 3 ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'text-slate-400'}`}>
                3. {lang === 'es' ? 'Contacto' : 'Contact'}
              </div>
            </div>

            {/* Step 1: Project Scope */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="booking-field-1" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-2">
                    {t('booking.field.service')}
                  </label>
                      <select id="booking-field-1"                     value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.title[lang]}>
                        {s.levelBadge[lang]} - {s.title[lang]}
                      </option>
                    ))}
                    <option value="Auditoría Integral de Datos">
                      {lang === 'es' ? 'Diagnóstico & Auditoría Global de Datos' : 'Comprehensive Data & AI Audit'}
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="booking-field-2" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-2">
                    {t('booking.field.size')}
                  </label>
                      <select id="booking-field-2"                     value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                  >
                    <option value="individual">{lang === 'es' ? 'Particular / Profesional independiente' : 'Individual / Independent professional'}</option><option value="1-20">1 - 20 {lang === 'es' ? 'empleados (Startup/Pyme)' : 'employees'}</option>
                    <option value="20-100">20 - 100 {lang === 'es' ? 'empleados (Mediana empresa)' : 'employees'}</option>
                    <option value="100-500">100 - 500 {lang === 'es' ? 'empleados (Corporación mediana)' : 'employees'}</option>
                    <option value="500+">500+ {lang === 'es' ? 'empleados (Gran Multinacional / Planta)' : 'employees (Enterprise)'}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="booking-field-3" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-2">
                    {t('booking.field.notes')}
                  </label>
                      <textarea id="booking-field-3"                     rows={3}
                    placeholder={lang === 'es' ? 'Ej: Queremos predecir paradas en máquinas CNC o modernizar nuestros dashboards de ventas...' : 'e.g. We want to predict machine breakdowns or implement internal GenAI copilots...'}
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Date & Time Slot */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="booking-field-4" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-2 flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4 text-cyan-400" />
                    {t('booking.field.date')}
                  </label>
                      <input id="booking-field-4"                     type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                  />
                  {errors.preferredDate && (
                    <span className="text-xs text-rose-400 mt-1 block">{errors.preferredDate}</span>
                  )}
                </div>

                <div>
                  <div className="block text-xs font-mono uppercase text-slate-300 font-bold mb-2 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    {t('booking.field.time')}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredTime: slot })}
                        className={`p-2.5 rounded-xl text-xs font-mono font-medium text-center border transition-all ${
                          formData.preferredTime === slot
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                  <Video className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    {lang === 'es' 
                      ? 'Zona Europe/Madrid. Comprobaremos disponibilidad y enviaremos una invitación a tu correo.' 
                      : 'Europe/Madrid time. We will check availability and send you a calendar invitation.'}
                  </span>
                </div>
              </div>
            )}

            {/* Step 3: Contact Info */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="booking-field-5" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    {t('contact.form.name')}
                  </label>
                      <input id="booking-field-5"                     type="text"
                    required
                    placeholder="Carlos Gómez"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                  />
                  {errors.fullName && <span className="text-xs text-rose-400 mt-1">{errors.fullName}</span>}
                </div>

                <div>
                  <label htmlFor="booking-field-6" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    {t('contact.form.email')}
                  </label>
                      <input id="booking-field-6"                     type="email"
                    required
                    placeholder="carlos@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                  />
                  {errors.email && <span className="text-xs text-rose-400 mt-1">{errors.email}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="booking-field-7" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      {t('contact.form.phone')}
                    </label>
                      <input id="booking-field-7"                       type="tel"
                      placeholder="+34 600 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-field-8" className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-cyan-400" />
                      {t('contact.form.company')}
                    </label>
                      <input id="booking-field-8"                       type="text"
                      placeholder="Empresa S.A."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </form>
            )}

            {submitError && <p role="alert" className="mt-4 text-sm text-rose-400">{submitError}</p>}
            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t border-slate-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t('booking.btn.back')}</span>
                </button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all text-xs sm:text-sm shadow-md shadow-cyan-500/20"
                >
                  <span>{t('booking.btn.next')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit} disabled={submitting}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all text-xs sm:text-sm shadow-lg shadow-cyan-500/25 active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>{submitting ? (lang === 'es' ? 'Enviando invitación…' : 'Sending invitation…') : t('booking.btn.confirm')}</span>
                </button>
              )}
            </div>

          </div>
        ) : (
          /* Confirmation Success State */
          <div className="text-center py-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white mb-2">
              {t('booking.success.title')}
            </h3>

            <p className="text-sm text-slate-300 max-w-md mx-auto mb-2">
              {t('booking.success.msg')}
            </p>

            {/* Google Calendar notice */}
            <p className="text-xs text-cyan-400 font-mono mb-6">
              {lang === 'es'
                ? 'Invitación emitida por alpha.digital.ia@gmail.com · Europe/Madrid.'
                : 'Invitation issued by alpha.digital.ia@gmail.com · Europe/Madrid.'}
            </p>

            {/* Summary card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left font-mono text-xs space-y-2 mb-6 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'es' ? 'Cliente:' : 'Client:'}</span>
                <span className="text-white font-semibold">{formData.fullName} ({formData.company || 'Empresa'})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'es' ? 'Servicio:' : 'Service:'}</span>
                <span className="text-cyan-400 font-semibold">{formData.serviceCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'es' ? 'Fecha y Hora:' : 'Slot:'}</span>
                <span className="text-white font-semibold">{formData.preferredDate} @ {formData.preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'es' ? 'Consultor:' : 'Consultant:'}</span>
                <span className="text-emerald-400 font-semibold">Agustín Peralta (Principal DS)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-400 bg-slate-900 border border-slate-800 hover:text-white transition-all"
              >
                {lang === 'es' ? 'Cerrar' : 'Close'}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};


