import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, CheckCircle, Phone, ArrowLeft, ArrowRight, Shield, Award, Clock } from 'lucide-react'
import LeadForm from '../components/LeadForm'
import { cities } from '../data/cities'

const C = {
  bg0: '#060C14', bg1: '#0B1422', bg2: '#101D2E',
  white: '#FFFFFF', steel: '#8BA3B8', silver: '#C8D6E0',
  blue: '#0369A1', blueLt: '#38BDF8',
  text: '#0F172A', muted: '#64748B', dim: '#475569',
  border: '#1E2E42', borderL: '#E2E8F0', bg3: '#F4F6F8',
}
const chromeCTA = `linear-gradient(135deg, #8E9EAE 0%, #C8D6E0 22%, #F0F4F8 40%, #FFFFFF 50%, #E0E8F0 60%, #B0C0CE 78%, #7A8C9A 100%)`
const chromeShadow = `0 6px 28px rgba(140,165,185,0.5), 0 2px 0 rgba(255,255,255,0.6) inset, 0 -1px 0 rgba(0,0,0,0.15) inset`
const metalGrad = `linear-gradient(160deg, #0B1422 0%, #0D1826 50%, #091420 100%)`
const accentLine = `linear-gradient(90deg, transparent, rgba(56,189,248,0.35), transparent)`

const faqTemplate = (city) => [
  {
    q: `Combien coûte un revêtement époxy à ${city.name}?`,
    a: `À ${city.name}, le coût d'un plancher époxy varie généralement entre 3 $ et 10 $ le pied carré selon le type de système (flocons, métallique, uni) et l'état du béton. Un garage résidentiel standard de 400 pi² revient en moyenne entre 1 200 $ et 3 500 $, installation complète incluse. Obtenez une soumission gratuite pour un prix exact.`,
  },
  {
    q: `Combien de temps dure l'installation à ${city.name}?`,
    a: `La plupart des garages résidentiels dans la région de ${city.name} sont complétés en une journée. Les sous-sols et espaces commerciaux nécessitent 2 à 3 jours. Le temps de séchage avant utilisation est généralement de 24 à 48 heures.`,
  },
  {
    q: `Les poseurs époxy de ${city.name} sont-ils certifiés RBQ?`,
    a: `Tous les entrepreneurs de notre réseau dans la région de ${city.name} détiennent une licence valide de la Régie du bâtiment du Québec (RBQ) et sont assurés en responsabilité civile. Votre projet est entre les mains de professionnels vérifiés.`,
  },
  {
    q: `Quels types de surfaces peut-on traiter à ${city.name}?`,
    a: `Nos poseurs à ${city.name} traitent tout type de surface en béton : garages résidentiels, sous-sols, locaux commerciaux, ateliers mécaniques, entrepôts industriels. La surface doit être en béton — le bois et les carreaux nécessitent une évaluation préalable.`,
  },
]

export default function CityPage() {
  const { citySlug } = useParams()
  const city = cities.find(c => c.slug === citySlug)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    if (!city) return
    document.title = `Poseur Époxy ${city.name} — Soumission gratuite | PoseurEpoxy.ca`
    // Update meta description
    let meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', `Trouvez un poseur époxy qualifié à ${city.name}. Garage, sous-sol, commercial — soumission 100% gratuite et sans engagement. Entrepreneurs certifiés RBQ dans la région ${city.region}.`)
    return () => {
      document.title = 'PoseurEpoxy.ca — Soumission gratuite pour époxy au Québec'
      if (meta) meta.setAttribute('content', `Obtenez une soumission gratuite pour vos travaux d'époxy au Québec. Garage, sous-sol, commercial, industriel. Mise en relation avec des poseurs certifiés RBQ — sans engagement.`)
    }
  }, [city])

  if (!city) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg0 }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: C.silver, fontSize: '24px', marginBottom: '16px' }}>Ville non trouvée</h1>
          <Link to="/" style={{ color: C.blueLt, fontSize: '15px' }}>Retour à l'accueil</Link>
        </div>
      </div>
    )
  }

  const faqs = faqTemplate(city)

  return (
    <div style={{ minHeight: '100vh', background: C.white }}>
      {/* Navbar */}
      <nav style={{ background: C.bg0, position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${C.blue}80, ${C.blueLt}90, ${C.blue}80, transparent)` }} />
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '66px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'baseline', gap: '3px', textDecoration: 'none' }}>
            <span style={{ fontSize: '20px', fontWeight: '800', color: C.blueLt }}>Poseur</span>
            <span style={{ fontSize: '20px', fontWeight: '800', color: C.silver }}>Époxy</span>
            <span style={{ fontSize: '10px', fontWeight: '700', color: C.steel, marginLeft: '8px', border: `1px solid ${C.border}`, padding: '2px 8px', borderRadius: '4px', letterSpacing: '1px', textTransform: 'uppercase', background: 'rgba(255,255,255,0.03)' }}>.ca</span>
          </Link>
          <a href="tel:5141234567" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: chromeCTA, color: '#0F1923', textDecoration: 'none',
            padding: '11px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: '800',
            minHeight: '44px', cursor: 'pointer', boxShadow: chromeShadow, transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <Phone size={15} /> Appel gratuit
          </a>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div style={{ background: C.bg1, borderBottom: `1px solid ${C.border}`, padding: '12px 28px' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link to="/" style={{ color: C.steel, fontSize: '13px', textDecoration: 'none' }}>Accueil</Link>
          <span style={{ color: C.border, fontSize: '13px' }}>/</span>
          <span style={{ color: C.blueLt, fontSize: '13px', fontWeight: '600' }}>Poseur époxy {city.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: metalGrad, padding: '72px 28px 88px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(3,105,161,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: accentLine }} />
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 440px', gap: '72px', alignItems: 'center', position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <MapPin size={14} color={C.blueLt} />
              <span style={{ fontSize: '12px', fontWeight: '700', color: C.steel, letterSpacing: '1px', textTransform: 'uppercase' }}>
                {city.region} — Province de Québec
              </span>
            </div>

            {/* H1 optimisé SEO */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: '800', color: C.white, margin: '0 0 6px', lineHeight: '1.1', letterSpacing: '-1.5px' }}>
              Poseur d'époxy à
            </h1>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: '800', margin: '0 0 20px', lineHeight: '1.1', letterSpacing: '-1.5px', background: `linear-gradient(90deg, ${C.blueLt}, ${C.silver})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {city.name}
            </h1>
            <div style={{ width: '72px', height: '3px', marginBottom: '24px', borderRadius: '2px', background: `linear-gradient(90deg, ${C.blue}, ${C.blueLt})` }} />

            <p style={{ fontSize: '17px', color: C.steel, lineHeight: '1.8', margin: '0 0 32px', maxWidth: '480px' }}>
              {city.intro}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', marginBottom: '36px' }}>
              {[
                `Soumission 100% gratuite à ${city.name}`,
                'Poseurs certifiés RBQ et assurés',
                'Aucun engagement — vous choisissez',
              ].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={15} color="#22C55E" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', color: C.silver, fontWeight: '500' }}>{t}</span>
                </div>
              ))}
            </div>

            {/* Services */}
            <div>
              <p style={{ fontSize: '11px', fontWeight: '700', color: C.dim, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Services disponibles</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {city.services.map(s => (
                  <span key={s} style={{ padding: '6px 14px', background: 'rgba(3,105,161,0.12)', border: `1px solid rgba(3,105,161,0.25)`, borderRadius: '6px', fontSize: '13px', color: C.blueLt, fontWeight: '500' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div id="form" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            style={{ background: C.white, borderRadius: '18px', padding: '40px', boxShadow: '0 32px 80px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'inline-block', background: '#E0F2FE', color: C.blue, fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '4px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                100% Gratuit
              </div>
              <h2 style={{ fontSize: '21px', fontWeight: '800', color: C.text, margin: '0 0 6px' }}>
                Soumission époxy — {city.name}
              </h2>
              <p style={{ color: C.muted, fontSize: '14px', margin: 0, lineHeight: '1.5' }}>
                Un poseur qualifié de {city.region} vous contactera.
              </p>
            </div>
            <LeadForm city={city.name} />
          </motion.div>
        </div>
      </section>

      {/* Trust bar */}
      <div style={{ background: C.bg1, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 28px', display: 'flex', justifyContent: 'center' }}>
          {[
            { icon: Shield, label: 'Licence RBQ', sub: 'Obligatoire pour tous nos poseurs' },
            { icon: Award, label: 'Assurés', sub: 'Responsabilité civile incluse' },
            { icon: Clock, label: 'Sans engagement', sub: 'Vous êtes libres de choisir' },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '13px 44px', borderRight: i < 2 ? `1px solid ${C.border}` : 'none' }}>
                <Icon size={15} color={C.blueLt} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: C.silver, lineHeight: 1.2 }}>{item.label}</div>
                  <div style={{ fontSize: '11px', color: C.steel, lineHeight: 1.2 }}>{item.sub}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Unique city content */}
      <section style={{ padding: '80px 28px', background: C.white }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: '800', color: C.text, margin: '0 0 20px', letterSpacing: '-0.5px' }}>
            Revêtement époxy à {city.name} — Ce que vous devez savoir
          </h2>
          <p style={{ fontSize: '16px', color: C.muted, lineHeight: '1.85', margin: '0 0 24px' }}>
            {city.intro}
          </p>
          <p style={{ fontSize: '16px', color: C.muted, lineHeight: '1.85', margin: '0 0 40px' }}>
            PoseurEpoxy.ca met en relation les résidents et entreprises de {city.name} avec des entrepreneurs époxy certifiés RBQ, disponibles dans la région {city.region}. Notre service est 100% gratuit pour vous — les poseurs nous paient pour accéder aux demandes de soumission, pas vous.
          </p>

          {/* Nearby cities */}
          {city.nearby && city.nearby.length > 0 && (
            <div style={{ padding: '24px', background: C.bg3, borderRadius: '12px', border: `1px solid ${C.borderL}` }}>
              <p style={{ fontSize: '13px', fontWeight: '700', color: C.dim, textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 12px' }}>
                Villes voisines desservies
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {city.nearby.map(n => {
                  const nearbyCity = cities.find(c => c.name === n)
                  return nearbyCity ? (
                    <Link key={n} to={`/poseur-epoxy-${nearbyCity.slug}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', background: C.white, border: `1px solid ${C.borderL}`, borderRadius: '6px', fontSize: '13px', fontWeight: '600', color: C.blue, textDecoration: 'none', transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.background = '#E0F2FE' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.borderL; e.currentTarget.style.background = C.white }}
                    >
                      <MapPin size={11} /> {n}
                    </Link>
                  ) : (
                    <span key={n} style={{ padding: '7px 14px', background: C.white, border: `1px solid ${C.borderL}`, borderRadius: '6px', fontSize: '13px', color: C.muted }}>
                      {n}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 28px', background: C.bg3 }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: '800', color: C.text, margin: '0 0 40px', letterSpacing: '-0.5px' }}>
            Questions fréquentes — Époxy à {city.name}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ background: C.white, borderRadius: '12px', overflow: 'hidden', border: '1px solid', borderColor: openFaq === i ? C.blue : C.borderL, transition: 'border-color 0.2s', boxShadow: openFaq === i ? '0 0 0 3px rgba(3,105,161,0.1)' : 'none' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '18px 22px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: openFaq === i ? C.blue : C.text, lineHeight: '1.5' }}>{f.q}</span>
                  <span style={{ color: C.muted, fontSize: '20px', lineHeight: 1, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>+</span>
                </button>
                {openFaq === i && <div style={{ padding: '0 22px 18px', color: C.dim, fontSize: '15px', lineHeight: '1.75' }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '80px 28px', background: metalGrad, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: accentLine }} />
        <div style={{ maxWidth: '560px', margin: '0 auto', position: 'relative' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: '800', color: C.white, margin: '0 0 16px', letterSpacing: '-0.8px' }}>
            Obtenez votre soumission gratuite à {city.name}
          </h2>
          <p style={{ color: C.steel, fontSize: '16px', margin: '0 0 32px', lineHeight: '1.7' }}>
            Sans engagement. Un poseur de {city.region} vous contacte directement.
          </p>
          <a href="#form" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: chromeCTA, color: '#0F1923',
            textDecoration: 'none', padding: '16px 36px', borderRadius: '10px',
            fontSize: '16px', fontWeight: '800', cursor: 'pointer',
            boxShadow: chromeShadow, transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <Phone size={17} /> Demander une soumission gratuite
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: C.bg0, padding: '28px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'baseline', gap: '3px', textDecoration: 'none' }}>
            <span style={{ fontSize: '15px', fontWeight: '800', color: C.blueLt }}>Poseur</span>
            <span style={{ fontSize: '15px', fontWeight: '800', color: C.steel }}>Époxy</span>
          </Link>
          <p style={{ color: '#1E2E42', fontSize: '13px', margin: 0 }}>
            Service de mise en relation — Province de Québec © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}
