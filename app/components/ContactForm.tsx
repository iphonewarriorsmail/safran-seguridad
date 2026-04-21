"use client";
import React, { useState } from "react";
import { CheckCircle, Send } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Has enviado demasiadas solicitudes. Por favor, intenta más tarde.");
        }
        throw new Error("Ocurrió un error al enviar el formulario.");
      }

      setEnviado(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Error desconocido.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full p-4 rounded-xl border bg-background text-foreground border-border focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all placeholder:text-muted/60";

  return (
    <section id="contacto" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-accent border border-accent/30 bg-accent/10 mb-4">
            Contacto
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            Consultanos{" "}
            <span className="gradient-text">sin Compromiso</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Completá el formulario y un asesor te contactará por WhatsApp para
            brindarte un presupuesto personalizado.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-10 border border-border">
            {enviado ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  ¡Mensaje enviado!
                </h3>
                <p className="text-muted">
                  Un asesor de Safra Seguridad te contactará por WhatsApp a la
                  brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field - invisible to users, bots will fill it */}
                <input type="text" name="website_url" className="hidden" tabIndex={-1} autoComplete="off" />
                
                {errorMsg && (
                  <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-500 font-bold mb-4">
                    {errorMsg}
                  </div>
                )}
                
                <div>
                  <label htmlFor="nombre" className="block text-sm font-semibold text-foreground mb-2">
                    Nombre o Empresa
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    required
                    placeholder="Ej: Juan Pérez / Consorcio Belgrano 1234"
                    className={inputClass}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-semibold text-foreground mb-2">
                      WhatsApp
                    </label>
                    <input
                      id="whatsapp"
                      name="whatsapp"
                      required
                      placeholder="Ej: 11 2345-6789"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="servicio" className="block text-sm font-semibold text-foreground mb-2">
                    Servicio de Interés
                  </label>
                  <select id="servicio" name="servicio" className={inputClass} required>
                    <option value="">Seleccioná un servicio...</option>
                    <option value="camaras">Cámaras de Seguridad</option>
                    <option value="alarma">Alarmas Monitoreadas</option>
                    <option value="accesos">Control de Accesos</option>
                    <option value="integral">Solución Integral</option>
                    <option value="mantenimiento">Mantenimiento</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-semibold text-foreground mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    placeholder="Contanos qué necesitás: cantidad de cámaras, tipo de propiedad, etc."
                    rows={4}
                    className={inputClass}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary justify-center text-base !py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    "Enviando..."
                  ) : (
                    <>
                      Enviar Solicitud
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

