import './index.css'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, CheckCircle, MapPin, ChevronDown, Shield, Clock, Award, ArrowRight } from 'lucide-react'

// Animated stat counter
function StatCounter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}
import LeadForm from './components/LeadForm'
import { cities } from './data/cities'

const faqs = [
  { q: 'Combien coûte un plancher époxy?', a: 'Le prix varie entre 3$ et 10$ le pied carré selon le type de système et l\'état du béton existant. Obtenez une soumission gratuite pour un prix exact adapté à votre projet.' },
  { q: 'Combien de temps dure l\'installation?', a: 'La plupart des garages résidentiels sont complétés en une journée. Les sous-sols et espaces commerciaux nécessitent généralement 2 à 3 jours selon la superficie.' },
  { q: 'Le plancher époxy est-il glissant?', a: 'Non. Un additif antidérapant est systématiquement intégré à la couche de finition. La surface reste sécuritaire même lorsqu\'elle est mouillée.' },
  { q: 'Quelle est la durée de vie d\'un plancher époxy?', a: 'Avec une application professionnelle et un entretien minimal, un plancher époxy peut durer de 15 à 20 ans. La longévité dépend principalement de la qualité de la préparation du béton.' },
  { q: 'Comment fonctionne votre service de mise en relation?', a: 'Vous remplissez le formulaire, nous acheminons votre demande aux poseurs qualifiés de votre région, et ceux-ci vous contactent directement pour établir une soumission sans frais et sans engagement.' },
]

function TrustBar() {
  const items = [
    { icon: Shield, label: 'Poseurs vérifiés', sub: 'Entrepreneurs qualifiés' },
    { icon: Award, label: 'Service gratuit', sub: 'Aucun frais cachés' },
    { icon: Clock, label: 'Sans engagement', sub: 'Vous choisissez librement' },
  ]
  return (
    <div style={{ background: '#0F172A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'center', gap: '0' }}>
        {items.map((item, i) => {
          const Icon = item.icon
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '14px 40px',
              borderRight: i < items.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              <Icon size={16} color="#0369A1" />
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#F8FAFC', lineHeight: 1.2 }}>{item.label}</div>
                <div style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.2 }}>{item.sub}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Navbar() {
  return (
    <nav style={{
      background: '#0F172A',
      position: 'sticky', top: 0, zIndex: 40,
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
          <span style={{ fontSize: '19px', fontWeight: '800', color: '#0369A1', letterSpacing: '-0.5px' }}>Soumission</span>
          <span style={{ fontSize: '19px', fontWeight: '800', color: '#F8FAFC', letterSpacing: '-0.5px' }}>Époxy</span>
          <span style={{ fontSize: '11px', fontWeight: '600', color: '#0369A1', marginLeft: '6px', border: '1px solid rgba(3,105,161,0.3)', padding: '2px 7px', borderRadius: '4px', letterSpacing: '0.3px' }}>Québec</span>
        </div>
        <a
          href="tel:5141234567"
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#0369A1', color: '#fff',
            textDecoration: 'none', padding: '11px 22px',
            borderRadius: '8px', fontSize: '14px', fontWeight: '600',
            transition: 'background 0.2s', minHeight: '44px',
            cursor: 'pointer',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#0284C7'}
          onMouseLeave={e => e.currentTarget.style.background = '#0369A1'}
        >
          <Phone size={15} />
          Appel gratuit
        </a>
      </div>
    </nav>
  )
}

function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section style={{ padding: '96px 24px', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ fontSize: '12px', fontWeight: '700', color: '#0369A1', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 12px' }}>FAQ</p>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: '800', color: '#0F172A', margin: 0, letterSpacing: '-0.5px' }}>
            Questions fréquentes
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqs.map((f, i) => (
            <div key={i} style={{
              background: '#fff',
              border: '1px solid',
              borderColor: open === i ? '#0369A1' : '#E2E8F0',
              borderRadius: '12px', overflow: 'hidden',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxShadow: open === i ? '0 0 0 3px rgba(3,105,161,0.1)' : 'none',
            }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', padding: '20px 24px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left', display: 'flex',
                  justifyContent: 'space-between', alignItems: 'center', gap: '16px',
                  minHeight: '44px',
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: '600', color: open === i ? '#0369A1' : '#0F172A', lineHeight: '1.5' }}>
                  {f.q}
                </span>
                <ChevronDown
                  size={18} color="#64748B"
                  style={{ flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                />
              </button>
              {open === i && (
                <div style={{ padding: '0 24px 20px', color: '#475569', fontSize: '15px', lineHeight: '1.75' }}>
                  {f.a}
                </div>
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
      <Navbar />
      <TrustBar />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(160deg, #0F172A 0%, #1E293B 100%)', padding: '80px 24px 96px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 440px', gap: '72px', alignItems: 'center' }}>

          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p style={{ fontSize: '12px', fontWeight: '700', color: '#0369A1', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 20px' }}>
              Service de mise en relation — Province de Québec
            </p>
            <h1 style={{
              fontSize: 'clamp(34px, 4vw, 54px)', fontWeight: '800',
              color: '#F8FAFC', margin: '0 0 20px',
              lineHeight: '1.1', letterSpacing: '-1.5px',
            }}>
              Trouvez un poseur d'époxy qualifié au Québec
            </h1>
            <p style={{ fontSize: '18px', color: '#94A3B8', lineHeight: '1.75', margin: '0 0 40px', maxWidth: '480px' }}>
              Soumission gratuite, sans engagement. Nous mettons en contact votre projet avec des entrepreneurs certifiés dans votre région.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
              {[
                'Réseau d\'entrepreneurs qualifiés au Québec',
                'Service entièrement gratuit pour les clients',
                'Aucun engagement — vous choisissez librement',
              ].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle size={17} color="#22C55E" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '15px', color: '#CBD5E1', fontWeight: '500' }}>{t}</span>
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontSize: '12px', fontWeight: '600', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px' }}>
                Régions desservies
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cities.slice(0, 6).map(c => (
                  <a
                    key={c.slug}
                    href="#form"
                    onClick={() => setSelectedCity(c.name)}
                    style={{
                      padding: '7px 14px', background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px',
                      fontSize: '13px', fontWeight: '500', color: '#94A3B8',
                      textDecoration: 'none', transition: 'all 0.15s',
                      display: 'flex', alignItems: 'center', gap: '5px',
                      cursor: 'pointer', minHeight: '36px',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#0369A1'; e.currentTarget.style.color = '#7DD3FC' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#94A3B8' }}
                  >
                    <MapPin size={11} />
                    {c.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form card */}
          <motion.div
            id="form"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              background: '#fff', borderRadius: '16px',
              padding: '40px', boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ marginBottom: '28px' }}>
              <div style={{
                display: 'inline-block', background: '#E0F2FE', color: '#0369A1',
                fontSize: '11px', fontWeight: '700', padding: '4px 10px',
                borderRadius: '4px', marginBottom: '14px',
                textTransform: 'uppercase', letterSpacing: '0.8px',
              }}>
                100% Gratuit
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: '0 0 6px', letterSpacing: '-0.3px' }}>
                Obtenir une soumission
              </h2>
              <p style={{ color: '#64748B', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>
                Remplissez le formulaire — un entrepreneur vous contactera.
              </p>
            </div>
            <LeadForm city={selectedCity} />
          </motion.div>
        </div>
      </section>

      {/* Social proof stats */}
      <section style={{ padding: '64px 24px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', textAlign: 'center' }}>
          {[
            { target: 200, suffix: '+', label: 'Soumissions envoyées', sub: 'depuis le lancement' },
            { target: 8, suffix: '', label: 'Villes desservies', sub: 'à travers le Québec' },
            { target: 100, suffix: '%', label: 'Gratuit', sub: 'sans frais pour le client' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: '800', color: '#0F172A', letterSpacing: '-1.5px', lineHeight: 1 }}>
                <StatCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#0F172A', margin: '8px 0 4px' }}>{stat.label}</div>
              <div style={{ fontSize: '13px', color: '#94A3B8' }}>{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '96px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '12px', fontWeight: '700', color: '#0369A1', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 12px' }}>Processus</p>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: '800', color: '#0F172A', margin: 0, letterSpacing: '-0.5px' }}>
              Simple et sans frais
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {[
              { num: '01', title: 'Décrivez votre projet', desc: 'Indiquez le type de surface et votre localisation. La démarche prend moins d\'une minute.' },
              { num: '02', title: 'Mise en relation', desc: 'Votre demande est acheminée aux poseurs qualifiés disponibles dans votre région.' },
              { num: '03', title: 'Recevez votre soumission', desc: 'L\'entrepreneur vous contacte directement pour établir une soumission détaillée et sans engagement.' },
            ].map((item, i) => (
              <div key={i} style={{ position: 'relative' }}>
                {i < 2 && (
                  <div style={{ position: 'absolute', top: '22px', left: 'calc(100% - 20px)', width: '40px', height: '1px', background: 'linear-gradient(90deg, #E2E8F0, transparent)' }} />
                )}
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#0369A1', letterSpacing: '1px', marginBottom: '16px', fontVariantNumeric: 'tabular-nums' }}>
                  {item.num}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0F172A', margin: '0 0 10px' }}>{item.title}</h3>
                <p style={{ color: '#64748B', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities grid — SEO */}
      <section style={{ padding: '96px 24px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '12px', fontWeight: '700', color: '#0369A1', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 12px' }}>Couverture</p>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: '800', color: '#0F172A', margin: '0 0 14px', letterSpacing: '-0.5px' }}>
              Poseurs disponibles dans toute la province
            </h2>
            <p style={{ color: '#64748B', fontSize: '16px', margin: 0 }}>
              Soumission gratuite pour plancher époxy dans toutes les villes du Québec
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '12px' }}>
            {cities.map(city => (
              <a
                key={city.slug}
                href="#form"
                onClick={() => setSelectedCity(city.name)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '16px 20px', background: '#fff',
                  border: '1px solid #E2E8F0', borderRadius: '10px',
                  textDecoration: 'none', transition: 'all 0.15s',
                  cursor: 'pointer', minHeight: '56px',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#0369A1'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(3,105,161,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <MapPin size={15} color="#0369A1" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>Époxy {city.name}</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>{city.region}</div>
                </div>
                <ArrowRight size={14} color="#CBD5E1" style={{ marginLeft: 'auto', flexShrink: 0 }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      {/* Bottom CTA */}
      <section style={{ padding: '96px 24px', background: '#0F172A', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ fontSize: '12px', fontWeight: '700', color: '#0369A1', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 20px' }}>
            Commencez maintenant
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: '800', color: '#F8FAFC', margin: '0 0 18px', letterSpacing: '-0.8px', lineHeight: '1.15' }}>
            Prêt à obtenir votre soumission?
          </h2>
          <p style={{ color: '#64748B', fontSize: '17px', margin: '0 0 40px', lineHeight: '1.7' }}>
            Service gratuit et sans engagement pour toute la province de Québec.
          </p>
          <a
            href="#form"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: '#0369A1', color: '#fff', textDecoration: 'none',
              padding: '16px 36px', borderRadius: '10px', fontSize: '16px', fontWeight: '700',
              transition: 'background 0.2s', minHeight: '52px', cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#0284C7'}
            onMouseLeave={e => e.currentTarget.style.background = '#0369A1'}
          >
            <Phone size={17} />
            Obtenir ma soumission gratuite
          </a>
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginTop: '36px' }}>
            {['Gratuit', 'Sans engagement', 'Entrepreneurs vérifiés'].map(b => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <CheckCircle size={13} color="#22C55E" />
                <span style={{ color: '#475569', fontSize: '13px', fontWeight: '500' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#020617', padding: '36px 24px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
            <span style={{ fontSize: '15px', fontWeight: '800', color: '#0369A1' }}>Soumission</span>
            <span style={{ fontSize: '15px', fontWeight: '800', color: '#475569' }}>Époxy</span>
          </div>
          <p style={{ color: '#334155', fontSize: '13px', margin: 0, textAlign: 'center', flex: 1 }}>
            Service de mise en relation entre clients et entrepreneurs indépendants — Province de Québec
          </p>
          <p style={{ color: '#334155', fontSize: '13px', margin: 0 }}>
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}
