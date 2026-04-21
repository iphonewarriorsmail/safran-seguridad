'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    q: "¿Cuántas cámaras necesito para mi casa o negocio?",
    a: "Depende del tamaño y los puntos vulnerables. Generalmente, una casa estándar requiere entre 4 y 6 cámaras para cubrir frentes, fondos y accesos. Ofrecemos relevamientos sin cargo para determinar la cantidad exacta."
  },
  {
    q: "¿Se puede ver desde el celular en tiempo real?",
    a: "Sí, todos nuestros sistemas (CCTV, DVR, NVR) se configuran con una aplicación gratuita para iOS y Android desde la cual puedes ver las cámaras en vivo y revisar grabaciones desde cualquier lugar del mundo."
  },
  {
    q: "¿Qué pasa con la alarma o cámaras si se corta la luz?",
    a: "Nuestros paneles de alarma cuentan con baterías de respaldo que mantienen el sistema funcionando por hasta 24/48 hs. Para las cámaras, recomendamos e instalamos UPS (sistemas de alimentación ininterrumpida) para garantizar la grabación continua."
  }
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-accent border border-accent/30 bg-accent/10 mb-4">
            Dudas Comunes
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            Preguntas <span className="gradient-text">Frecuentes</span>
          </h2>
          <p className="text-muted">
            Resolvemos las dudas más habituales sobre nuestras instalaciones y servicios.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl overflow-hidden transition-all duration-300">
              <button
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-bold text-lg">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-muted transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-muted leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/preguntas-frecuentes" className="inline-flex items-center gap-2 font-bold text-accent hover:text-accent/80 transition-colors">
            Ver todas las preguntas frecuentes
          </Link>
        </div>
      </div>
    </section>
  )
}
