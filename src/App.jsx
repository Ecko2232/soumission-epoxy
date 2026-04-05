import './index.css'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Star, CheckCircle, MapPin, ChevronDown } from 'lucide-react'
import LeadForm from './components/LeadForm'
import { cities } from './data/cities'

const faqs = [
  { q: 'Combien coûte un plancher époxy?', a: 'Le prix varie entre 3$ et 10$ le pied carré selon le type de système et l\'état du béton. Obtenez une soumission gratuite pour un prix exact.' },
  { q: 'Combien de temps dure l\'installation?', a: 'La plupart des garages résidentiels sont complétés en 1 journée. Sous-sols et espaces commerciaux peuvent nécessiter 2-3 jours.' },
  { q: 'Le plancher époxy est-il glissant?', a: 'Non — un additif antidérapant est toujours inclus. Le plancher reste sécuritaire même mouillé.' },
  { q: 'Quelle est la durée de vie?', a: 'Avec une application professionnelle, un plancher époxy dure 15 à 20 ans avec un entretien minimal.' },
  { q: 'Est-ce que vous servez ma ville?', a: 'Nous mettons en contact avec des poseurs certifiés dans toute la province de Québec. Remplissez le formulaire pour vérifier.' },
]

function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section style={{ padding: '80px 24px', background: '#f8faff' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '800', textAlign: 'center', margin: '0 0 48px', color: '#1a1a1a' }}>
          Questions fréquentes
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid', borderColor: open === i ? '#1a73e8' : '#e2e8f0', borderRadius: '12px', overflow: 'hidden', transition: 'border-color 0.2s' }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: open === i ? '#1a73e8' : '#1a1a1a' }}>{f.q}</span>
                <ChevronDown size={18} color="#94a3b8" style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
              </button>
              {open === i && (
                <div style={{ padding: '0 20px 18px', color: '#64748b', fontSize: '14px', lineHeight: '1.7' }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [selectedCity, setSelectedCity] = useState('')

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>

      {/* Top bar */}
      <div style={{ background: '#1a73e8', color: '#fff', textAlign: 'center', padding: '10px 24px', fontSize: '14px', fontWeight: '500' }}>
        📞 Un poseur vous rappelle sous 2h · Service dans tout le Québec
      </div>

      {/* Navbar */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0 24px', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <div>
            <span style={{ fontSize: '20px', fontWeight: '800', color: '#1a73e8' }}>Soumission</span>
            <span style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a1a' }}>Époxy</span>
            <span style={{ fontSize: '11px', background: '#eff6ff', color: '#1a73e8', padding: '2px 8px', borderRadius: '100px', marginLeft: '8px', fontWeight: '600' }}>Québec</span>
          </div>
          <a href="tel:5141234567" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#1a73e8', color: '#fff', textDecoration: 'none', padding: '9px 18px', borderRadius: '8px', fontSize: '14px', fontWeight: '600' }}>
            <Phone size={14} />
            Appel gratuit
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #f8faff 100%)', padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: '60px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />)}
              <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>4.9/5 · 200+ soumissions données</span>
            </div>

            <h1 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: '800', color: '#1a1a1a', margin: '0 0 18px', lineHeight: '1.15', letterSpacing: '-1px' }}>
              Soumission époxy{' '}
              <span style={{ color: '#1a73e8' }}>gratuite</span>{' '}
              au Québec
            </h1>

            <p style={{ fontSize: '18px', color: '#475569', lineHeight: '1.7', margin: '0 0 28px', maxWidth: '500px' }}>
              Comparez les meilleurs poseurs d'époxy certifiés dans votre région. Gratuit, sans engagement, réponse sous 2 heures.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
              {['Réseau de poseurs certifiés au Québec', 'Soumission gratuite — aucune carte de crédit', 'Rappel garanti sous 2 heures'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={18} color="#22c55e" />
                  <span style={{ fontSize: '15px', color: '#1a1a1a', fontWeight: '500' }}>{t}</span>
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '10px', fontWeight: '500' }}>Villes populaires :</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cities.slice(0, 6).map(c => (
                  <a key={c.slug} href="#form" onClick={() => setSelectedCity(c.name)}
                    style={{ padding: '6px 14px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '100px', fontSize: '13px', fontWeight: '500', color: '#475569', textDecoration: 'none', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#1a73e8'; e.currentTarget.style.color = '#1a73e8' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#475569' }}
                  >
                    <MapPin size={11} style={{ display: 'inline', marginRight: '4px' }} />
                    {c.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.div id="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ background: '#fff', borderRadius: '20px', padding: '36px', boxShadow: '0 4px 40px rgba(26,115,232,0.12)', border: '1px solid #e2e8f0' }}
          >
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'inline-block', background: '#eff6ff', color: '#1a73e8', fontSize: '12px', fontWeight: '700', padding: '4px 12px', borderRadius: '100px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                100% Gratuit
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>
                Obtenez votre soumission
              </h2>
            </div>
            <LeadForm city={selectedCity} />
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '800', textAlign: 'center', margin: '0 0 16px', color: '#1a1a1a' }}>Comment ça marche?</h2>
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '17px', margin: '0 0 56px' }}>Simple, rapide et gratuit.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              { step: '1', title: 'Remplissez le formulaire', desc: 'Indiquez votre type de projet et votre ville. 60 secondes maximum.' },
              { step: '2', title: 'On trouve votre poseur', desc: 'Nous contactons les meilleurs poseurs certifiés de votre région.' },
              { step: '3', title: 'Recevez votre soumission', desc: 'Un poseur vous rappelle sous 2h avec un prix exact et sans engagement.' },
            ].map(item => (
              <div key={item.step} style={{ textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', background: '#1a73e8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '22px', fontWeight: '800', color: '#fff' }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 10px' }}>{item.title}</h3>
                <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities SEO grid */}
      <section style={{ padding: '80px 24px', background: '#f8faff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '800', textAlign: 'center', margin: '0 0 12px', color: '#1a1a1a' }}>
            Poseurs d'époxy disponibles dans toute la province
          </h2>
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '16px', margin: '0 0 48px' }}>
            Soumission gratuite pour plancher époxy dans toutes les villes du Québec
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
            {cities.map(city => (
              <a key={city.slug} href="#form" onClick={() => setSelectedCity(city.name)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 18px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', textDecoration: 'none', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#1a73e8'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(26,115,232,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <MapPin size={16} color="#1a73e8" />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#1a1a1a' }}>Époxy {city.name}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>{city.region}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      {/* Bottom CTA */}
      <section style={{ padding: '80px 24px', background: '#1a73e8', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: '800', color: '#fff', margin: '0 0 16px' }}>
          Prêt à obtenir votre soumission?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', margin: '0 0 36px' }}>
          Gratuit · Sans engagement · Réponse sous 2 heures
        </p>
        <a href="#form" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#1a73e8', textDecoration: 'none', padding: '16px 36px', borderRadius: '10px', fontSize: '17px', fontWeight: '700' }}>
          <Phone size={18} />
          Obtenir ma soumission gratuite
        </a>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', padding: '40px 24px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px', margin: 0 }}>
          © {new Date().getFullYear()} SoumissionEpoxy.ca — Mise en relation entre clients et poseurs d'époxy certifiés au Québec
        </p>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px', margin: '8px 0 0' }}>
          SoumissionEpoxy.ca n'est pas une entreprise d'installation. Nous mettons en contact des clients avec des entrepreneurs indépendants.
        </p>
      </footer>
    </div>
  )
}
