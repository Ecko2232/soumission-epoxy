import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Phone, Scale, CheckCircle, XCircle, Zap, Clock, DollarSign, Thermometer, Shield, Home, Factory, Car } from 'lucide-react'
import LeadForm from '../components/LeadForm'

const C = {
  bg0: '#060C14', bg1: '#0B1422', bg2: '#101D2E',
  bg3: '#F4F6F8', white: '#FFFFFF',
  steel: '#8BA3B8', silver: '#C8D6E0',
  blue: '#0369A1', blueLt: '#38BDF8',
  text: '#0F172A', muted: '#64748B', dim: '#475569',
  border: '#1E2E42', borderL: '#E2E8F0',
}
const chromeCTA    = `linear-gradient(135deg, #8E9EAE 0%, #C8D6E0 22%, #F0F4F8 40%, #FFFFFF 50%, #E0E8F0 60%, #B0C0CE 78%, #7A8C9A 100%)`
const chromeShadow = `0 6px 28px rgba(140,165,185,0.5), 0 2px 0 rgba(255,255,255,0.6) inset, 0 -1px 0 rgba(0,0,0,0.15) inset`
const metalGrad    = `linear-gradient(160deg, #0B1422 0%, #0D1826 50%, #091420 100%)`
const accentLine   = `linear-gradient(90deg, transparent, rgba(56,189,248,0.35), transparent)`

// Tableau comparatif principal
const CRITERES = [
  {
    critere: 'Temps de séchage',
    icon: Clock,
    epoxy: { val: '24–72 h', note: 'Retour véhicules après 72 h, cure complète en 7 jours.', score: 2 },
    polyuree: { val: '1–4 h', note: 'Retour véhicules dès le lendemain, cure complète en 24 h.', score: 5 },
  },
  {
    critere: 'Résistance aux UV',
    icon: Zap,
    epoxy: { val: 'Moyenne', note: 'Jaunit progressivement sans vernis UV-stable par-dessus.', score: 2 },
    polyuree: { val: 'Excellente', note: 'Résiste naturellement aux UV sans jaunissement, idéal portes vitrées.', score: 5 },
  },
  {
    critere: 'Résistance aux chocs',
    icon: Shield,
    epoxy: { val: 'Bonne', note: 'Peut se fissurer sous impact ponctuel important (outil lourd).', score: 3 },
    polyuree: { val: 'Supérieure', note: 'Élasticité naturelle absorbe les chocs sans fissurer — indéformable.', score: 5 },
  },
  {
    critere: 'Résistance chimique',
    icon: Thermometer,
    epoxy: { val: 'Très bonne', note: 'Résiste aux huiles, solvants légers, sel de voirie si top coat appliqué.', score: 4 },
    polyuree: { val: 'Excellente', note: 'Résiste aux acides, bases, hydrocarbures — standard industriel.', score: 5 },
  },
  {
    critere: 'Coût d\'installation',
    icon: DollarSign,
    epoxy: { val: '3–8 $ / pi²', note: 'Accessible pour la majorité des projets résidentiels et commerciaux.', score: 5 },
    polyuree: { val: '6–14 $ / pi²', note: 'Premium — justifié pour les exigences industrielles ou les zones à fort trafic.', score: 3 },
  },
  {
    critere: 'Épaisseur finale',
    icon: Scale,
    epoxy: { val: '3–6 mm', note: 'Système multicouche — apprêt + corps + top coat.', score: 4 },
    polyuree: { val: '1–3 mm', note: 'Plus mince mais plus résistant grâce à la formulation moléculaire.', score: 3 },
  },
  {
    critere: 'Tolérance au froid',
    icon: Thermometer,
    epoxy: { val: 'Limitée', note: 'Application difficile sous 10 °C — cure ralentie, risque de blush.', score: 2 },
    polyuree: { val: 'Excellente', note: 'S\'applique jusqu\'à -20 °C — idéal pour les chantiers hivernaux québécois.', score: 5 },
  },
  {
    critere: 'Esthétique / finis disponibles',
    icon: Home,
    epoxy: { val: 'Très variée', note: 'Métallique, flocons, uni, 3D, paillettes — très grande créativité possible.', score: 5 },
    polyuree: { val: 'Bonne', note: 'Flocons, uni, quelques effets décoratifs — moins d\'options artistiques.', score: 3 },
  },
  {
    critere: 'Durée de vie',
    icon: Clock,
    epoxy: { val: '15–20 ans', note: 'Avec bon entretien et top coat renouvelé à mi-vie.', score: 4 },
    polyuree: { val: '20–25 ans', note: 'La résistance naturelle réduit l\'usure — souvent sans re-coat nécessaire.', score: 5 },
  },
]

const SCENARIOS = [
  {
    icon: Car,
    color: '#0369A1',
    titre: 'Garage résidentiel',
    gagnant: 'Époxy',
    pourquoi: 'Le rapport qualité/prix de l\'époxy est imbattable pour un garage familial. Les finis métalliques et flocons offrent un rendu spectaculaire à coût raisonnable. La polyurée est une option premium si vous souhaitez la durabilité maximale sans entretien.',
  },
  {
    icon: Factory,
    color: '#7C3AED',
    titre: 'Commerce ou entrepôt',
    gagnant: 'Polyurée',
    pourquoi: 'Le trafic intense, les chariots élévateurs, les produits chimiques et les cycles de nettoyage agressif favorisent clairement la polyurée. Son séchage rapide minimise aussi les interruptions d\'activité — crucial en contexte commercial.',
  },
  {
    icon: Home,
    color: '#059669',
    titre: 'Sous-sol résidentiel',
    gagnant: 'Époxy',
    pourquoi: 'Le sous-sol typique bénéficie du vaste choix esthétique de l\'époxy à un coût accessible. Si le sous-sol est sujet à l\'humidité, une membrane imperméabilisante est nécessaire dans les deux cas — à discuter avec votre poseur RBQ.',
  },
  {
    icon: Shield,
    color: '#B45309',
    titre: 'Atelier mécanique',
    gagnant: 'Polyurée',
    pourquoi: 'Huiles, solvants, chutes d\'outils lourds, trafic de véhicules quotidien — la polyurée est le seul système qui supporte ces conditions sans dégradation prématurée. L\'investissement supplémentaire est rapidement rentabilisé.',
  },
]

function ScoreDots({ score }) {
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: i <= score ? (score >= 4 ? '#059669' : score >= 3 ? '#F59E0B' : '#EF4444') : '#E2E8F0',
        }} />
      ))}
    </div>
  )
}

export default function ArticleEpoxyPolyureePage() {
  useEffect(() => {
    document.title = 'Époxy vs Polyurée : quelle différence? — PoseurEpoxy.ca'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Comparez l\'époxy et la polyurée pour planchers : temps de séchage, résistance, coût, durée de vie. Faites le bon choix selon votre projet au Québec.')
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', 'https://poseurepoxy.ca/articles/epoxy-vs-polyuree')
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
          <a href="tel:5141234567" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: chromeCTA, color: '#0F1923', textDecoration: 'none', padding: '11px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: '800', boxShadow: chromeShadow }}>
            <Phone size={15} /> Appel gratuit
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ padding: '72px 28px 56px', background: metalGrad, position: 'relative', overflow: 'hidden', borderBottom: `1px solid ${C.border}` }}>
        <img src="/epoxy-metallic.jpg" alt="" aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.18, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: accentLine }} />
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: C.steel, fontSize: '13px', fontWeight: '600', textDecoration: 'none', marginBottom: '28px' }}>
            <ArrowLeft size={14} /> Retour à l'accueil
          </Link>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '6px', padding: '5px 12px', marginBottom: '20px' }}>
            <Scale size={13} color="#7C3AED" />
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#7C3AED', letterSpacing: '1px', textTransform: 'uppercase' }}>Comparatif</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '800', color: C.white, lineHeight: '1.2', margin: '0 0 20px' }}>
            Époxy versus polyurée : quelle est la différence?
          </h1>
          <p style={{ fontSize: '18px', color: C.steel, lineHeight: '1.7', margin: '0 0 32px', maxWidth: '680px' }}>
            Comparez les deux systèmes de revêtement les plus populaires pour faire un choix éclairé selon vos besoins — prix, durabilité, séchage, esthétique et résistance au climat québécois.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: C.steel }}>12 min de lecture</span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: C.border }} />
            <span style={{ fontSize: '13px', color: C.steel }}>Mis à jour : avril 2026</span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: C.border }} />
            <span style={{ fontSize: '13px', color: C.steel }}>Par l'équipe PoseurEpoxy.ca</span>
          </div>
        </div>
      </section>

      {/* ── Contenu ── */}
      <section style={{ padding: '72px 28px', background: C.bg3 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* Intro */}
          <div style={{ background: 'rgba(124,58,237,0.07)', border: `1px solid rgba(124,58,237,0.2)`, borderRadius: '12px', padding: '24px 28px', marginBottom: '56px' }}>
            <p style={{ fontSize: '16px', color: C.text, lineHeight: '1.75', margin: 0 }}>
              L'époxy et la polyurée sont souvent confondus — tous les deux sont des revêtements de béton sans joint, très brillants et durables. Pourtant, leur chimie, leurs performances et leurs prix sont radicalement différents. Choisir le mauvais système pour votre usage peut vous coûter cher en réparations anticipées. Ce guide vous donne les données brutes pour décider.
            </p>
          </div>

          {/* Définitions rapides */}
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: C.text, margin: '0 0 24px' }}>En bref : deux chimies très différentes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '64px' }}>
            {[
              {
                titre: 'Époxy',
                color: '#0369A1',
                bg: 'rgba(3,105,161,0.07)',
                border: 'rgba(3,105,161,0.25)',
                points: [
                  'Résine thermodurcissable à deux composants (résine + durcisseur)',
                  'Réticulation lente (24–72 h) pour une liaison très dense avec le béton',
                  'Excellente adhérence mécanique — s\'accroche dans les pores du béton',
                  'Large gamme de finis décoratifs : métallique, flocons, 3D, béton ciré',
                  'Application en plusieurs couches (apprêt + corps + vernis)',
                ],
              },
              {
                titre: 'Polyurée',
                color: '#7C3AED',
                bg: 'rgba(124,58,237,0.07)',
                border: 'rgba(124,58,237,0.25)',
                points: [
                  'Élastomère à base d\'isocyanate — structure moléculaire flexible',
                  'Réticulation ultra-rapide (quelques secondes à 4 h selon la formulation)',
                  'Application au pistolet spécialisé haute pression — équipement pro requis',
                  'Naturellement résistant aux UV — ne jaunit pas sans additif',
                  'Système généralement en 1–2 couches grâce à l\'épaisseur par passe',
                ],
              },
            ].map((item, i) => (
              <div key={i} style={{ background: item.bg, border: `1px solid ${item.border}`, borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '18px', fontWeight: '800', color: item.color, marginBottom: '16px' }}>{item.titre}</div>
                {item.points.map((p, j) => (
                  <div key={j} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
                    <div style={{ flexShrink: 0, marginTop: '6px', width: '6px', height: '6px', borderRadius: '50%', background: item.color }} />
                    <p style={{ fontSize: '14px', color: C.dim, lineHeight: '1.6', margin: 0 }}>{p}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Tableau comparatif */}
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: C.text, margin: '0 0 12px' }}>Comparatif détaillé critère par critère</h2>
          <p style={{ fontSize: '16px', color: C.muted, lineHeight: '1.7', margin: '0 0 32px' }}>
            Les scores (● = faible, ●●●●● = excellent) sont relatifs à l'usage résidentiel et commercial standard.
          </p>

          {/* En-tête tableau */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0', marginBottom: '8px', padding: '0 0 12px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: C.muted, textTransform: 'uppercase', letterSpacing: '1px' }}>Critère</div>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#0369A1', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>Époxy</div>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>Polyurée</div>
          </div>

          <div style={{ marginBottom: '64px' }}>
            {CRITERES.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.04 }}
                  style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0',
                    background: i % 2 === 0 ? C.white : C.bg3,
                    borderRadius: '10px', marginBottom: '6px',
                    border: `1px solid ${C.borderL}`, overflow: 'hidden',
                  }}
                >
                  {/* Critère */}
                  <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={16} color={C.blue} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '14px', fontWeight: '700', color: C.text }}>{c.critere}</span>
                  </div>
                  {/* Époxy */}
                  <div style={{ padding: '16px 18px', borderLeft: `1px solid ${C.borderL}`, borderRight: `1px solid ${C.borderL}` }}>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#0369A1', marginBottom: '4px' }}>{c.epoxy.val}</div>
                    <ScoreDots score={c.epoxy.score} />
                    <div style={{ fontSize: '12px', color: C.muted, lineHeight: '1.5', marginTop: '6px' }}>{c.epoxy.note}</div>
                  </div>
                  {/* Polyurée */}
                  <div style={{ padding: '16px 18px' }}>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#7C3AED', marginBottom: '4px' }}>{c.polyuree.val}</div>
                    <ScoreDots score={c.polyuree.score} />
                    <div style={{ fontSize: '12px', color: C.muted, lineHeight: '1.5', marginTop: '6px' }}>{c.polyuree.note}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Quel système pour quel usage */}
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: C.text, margin: '0 0 12px' }}>Quel système pour quel projet?</h2>
          <p style={{ fontSize: '16px', color: C.muted, lineHeight: '1.7', margin: '0 0 32px' }}>
            Le meilleur système est celui qui correspond à votre usage réel — pas nécessairement le plus cher.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '64px' }}>
            {SCENARIOS.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                  style={{ background: C.white, borderRadius: '12px', border: `1px solid ${C.borderL}`, padding: '22px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={18} color={s.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: '700', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.8px' }}>{s.titre}</div>
                      <div style={{ fontSize: '14px', fontWeight: '800', color: s.color }}>→ {s.gagnant}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: C.dim, lineHeight: '1.7', margin: 0 }}>{s.pourquoi}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Peut-on combiner les deux? */}
          <div style={{ background: C.white, borderRadius: '12px', border: `1px solid ${C.borderL}`, padding: '28px 32px', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: C.text, margin: '0 0 14px' }}>
              💡 Peut-on combiner les deux?
            </h3>
            <p style={{ fontSize: '15px', color: C.dim, lineHeight: '1.75', margin: '0 0 14px' }}>
              Oui — c'est même une pratique courante chez les professionnels : appliquer une couche de base en époxy (meilleure adhérence mécanique au béton) et finir avec une couche de polyurée ou polyaspartique (résistance UV + séchage rapide). Ce système hybride combine le meilleur des deux mondes.
            </p>
            <p style={{ fontSize: '15px', color: C.dim, lineHeight: '1.75', margin: 0 }}>
              C'est exactement ce que proposent la plupart des poseurs certifiés RBQ de notre réseau pour les garages haut de gamme et les commerces à fort trafic.
            </p>
          </div>

          {/* Verdict */}
          <div style={{ background: metalGrad, borderRadius: '16px', padding: '36px 40px', border: `1px solid ${C.border}`, marginBottom: '48px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: C.silver, margin: '0 0 16px' }}>Verdict final</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Choisissez l'époxy si…</div>
                {['Vous avez un budget résidentiel standard', 'Vous voulez un fini décoratif personnalisé (métallique, flocons)', 'Le délai de séchage n\'est pas critique', 'Projet : garage familial, sous-sol, commerce léger'].map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '7px', alignItems: 'flex-start' }}>
                    <CheckCircle size={13} color="#059669" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontSize: '14px', color: C.steel, lineHeight: '1.55' }}>{p}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#A78BFA', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Choisissez la polyurée si…</div>
                {['Usage intensif ou industriel prévu', 'Exposition quotidienne aux UV ou produits chimiques forts', 'Délai serré — réouverture rapide nécessaire', 'Projet : atelier mécanique, entrepôt, commerce haute fréquence'].map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '7px', alignItems: 'flex-start' }}>
                    <CheckCircle size={13} color="#A78BFA" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontSize: '14px', color: C.steel, lineHeight: '1.55' }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <a href="#form" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: chromeCTA, color: '#0F1923', textDecoration: 'none', padding: '13px 26px', borderRadius: '8px', fontSize: '14px', fontWeight: '800', boxShadow: chromeShadow }}>
              <Phone size={14} /> Parler à un expert — soumission gratuite
            </a>
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
            Pas sûr de votre choix? Demandez conseil.
          </h2>
          <p style={{ color: C.steel, fontSize: '16px', margin: 0 }}>
            Nos poseurs RBQ évaluent votre situation et recommandent le meilleur système pour votre budget et votre usage.
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
