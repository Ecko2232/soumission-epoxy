import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Phone, Sparkles, Droplets, AlertTriangle, CheckCircle, XCircle, Clock, Calendar, Shield, Wrench } from 'lucide-react'
import LeadForm from '../components/LeadForm'
import { PHONE_TEL, PHONE_DISPLAY } from '../config'

const C = {
  bg0: '#060C14', bg1: '#0B1422', bg2: '#101D2E',
  bg3: '#F4F6F8', white: '#FFFFFF',
  steel: '#8BA3B8', silver: '#C8D6E0',
  blue: '#0369A1', blueLt: '#38BDF8',
  text: '#0F172A', muted: '#64748B', dim: '#475569',
  border: '#1E2E42', borderL: '#E2E8F0',
}
const chromeCTA   = `linear-gradient(135deg, #8E9EAE 0%, #C8D6E0 22%, #F0F4F8 40%, #FFFFFF 50%, #E0E8F0 60%, #B0C0CE 78%, #7A8C9A 100%)`
const chromeShadow = `0 6px 28px rgba(140,165,185,0.5), 0 2px 0 rgba(255,255,255,0.6) inset, 0 -1px 0 rgba(0,0,0,0.15) inset`
const metalGrad   = `linear-gradient(160deg, #0B1422 0%, #0D1826 50%, #091420 100%)`
const accentLine  = `linear-gradient(90deg, transparent, rgba(56,189,248,0.35), transparent)`

const ROUTINES = [
  {
    freq: 'Quotidien',
    icon: Droplets,
    color: '#38BDF8',
    tasks: [
      'Ramasser les débris grossiers à la balayette ou au souffleur — le sable et le gravier abrasif sont les ennemis n°1 du vernis.',
      'Essuyer immédiatement tout déversement de liquide (huile, dégivrant, jus de batterie) — même si l\'époxy résiste, laisser mariner accélère la dégradation.',
    ],
  },
  {
    freq: 'Hebdomadaire',
    icon: Sparkles,
    color: '#059669',
    tasks: [
      'Balayer avec un balai microfibre (éviter les balais de soies rigides qui rayent).',
      'Passer une vadrouille humide avec de l\'eau chaude légèrement savonneuse (pH neutre). Un produit conçu pour les sols époxy est idéal.',
      'Rincer à l\'eau claire pour ne laisser aucun résidu de savon — les résidus créent un film terne qui masque le brillant.',
    ],
  },
  {
    freq: 'Mensuel',
    icon: Shield,
    color: '#7C3AED',
    tasks: [
      'Inspection visuelle : chercher des micro-égratignures, zones ternes ou début de décollage aux joints.',
      'Nettoyage en profondeur avec un dégraissant doux dilué pour les zones sous le véhicule (gouttes d\'huile, liquide de frein).',
      'Vérifier les joints de périmètre et autour des drains — ce sont les zones où l\'humidité s\'infiltre d\'abord.',
    ],
  },
  {
    freq: 'Annuel',
    icon: Wrench,
    color: '#F59E0B',
    tasks: [
      'Polissage léger avec une cireuse à vitesse lente et un polissant pour époxy — restitue le brillant comme au premier jour.',
      'Application d\'une couche de renouvellement (refresher coat) si le vernis top coat montre des signes d\'usure aux zones de fort passage.',
      'Nettoyage des taches incrustées avec un nettoyant pour époxy en concentré — jamais de décapant ni de dissolvant.',
    ],
  },
]

const PRODUITS_OK = [
  { nom: 'Eau chaude + savon pH neutre', detail: 'Solution universelle du quotidien — efficace et sans risque.' },
  { nom: 'Dégraissant doux dilué', detail: 'Pour les zones graisseuses sous le véhicule.' },
  { nom: 'Nettoyant spécifique époxy/polyuréthane', detail: 'Conçu pour ne pas attaquer le vernis — recommandé.' },
  { nom: 'Vinaigre blanc dilué (5 %)', detail: 'Efficace pour les dépôts calcaires, à rincer immédiatement.' },
  { nom: 'Balai microfibre', detail: 'Pour balayer sans rayer — indispensable.' },
]

const PRODUITS_NON = [
  { nom: 'Savon de Castille concentré', detail: 'Laisse un film résiduel qui ternit le brillant.' },
  { nom: 'Ammoniaque ou javellisant', detail: 'Attaque le liant époxy et dégrade la surface progressivement.' },
  { nom: 'Acétone / dissolvants organiques', detail: 'Dissolvent littéralement le vernis polyuréthane.' },
  { nom: 'Tampons abrasifs (Brillo, Scotch-Brite)', detail: 'Griffent irrémédiablement le vernis brillant.' },
  { nom: 'Nettoyeur à vapeur haute pression', detail: 'La chaleur et la pression forcent l\'humidité sous l\'époxy.' },
  { nom: 'Fondant à base de chlorure (sel de route)', detail: 'Corrode la couche d\'adhérence entre l\'époxy et le béton.' },
]

const SAISONS = [
  {
    saison: 'Printemps',
    emoji: '🌱',
    color: '#059669',
    conseil: 'Nettoyage en profondeur post-hiver : éliminer les résidus de sel et de sable laissés par les pneus. C\'est la période idéale pour inspecter si le gel-dégel a causé des soulèvements ou des micro-fissures.',
  },
  {
    saison: 'Été',
    emoji: '☀️',
    color: '#F59E0B',
    conseil: 'Protéger le plancher des rayons UV si la porte de garage reste ouverte — un store ou un vernis UV-stable réduit le jaunissement des époxys clairs. Surveiller les taches de pneus par temps chaud.',
  },
  {
    saison: 'Automne',
    emoji: '🍂',
    color: '#B45309',
    conseil: 'Dernier nettoyage approfondi avant l\'hiver. Appliquer un protecteur si le vernis montre des signes de micro-porosité. Vérifier les joints de périmètre pour éviter les infiltrations d\'eau de fonte.',
  },
  {
    saison: 'Hiver',
    emoji: '❄️',
    color: '#38BDF8',
    conseil: 'Éviter absolument le sel de déglaçage — utiliser du sable ou du gravier fin à la place. Secouer et essuyer les pneus enneigés avant de rentrer le véhicule. Nettoyer fréquemment les flaques de fonte.',
  },
]

export default function ArticleEntretienPage() {
  useEffect(() => {
    document.title = 'Guide d\'entretien de votre plancher d\'époxy — PoseurEpoxy.ca'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Apprenez comment entretenir correctement votre plancher époxy pour qu\'il conserve son éclat pendant des années : routines, produits à utiliser et à éviter, conseils saisonniers au Québec.')
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', 'https://poseurepoxy.ca/articles/guide-entretien-plancher-epoxy')
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ fontFamily: 'Lexend, sans-serif', background: C.bg0, minHeight: '100vh' }}>

      {/* ── Navbar ── */}
      <nav style={{ background: C.bg0, position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${C.blue}80, ${C.blueLt}90, ${C.blue}80, transparent)` }} />
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '66px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'baseline', gap: '3px', textDecoration: 'none' }}>
            <span style={{ fontSize: '20px', fontWeight: '800', color: C.blueLt }}>Poseur</span>
            <span style={{ fontSize: '20px', fontWeight: '800', color: C.silver }}>Époxy</span>
            <span style={{ fontSize: '10px', fontWeight: '700', color: C.steel, marginLeft: '8px', border: `1px solid ${C.border}`, padding: '2px 8px', borderRadius: '4px', letterSpacing: '1px', textTransform: 'uppercase', background: 'rgba(255,255,255,0.03)' }}>.ca</span>
          </Link>
          <a href={PHONE_TEL} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: chromeCTA, color: '#0F1923', textDecoration: 'none', padding: '11px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: '800', boxShadow: chromeShadow }}>
            <Phone size={15} /> {PHONE_DISPLAY}
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ padding: '72px 28px 56px', background: metalGrad, position: 'relative', overflow: 'hidden', borderBottom: `1px solid ${C.border}` }}>
        <img src="/epoxy-solid.jpg" alt="" aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.15, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: accentLine }} />
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: C.steel, fontSize: '13px', fontWeight: '600', textDecoration: 'none', marginBottom: '28px' }}>
            <ArrowLeft size={14} /> Retour à l'accueil
          </Link>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(5,150,105,0.15)', border: '1px solid rgba(5,150,105,0.3)', borderRadius: '6px', padding: '5px 12px', marginBottom: '20px' }}>
            <Sparkles size={13} color="#059669" />
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669', letterSpacing: '1px', textTransform: 'uppercase' }}>Entretien</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '800', color: C.white, lineHeight: '1.2', margin: '0 0 20px' }}>
            Guide d'entretien de votre plancher d'époxy
          </h1>
          <p style={{ fontSize: '18px', color: C.steel, lineHeight: '1.7', margin: '0 0 32px', maxWidth: '640px' }}>
            Apprenez comment entretenir correctement votre plancher époxy pour qu'il conserve son éclat pendant des années — avec des routines simples adaptées au climat québécois.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: C.steel }}>8 min de lecture</span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: C.border }} />
            <span style={{ fontSize: '13px', color: C.steel }}>Mis à jour : avril 2026</span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: C.border }} />
            <span style={{ fontSize: '13px', color: C.steel }}>Par l'équipe PoseurEpoxy.ca</span>
          </div>
        </div>
      </section>

      {/* ── Contenu ── */}
      <section style={{ padding: '72px 28px', background: C.bg3 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          {/* Intro */}
          <div style={{ background: 'rgba(3,105,161,0.08)', border: `1px solid rgba(3,105,161,0.25)`, borderRadius: '12px', padding: '24px 28px', marginBottom: '56px' }}>
            <p style={{ fontSize: '16px', color: C.text, lineHeight: '1.75', margin: 0 }}>
              Un plancher époxy installé par un professionnel RBQ peut durer <strong>15 à 20 ans</strong> — mais seulement si on l'entretient correctement. La bonne nouvelle : l'entretien est minimal comparé à d'autres revêtements. Quelques gestes simples suffisent à préserver le brillant, l'adhérence et l'imperméabilité de votre surface pour des décennies.
            </p>
          </div>

          {/* Routines par fréquence */}
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: C.text, margin: '0 0 32px' }}>
            Routines d'entretien selon la fréquence
          </h2>
          <div style={{ marginBottom: '64px' }}>
            {ROUTINES.map((r, i) => {
              const Icon = r.icon
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                  style={{ display: 'flex', gap: '20px', marginBottom: '28px', padding: '24px', background: C.white, borderRadius: '12px', border: `1px solid ${C.borderL}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
                >
                  <div style={{ flexShrink: 0 }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: `${r.color}18`, border: `1px solid ${r.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={20} color={r.color} />
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: r.color, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>{r.freq}</div>
                    {r.tasks.map((t, j) => (
                      <div key={j} style={{ display: 'flex', gap: '10px', marginBottom: j < r.tasks.length - 1 ? '10px' : 0 }}>
                        <CheckCircle size={15} color="#059669" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <p style={{ fontSize: '15px', color: C.dim, lineHeight: '1.65', margin: 0 }}>{t}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Produits */}
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: C.text, margin: '0 0 12px' }}>
            Produits : ce qu'on utilise, ce qu'on évite
          </h2>
          <p style={{ fontSize: '16px', color: C.muted, lineHeight: '1.7', margin: '0 0 32px' }}>
            Le choix du produit de nettoyage est critique — certains produits courants détruisent progressivement le vernis de finition sans que vous le réalisiez.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '64px' }}>
            {/* Colonne OK */}
            <div style={{ background: C.white, borderRadius: '12px', border: `1px solid ${C.borderL}`, overflow: 'hidden' }}>
              <div style={{ background: 'rgba(5,150,105,0.1)', padding: '14px 20px', borderBottom: `1px solid rgba(5,150,105,0.2)`, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={16} color="#059669" />
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.8px' }}>À utiliser</span>
              </div>
              {PRODUITS_OK.map((p, i) => (
                <div key={i} style={{ padding: '14px 20px', borderBottom: i < PRODUITS_OK.length - 1 ? `1px solid ${C.borderL}` : 'none' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: C.text, marginBottom: '3px' }}>{p.nom}</div>
                  <div style={{ fontSize: '13px', color: C.muted, lineHeight: '1.5' }}>{p.detail}</div>
                </div>
              ))}
            </div>
            {/* Colonne NON */}
            <div style={{ background: C.white, borderRadius: '12px', border: `1px solid ${C.borderL}`, overflow: 'hidden' }}>
              <div style={{ background: 'rgba(239,68,68,0.08)', padding: '14px 20px', borderBottom: `1px solid rgba(239,68,68,0.2)`, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <XCircle size={16} color="#EF4444" />
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#EF4444', textTransform: 'uppercase', letterSpacing: '0.8px' }}>À éviter absolument</span>
              </div>
              {PRODUITS_NON.map((p, i) => (
                <div key={i} style={{ padding: '14px 20px', borderBottom: i < PRODUITS_NON.length - 1 ? `1px solid ${C.borderL}` : 'none' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: C.text, marginBottom: '3px' }}>{p.nom}</div>
                  <div style={{ fontSize: '13px', color: C.muted, lineHeight: '1.5' }}>{p.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Conseils saisonniers */}
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: C.text, margin: '0 0 12px' }}>
            Entretien saisonnier — spécifique au Québec
          </h2>
          <p style={{ fontSize: '16px', color: C.muted, lineHeight: '1.7', margin: '0 0 32px' }}>
            Le climat québécois avec ses cycles de gel-dégel impose des précautions particulières à chaque saison pour protéger l'adhérence de votre plancher.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '64px' }}>
            {SAISONS.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{ background: C.white, borderRadius: '12px', border: `1px solid ${C.borderL}`, padding: '22px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{s.emoji}</span>
                  <span style={{ fontSize: '15px', fontWeight: '800', color: s.color }}>{s.saison}</span>
                </div>
                <p style={{ fontSize: '14px', color: C.dim, lineHeight: '1.7', margin: 0 }}>{s.conseil}</p>
              </motion.div>
            ))}
          </div>

          {/* Quand appeler un pro */}
          <div style={{ background: metalGrad, borderRadius: '16px', padding: '36px 40px', border: `1px solid ${C.border}`, marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <AlertTriangle size={20} color="#F59E0B" />
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: C.silver, margin: 0 }}>
                Quand faut-il appeler un professionnel?
              </h3>
            </div>
            <div style={{ marginBottom: '24px' }}>
              {[
                'Des zones se décollent ou forment des cloques — signe d\'humidité sous l\'époxy.',
                'Le vernis est rayé en profondeur sur de grandes surfaces — un ponçage et re-coating sont nécessaires.',
                'Des taches permanentes apparaissent malgré le nettoyage — le top coat est probablement épuisé.',
                'Après 8–10 ans : une couche de renouvellement (re-coat) par un professionnel prolonge la vie du plancher de 5 à 8 ans supplémentaires.',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, marginTop: '6px', width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B' }} />
                  <p style={{ fontSize: '15px', color: C.steel, lineHeight: '1.65', margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
            <a href="#form" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: chromeCTA, color: '#0F1923', textDecoration: 'none', padding: '13px 26px', borderRadius: '8px', fontSize: '14px', fontWeight: '800', boxShadow: chromeShadow }}>
              <Phone size={14} /> Demander une évaluation gratuite
            </a>
          </div>

          {/* Durée de vie */}
          <div style={{ background: C.white, borderRadius: '12px', border: `1px solid ${C.borderL}`, padding: '28px', marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Calendar size={18} color={C.blue} />
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: C.text, margin: 0 }}>Durée de vie selon l'entretien</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {[
                { label: 'Entretien minimal', duree: '5–8 ans', color: '#EF4444', desc: 'Nettoyage occasionnel, produits inadaptés, pas de top coat renouvelé.' },
                { label: 'Entretien régulier', duree: '12–15 ans', color: '#F59E0B', desc: 'Routines hebdomadaires suivies, bons produits, 1 re-coat à mi-vie.' },
                { label: 'Entretien optimal', duree: '20 ans +', color: '#059669', desc: 'Toutes les routines respectées, re-coat professionnel, aucun produit abrasif.' },
              ].map((item, i) => (
                <div key={i} style={{ background: C.bg3, borderRadius: '10px', padding: '18px', border: `1px solid ${C.borderL}` }}>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: item.color, lineHeight: 1, marginBottom: '6px' }}>{item.duree}</div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: C.text, marginBottom: '8px' }}>{item.label}</div>
                  <div style={{ fontSize: '12px', color: C.muted, lineHeight: '1.55' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: C.blue, fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>
            <ArrowLeft size={14} /> Retour à l'accueil
          </Link>
        </div>
      </section>

      {/* ── Lead form ── */}
      <section id="form" style={{ padding: '80px 28px', background: C.bg1, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: C.silver, margin: '0 0 12px' }}>
            Obtenez une soumission gratuite
          </h2>
          <p style={{ color: C.steel, fontSize: '16px', margin: 0 }}>
            Mise en relation avec un poseur certifié RBQ de votre région — sans engagement.
          </p>
        </div>
        <LeadForm />
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: C.bg0, borderTop: `1px solid ${C.border}`, padding: '32px 28px', textAlign: 'center' }}>
        <p style={{ color: C.steel, fontSize: '13px', margin: 0 }}>
          © 2026 PoseurEpoxy.ca — Service de mise en relation, Province de Québec
        </p>
      </footer>
    </div>
  )
}
