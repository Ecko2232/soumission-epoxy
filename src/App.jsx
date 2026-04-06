import './index.css'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Phone, CheckCircle, MapPin, ChevronDown, Shield, Clock,
  Award, ArrowRight, BookOpen, Tag, GraduationCap, Globe, Users, Star,
} from 'lucide-react'
import LeadForm from './components/LeadForm'
import { cities, regionGroups } from './data/cities'

// ── Design tokens ──────────────────────────────────────────────────────────────
const C = {
  bg0:    '#060C14',   // deepest bg
  bg1:    '#0B1422',   // dark navy
  bg2:    '#101D2E',   // card bg dark
  bg3:    '#F4F6F8',   // light section bg
  white:  '#FFFFFF',
  steel:  '#8BA3B8',   // metallic mid
  silver: '#C8D6E0',   // metallic light
  blue:   '#0369A1',   // brand CTA
  blueLt: '#38BDF8',   // highlight on dark
  text:   '#0F172A',
  muted:  '#64748B',
  dim:    '#475569',
  border: '#1E2E42',   // dark border
  borderL:'#E2E8F0',   // light border
}

const metalGrad = `linear-gradient(160deg, ${C.bg1} 0%, #0D1826 50%, #091420 100%)`
const accentLine = `linear-gradient(90deg, transparent, ${C.blueLt}55, transparent)`

// Chrome/gold CTA gradient — catches the eye against dark backgrounds
const chromeCTA = `linear-gradient(135deg, #8E9EAE 0%, #C8D6E0 22%, #F0F4F8 40%, #FFFFFF 50%, #E0E8F0 60%, #B0C0CE 78%, #7A8C9A 100%)`
const chromeShadow = `0 6px 28px rgba(140,165,185,0.5), 0 2px 0 rgba(255,255,255,0.6) inset, 0 -1px 0 rgba(0,0,0,0.15) inset`

// ── Utilities ──────────────────────────────────────────────────────────────────
function StatCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let n = 0
    const step = target / (1800 / 16)
    const t = setInterval(() => {
      n += step
      if (n >= target) { setCount(target); clearInterval(t) }
      else setCount(Math.floor(n))
    }, 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// ── Data ───────────────────────────────────────────────────────────────────────
const faqs = [
  { q: 'Combien coûte un plancher époxy?', a: 'Le prix varie entre 3 $ et 10 $ le pied carré selon le type de système et l\'état du béton existant. Obtenez une soumission gratuite pour un prix exact adapté à votre projet.' },
  { q: 'Combien de temps dure l\'installation?', a: 'La plupart des garages résidentiels sont complétés en une journée. Les sous-sols et espaces commerciaux nécessitent généralement 2 à 3 jours selon la superficie.' },
  { q: 'Le plancher époxy est-il glissant?', a: 'Non. Un additif antidérapant est systématiquement intégré à la couche de finition. La surface reste sécuritaire même lorsqu\'elle est mouillée.' },
  { q: 'Quelle est la durée de vie d\'un plancher époxy?', a: 'Avec une application professionnelle et un entretien minimal, un plancher époxy peut durer de 15 à 20 ans. La longévité dépend principalement de la qualité de la préparation du béton.' },
  { q: 'Comment fonctionne votre service de mise en relation?', a: 'Vous remplissez le formulaire, nous acheminons votre demande aux poseurs qualifiés de votre région, et ceux-ci vous contactent directement pour établir une soumission sans frais et sans engagement.' },
  { q: 'Quelle superficie minimale est requise?', a: 'Il n\'y a pas de superficie minimale. Que ce soit un petit atelier de 200 pi² ou un entrepôt de 10 000 pi², les installateurs de notre réseau s\'adaptent à tous les projets.' },
]

const articles = [
  { category: 'Conseils',     title: '5 erreurs à éviter avec votre plancher d\'époxy',           excerpt: 'Évitez ces erreurs courantes qui peuvent ruiner votre plancher époxy et vous coûter cher en réparations.' },
  { category: 'Comparatifs',  title: 'Époxy versus polyurée : quelle est la différence?',          excerpt: 'Comparez les deux systèmes de revêtement les plus populaires pour faire un choix éclairé selon vos besoins.' },
  { category: 'Entretien',    title: 'Guide d\'entretien de votre plancher d\'époxy',              excerpt: 'Apprenez comment entretenir correctement votre plancher époxy pour qu\'il conserve son éclat pendant des années.' },
  { category: 'Prix et coûts',title: 'Combien coûte un plancher d\'époxy au Québec en 2026?',     excerpt: 'Découvrez les prix moyens selon le type de système, la superficie et la région.' },
]

const categoryColor = { Conseils: C.blue, Comparatifs: '#7C3AED', Entretien: '#059669', 'Prix et coûts': '#B45309' }

const floorTypes = [
  {
    name: 'Époxy métallique',
    desc: 'Effet nacré avec des reflets changeants selon l\'angle de la lumière. Rendu luxueux, idéal pour les garages et espaces de prestige.',
    bg: 'linear-gradient(135deg, #8FA8BE 0%, #5D7A96 25%, #A8C0D0 50%, #6E8EA8 75%, #B8CCDa 100%)',
    shimmer: 'radial-gradient(ellipse at 35% 35%, rgba(255,255,255,0.55) 0%, transparent 55%), radial-gradient(ellipse at 75% 70%, rgba(255,255,255,0.25) 0%, transparent 45%)',
    tags: ['Garage', 'Showroom', 'Prestige'],
  },
  {
    name: 'Époxy uni',
    desc: 'Couleur solide et surface parfaitement lisse. Classique, durable, disponible dans une large gamme de teintes personnalisées.',
    bg: 'linear-gradient(160deg, #1E3A5F 0%, #2A527E 50%, #183050 100%)',
    shimmer: 'radial-gradient(ellipse at 65% 25%, rgba(255,255,255,0.18) 0%, transparent 50%)',
    tags: ['Commercial', 'Industriel', 'Résidentiel'],
  },
  {
    name: 'Époxy flocons',
    desc: 'Flocons colorés dispersés dans la résine. Cache efficacement les imperfections et offre une traction naturelle antidérapante.',
    bg: 'linear-gradient(135deg, #C8BFB2 0%, #B8AFA2 50%, #C2B9AC 100%)',
    shimmer: null,
    speckles: true,
    tags: ['Garage', 'Atelier', 'Sous-sol'],
  },
]

// ── Components ─────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav style={{ background: C.bg0, position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${C.border}` }}>
      {/* thin metallic accent line at very top */}
      <div style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${C.blue}80, ${C.blueLt}90, ${C.blue}80, transparent)` }} />
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '66px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
          <span style={{ fontSize: '20px', fontWeight: '800', color: C.blueLt, letterSpacing: '-0.5px' }}>Plancher</span>
          <span style={{ fontSize: '20px', fontWeight: '800', color: C.silver, letterSpacing: '-0.5px' }}>Époxy</span>
          <span style={{
            fontSize: '10px', fontWeight: '700', color: C.steel, marginLeft: '8px',
            border: `1px solid ${C.border}`, padding: '2px 8px', borderRadius: '4px',
            letterSpacing: '1px', textTransform: 'uppercase',
            background: 'rgba(255,255,255,0.03)',
          }}>.ca</span>
        </div>
        <a
          href="tel:5141234567"
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: chromeCTA,
            color: '#0F1923', textDecoration: 'none', padding: '11px 24px',
            borderRadius: '8px', fontSize: '14px', fontWeight: '800',
            minHeight: '44px', cursor: 'pointer', letterSpacing: '0.3px',
            boxShadow: chromeShadow,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <Phone size={15} /> Appel gratuit
        </a>
      </div>
    </nav>
  )
}

function TrustBar() {
  const items = [
    { icon: Shield, label: 'Poseurs vérifiés', sub: 'Entrepreneurs qualifiés RBQ' },
    { icon: Award,  label: 'Service gratuit',  sub: 'Aucun frais cachés' },
    { icon: Clock,  label: 'Sans engagement',  sub: 'Vous choisissez librement' },
  ]
  return (
    <div style={{ background: C.bg1, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 28px', display: 'flex', justifyContent: 'center' }}>
        {items.map((item, i) => {
          const Icon = item.icon
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '13px 44px',
              borderRight: i < items.length - 1 ? `1px solid ${C.border}` : 'none',
            }}>
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
  )
}

function Hero({ onSelectCity }) {
  return (
    <section style={{ padding: '84px 28px 100px', position: 'relative', overflow: 'hidden', background: C.bg0 }}>
      {/* Background video */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <iframe
          src="https://www.youtube.com/embed/V_P5U6-p0a8?autoplay=1&mute=1&loop=1&playlist=V_P5U6-p0a8&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=0"
          allow="autoplay"
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '177.78vh', minWidth: '100%',
            height: '56.25vw', minHeight: '100%',
            border: 'none', pointerEvents: 'none',
          }}
          title="Époxy installation background"
        />
        {/* Dark overlay to keep text readable + metallic tint */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(6,12,20,0.88) 0%, rgba(11,20,34,0.80) 50%, rgba(6,12,20,0.90) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(3,105,161,0.10) 0%, transparent 60%)' }} />
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: accentLine, zIndex: 1 }} />

      <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 460px', gap: '72px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        {/* Left */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', padding: '6px 14px', borderRadius: '6px', border: `1px solid ${C.border}`, background: 'rgba(56,189,248,0.06)' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.blueLt, boxShadow: `0 0 8px ${C.blueLt}` }} />
            <span style={{ fontSize: '12px', fontWeight: '600', color: C.steel, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Service de mise en relation — Province de Québec
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 4.2vw, 58px)', fontWeight: '800', color: C.white, margin: '0 0 6px', lineHeight: '1.08', letterSpacing: '-2px' }}>
            Trouvez un poseur
          </h1>
          <h1 style={{ fontSize: 'clamp(36px, 4.2vw, 58px)', fontWeight: '800', margin: '0 0 24px', lineHeight: '1.08', letterSpacing: '-2px', background: `linear-gradient(90deg, ${C.blueLt}, ${C.silver})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            d'époxy qualifié
          </h1>
          {/* metallic accent line under headline */}
          <div style={{ width: '80px', height: '3px', marginBottom: '28px', borderRadius: '2px', background: `linear-gradient(90deg, ${C.blue}, ${C.blueLt})` }} />

          <p style={{ fontSize: '18px', color: C.steel, lineHeight: '1.8', margin: '0 0 40px', maxWidth: '460px' }}>
            Soumission gratuite, sans engagement. Nous mettons en contact votre projet avec des entrepreneurs certifiés dans votre région.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', marginBottom: '48px' }}>
            {[
              'Réseau d\'entrepreneurs qualifiés au Québec',
              'Service entièrement gratuit pour les clients',
              'Aucun engagement — vous choisissez librement',
            ].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={16} color="#22C55E" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '15px', color: C.silver, fontWeight: '500' }}>{t}</span>
              </div>
            ))}
          </div>

          <div>
            <p style={{ fontSize: '11px', fontWeight: '700', color: C.dim, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Régions desservies</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {cities.slice(0, 6).map(c => (
                <a
                  key={c.slug} href="#form" onClick={() => onSelectCity(c.name)}
                  style={{
                    padding: '7px 14px', background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${C.border}`, borderRadius: '6px',
                    fontSize: '13px', fontWeight: '500', color: C.steel,
                    textDecoration: 'none', transition: 'all 0.15s',
                    display: 'flex', alignItems: 'center', gap: '5px',
                    cursor: 'pointer', minHeight: '36px',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.color = C.blueLt; e.currentTarget.style.background = 'rgba(3,105,161,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.steel; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                >
                  <MapPin size={11} /> {c.name}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Form card */}
        <motion.div
          id="form"
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.15 }}
          style={{
            background: C.white, borderRadius: '18px',
            padding: '40px', boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 2px 0 rgba(255,255,255,0.06) inset',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ marginBottom: '28px' }}>
            <div style={{
              display: 'inline-block', background: '#E0F2FE', color: C.blue,
              fontSize: '11px', fontWeight: '700', padding: '4px 10px',
              borderRadius: '4px', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.8px',
            }}>100% Gratuit</div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: C.text, margin: '0 0 6px', letterSpacing: '-0.3px' }}>
              Obtenir une soumission
            </h2>
            <p style={{ color: C.muted, fontSize: '14px', margin: 0, lineHeight: '1.5' }}>
              Remplissez le formulaire — un entrepreneur vous contactera.
            </p>
          </div>
          <LeadForm />
        </motion.div>
      </div>
    </section>
  )
}

function Stats() {
  const data = [
    { target: 200, suffix: '+', label: 'Soumissions envoyées', sub: 'depuis le lancement' },
    { target: 24,  suffix: '',  label: 'Villes desservies',    sub: 'à travers le Québec' },
    { target: 100, suffix: '%', label: 'Gratuit',              sub: 'sans frais pour le client' },
  ]
  return (
    <section style={{ background: C.bg1, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '60px 28px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(3,105,161,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', textAlign: 'center', position: 'relative' }}>
        {data.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
            <div style={{ fontSize: 'clamp(38px, 4vw, 54px)', fontWeight: '800', letterSpacing: '-2px', lineHeight: 1, background: `linear-gradient(135deg, ${C.white}, ${C.steel})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              <StatCounter target={s.target} suffix={s.suffix} />
            </div>
            <div style={{ fontSize: '15px', fontWeight: '600', color: C.silver, margin: '10px 0 4px' }}>{s.label}</div>
            <div style={{ fontSize: '12px', color: C.steel }}>{s.sub}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { num: '01', title: 'Décrivez votre projet', desc: 'Indiquez le type de surface et votre localisation. La démarche prend moins d\'une minute.' },
    { num: '02', title: 'Mise en relation',       desc: 'Votre demande est acheminée aux poseurs qualifiés disponibles dans votre région.' },
    { num: '03', title: 'Recevez votre soumission', desc: 'L\'entrepreneur vous contacte directement pour établir une soumission détaillée et sans engagement.' },
  ]
  return (
    <section style={{ padding: '96px 28px', background: C.white }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <Label dark={false}>Processus</Label>
          <h2 style={h2Light}>Simple et sans frais</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ position: 'relative' }}>
              {i < 2 && <div style={{ position: 'absolute', top: '18px', left: 'calc(100% - 16px)', width: '32px', height: '1px', background: 'linear-gradient(90deg, #CBD5E1, transparent)' }} />}
              <div style={{ fontSize: '12px', fontWeight: '800', color: C.blue, letterSpacing: '1.5px', marginBottom: '16px' }}>{s.num}</div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: C.text, margin: '0 0 10px' }}>{s.title}</h3>
              <p style={{ color: C.muted, fontSize: '15px', lineHeight: '1.7', margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FloorGallery() {
  return (
    <section style={{ padding: '96px 28px', background: metalGrad, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: accentLine }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: accentLine }} />
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <LabelDark>Types de revêtements</LabelDark>
          <h2 style={h2Dark}>Quel type de plancher vous convient?</h2>
          <p style={{ color: C.steel, fontSize: '16px', margin: 0, maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
            Nos poseurs maîtrisent tous les systèmes. Obtenez une soumission pour n'importe quel style.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {floorTypes.map((ft, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ borderRadius: '14px', overflow: 'hidden', border: `1px solid ${C.border}`, background: C.bg2 }}
            >
              {/* visual preview */}
              <div style={{ height: '180px', position: 'relative', background: ft.bg }}>
                {ft.shimmer && <div style={{ position: 'absolute', inset: 0, background: ft.shimmer }} />}
                {ft.speckles && (
                  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                    {Array.from({ length: 90 }).map((_, j) => (
                      <div key={j} style={{
                        position: 'absolute',
                        width: `${4 + (j * 3) % 8}px`, height: `${3 + (j * 5) % 9}px`,
                        borderRadius: '2px',
                        background: ['#8B7355','#6B8E5A','#4A6B8A','#C8A96E','#7A5C4A','#5A7A6B','#A0876A','#3D6B5A'][j % 8],
                        left: `${(j * 37 + j * j * 3) % 95}%`,
                        top: `${(j * 53 + j * 7) % 90}%`,
                        opacity: 0.75,
                        transform: `rotate(${j * 30}deg)`,
                      }} />
                    ))}
                  </div>
                )}
                {/* metallic sheen overlay for all */}
                <div className="metal-shimmer" style={{ position: 'absolute', inset: 0 }} />
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {ft.tags.map(tag => (
                    <span key={tag} style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', color: '#fff', fontSize: '11px', fontWeight: '600', padding: '3px 9px', borderRadius: '4px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: C.silver, margin: '0 0 8px' }}>{ft.name}</h3>
                <p style={{ fontSize: '14px', color: C.steel, lineHeight: '1.65', margin: '0 0 18px' }}>{ft.desc}</p>
                <a href="#form" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: C.blueLt, fontSize: '13px', fontWeight: '600', textDecoration: 'none', cursor: 'pointer' }}>
                  Obtenir une soumission <ArrowRight size={13} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function APropos() {
  const items = [
    { icon: GraduationCap, title: 'Formation en génie civil', desc: 'Formation académique en génie civil combinée à une expertise technique approfondie en formulation et application de résines époxy.' },
    { icon: Star,          title: 'Expertise terrain',         desc: 'Expérience pratique en installation et en formulation de résines — pas seulement la théorie, mais la réalité du chantier.' },
    { icon: Globe,         title: 'Formation internationale',  desc: 'Formateurs actifs au Canada, aux États-Unis, au Mexique et en Europe. Une perspective globale des meilleures pratiques.' },
    { icon: Users,         title: 'Réseau sélectionné',        desc: 'Installateurs recrutés et filtrés pour leur savoir-faire. Chaque poseur est évalué avant d\'être admis dans notre réseau.' },
  ]
  return (
    <section style={{ padding: '96px 28px', background: C.white }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Label dark={false}>À propos</Label>
          <h2 style={{ ...h2Light, textAlign: 'left', marginBottom: '20px' }}>
            Un réseau bâti sur l'expertise, pas sur les apparences
          </h2>
          <div style={{ width: '56px', height: '3px', marginBottom: '24px', borderRadius: '2px', background: `linear-gradient(90deg, ${C.blue}, ${C.blueLt})` }} />
          <p style={{ fontSize: '16px', color: C.muted, lineHeight: '1.8', margin: '0 0 16px' }}>
            PlancherEpoxy.ca n'est pas un simple annuaire. Derrière ce service se trouve une expertise concrète en génie civil et en application de résines — acquise sur le terrain, au Canada et à l'international.
          </p>
          <p style={{ fontSize: '16px', color: C.muted, lineHeight: '1.8', margin: 0 }}>
            Notre mission : connecter les propriétaires québécois avec des installateurs qui maîtrisent réellement leur métier. Chaque poseur est sélectionné pour son savoir-faire, pas seulement pour sa disponibilité.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {items.map((h, i) => {
            const Icon = h.icon
            return (
              <div key={i} style={{ display: 'flex', gap: '16px', padding: '20px 22px', background: C.bg3, borderRadius: '12px', border: `1px solid ${C.borderL}` }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} color={C.blue} />
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '700', color: C.text, margin: '0 0 4px' }}>{h.title}</h3>
                  <p style={{ fontSize: '13px', color: C.muted, lineHeight: '1.6', margin: 0 }}>{h.desc}</p>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function TrustSection() {
  const items = [
    { icon: Shield,       title: 'Licence RBQ',               desc: 'Tous nos installateurs détiennent une licence valide de la Régie du bâtiment du Québec.' },
    { icon: Award,        title: 'Assurance responsabilité',   desc: 'Assurance responsabilité civile pour chaque projet. Votre investissement est protégé.' },
    { icon: CheckCircle,  title: 'Produits professionnels',    desc: 'Résines et produits de qualité professionnelle uniquement — aucun matériel de détaillant.' },
    { icon: Clock,        title: 'Standards élevés',           desc: 'Méthodes conformes aux normes du domaine. Préparation du béton incluse dans chaque soumission.' },
  ]
  return (
    <section style={{ padding: '96px 28px', background: C.bg3, borderTop: `1px solid ${C.borderL}` }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Label dark={false}>Confiance</Label>
          <h2 style={h2Light}>Pourquoi nous faire confiance</h2>
          <p style={{ color: C.muted, fontSize: '16px', margin: 0, maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
            On travaille uniquement avec des installateurs qui partagent notre engagement envers la qualité.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{ display: 'flex', gap: '18px', padding: '28px', background: C.white, borderRadius: '12px', border: `1px solid ${C.borderL}` }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} color={C.blue} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '700', color: C.text, margin: '0 0 6px' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: C.muted, lineHeight: '1.65', margin: 0 }}>{item.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CitiesSection({ onSelectCity }) {
  const [activeRegion, setActiveRegion] = useState('all')
  const filtered = activeRegion === 'all' ? cities : cities.filter(c => c.regionGroup === activeRegion)

  return (
    <section style={{ padding: '96px 28px', background: C.white, borderTop: `1px solid ${C.borderL}` }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Label dark={false}>Couverture</Label>
          <h2 style={h2Light}>Poseurs disponibles dans toute la province</h2>
          <p style={{ color: C.muted, fontSize: '16px', margin: 0 }}>Soumission gratuite pour plancher époxy dans toutes les villes du Québec</p>
        </div>

        {/* Region tabs */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '36px', background: '#EFF6FF', padding: '8px', borderRadius: '12px' }}>
          {regionGroups.map(rg => (
            <button
              key={rg.id} onClick={() => setActiveRegion(rg.id)}
              style={{
                padding: '9px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                fontSize: '13px', fontWeight: '600', transition: 'all 0.15s', whiteSpace: 'nowrap',
                background: activeRegion === rg.id ? C.blue : 'transparent',
                color: activeRegion === rg.id ? '#fff' : C.muted,
              }}
              onMouseEnter={e => { if (activeRegion !== rg.id) e.currentTarget.style.color = C.blue }}
              onMouseLeave={e => { if (activeRegion !== rg.id) e.currentTarget.style.color = C.muted }}
            >{rg.label}</button>
          ))}
        </div>

        <motion.div key={activeRegion} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}
        >
          {filtered.map(city => (
            <a key={city.slug} href="#form" onClick={() => onSelectCity(city.name)}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', background: C.bg3, border: `1px solid ${C.borderL}`, borderRadius: '10px', textDecoration: 'none', transition: 'all 0.15s', cursor: 'pointer', minHeight: '56px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.boxShadow = '0 4px 16px rgba(3,105,161,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.borderL; e.currentTarget.style.boxShadow = 'none' }}
            >
              <MapPin size={14} color={C.blue} style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: C.text }}>Époxy {city.name}</div>
                <div style={{ fontSize: '12px', color: C.muted }}>{city.region}</div>
              </div>
              <ArrowRight size={13} color="#CBD5E1" style={{ marginLeft: 'auto', flexShrink: 0 }} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ArticlesSection() {
  return (
    <section style={{ padding: '96px 28px', background: metalGrad, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: accentLine }} />
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <LabelDark>Articles & Guides</LabelDark>
          <h2 style={h2Dark}>Tout ce que vous devez savoir sur les planchers époxy au Québec</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {articles.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{ padding: '28px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.background = 'rgba(3,105,161,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '14px' }}>
                <Tag size={11} color={categoryColor[a.category] || C.blue} />
                <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.6px', textTransform: 'uppercase', color: categoryColor[a.category] || C.blue }}>{a.category}</span>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: C.silver, margin: '0 0 10px', lineHeight: '1.4' }}>{a.title}</h3>
              <p style={{ fontSize: '14px', color: C.steel, lineHeight: '1.65', margin: '0 0 20px' }}>{a.excerpt}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: C.blueLt, fontSize: '13px', fontWeight: '600' }}>
                <BookOpen size={13} /> Lire l'article <ArrowRight size={13} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section style={{ padding: '96px 28px', background: C.bg3 }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Label dark={false}>FAQ</Label>
          <h2 style={h2Light}>Questions fréquentes</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqs.map((f, i) => (
            <div key={i} style={{
              background: C.white, borderRadius: '12px', overflow: 'hidden',
              border: `1px solid`, borderColor: open === i ? C.blue : C.borderL,
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxShadow: open === i ? '0 0 0 3px rgba(3,105,161,0.1)' : 'none',
            }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: '100%', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer',
                textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', minHeight: '44px',
              }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: open === i ? C.blue : C.text, lineHeight: '1.5' }}>{f.q}</span>
                <ChevronDown size={18} color={C.muted} style={{ flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {open === i && <div style={{ padding: '0 24px 20px', color: C.dim, fontSize: '15px', lineHeight: '1.75' }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Shared style helpers ───────────────────────────────────────────────────────
function Label({ children, dark = false }) {
  return (
    <p style={{ fontSize: '12px', fontWeight: '700', color: dark ? C.blueLt : C.blue, textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 12px' }}>
      {children}
    </p>
  )
}
function LabelDark({ children }) { return <Label dark>{children}</Label> }

const h2Light = { fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: '800', color: C.text,  margin: '0 0 14px', letterSpacing: '-0.5px', textAlign: 'center' }
const h2Dark  = { fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: '800', color: C.white, margin: '0 0 14px', letterSpacing: '-0.5px', textAlign: 'center' }

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [selectedCity, setSelectedCity] = useState('')

  return (
    <div style={{ minHeight: '100vh', background: C.white }}>
      <Navbar />
      <TrustBar />
      <Hero onSelectCity={setSelectedCity} />
      <Stats />
      <HowItWorks />
      <FloorGallery />
      <APropos />
      <TrustSection />
      <CitiesSection onSelectCity={setSelectedCity} />
      <ArticlesSection />
      <FAQ />

      {/* Bottom CTA */}
      <section style={{ padding: '96px 28px', background: metalGrad, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: accentLine }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(3,105,161,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
          <LabelDark>Commencez maintenant</LabelDark>
          <h2 style={{ ...h2Dark, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-1px', lineHeight: '1.12' }}>
            Prêt à obtenir votre soumission?
          </h2>
          <p style={{ color: C.steel, fontSize: '17px', margin: '0 0 40px', lineHeight: '1.7' }}>
            Service gratuit et sans engagement pour toute la province de Québec.
          </p>
          <a href="#form" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: chromeCTA,
            color: '#0F1923', textDecoration: 'none', padding: '17px 40px',
            borderRadius: '10px', fontSize: '16px', fontWeight: '800',
            minHeight: '54px', cursor: 'pointer', letterSpacing: '0.3px',
            boxShadow: chromeShadow, transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <Phone size={17} /> Obtenir ma soumission gratuite
          </a>
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginTop: '36px' }}>
            {['Gratuit', 'Sans engagement', 'Entrepreneurs vérifiés'].map(b => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <CheckCircle size={13} color="#22C55E" />
                <span style={{ color: C.steel, fontSize: '13px', fontWeight: '500' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: C.bg0, padding: '36px 28px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
            <span style={{ fontSize: '15px', fontWeight: '800', color: C.blueLt }}>Plancher</span>
            <span style={{ fontSize: '15px', fontWeight: '800', color: C.steel }}>Époxy</span>
          </div>
          <p style={{ color: '#1E2E42', fontSize: '13px', margin: 0, textAlign: 'center', flex: 1 }}>
            Service de mise en relation entre clients et entrepreneurs indépendants — Province de Québec
          </p>
          <p style={{ color: '#1E2E42', fontSize: '13px', margin: 0 }}>© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}
