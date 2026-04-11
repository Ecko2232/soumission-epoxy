import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Phone, DollarSign, MapPin, Layers, Ruler, CheckCircle, AlertTriangle, TrendingUp, Calculator } from 'lucide-react'
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

const SYSTEMES = [
  {
    nom: 'Époxy uni (1 couleur)',
    fourchette: '3 $ – 5 $',
    pi2: 'par pi²',
    couleur: '#0369A1',
    usage: 'Garage, sous-sol, local commercial',
    details: 'Le système le plus accessible. Couleur solide, surface lisse et brillante. Inclut l\'apprêt, la couche de corps et un vernis polyuréthane de base.',
    inclus: ['Préparation mécanique du béton', 'Couche d\'apprêt époxy', 'Couche de corps 100 % solides', 'Vernis top coat polyuréthane'],
  },
  {
    nom: 'Époxy flocons (vinyl chips)',
    fourchette: '4 $ – 7 $',
    pi2: 'par pi²',
    couleur: '#059669',
    usage: 'Garage résidentiel, atelier, sous-sol',
    details: 'Flocons vinyliques colorés dispersés dans la résine pour un effet granit ou terrazzo. Cache les imperfections et ajoute une traction naturelle. Très populaire au Québec.',
    inclus: ['Préparation mécanique du béton', 'Apprêt époxy à pénétration', 'Couche de corps + dispersion des flocons', 'Vernis top coat résistant aux UV'],
  },
  {
    nom: 'Époxy métallique (swirl / marbre)',
    fourchette: '6 $ – 10 $',
    pi2: 'par pi²',
    couleur: '#7C3AED',
    usage: 'Garage prestige, showroom, commerce haut de gamme',
    details: 'Pigments métalliques créant des effets marbré, nacré ou "liquid metal". Application artistique — chaque plancher est unique. Résultat spectaculaire et durée de vie maximale.',
    inclus: ['Préparation intensive (meulage double passage)', 'Apprêt époxy renforcé', 'Couche métallique avec manipulation artistique', 'Double vernis polyaspartique UV'],
  },
  {
    nom: 'Polyurée / Polyaspartique',
    fourchette: '6 $ – 14 $',
    pi2: 'par pi²',
    couleur: '#B45309',
    usage: 'Usage commercial intensif, atelier mécanique, entrepôt',
    details: 'Système premium à séchage ultra-rapide (retour véhicules en 24 h). Résistance supérieure aux UV, aux chocs et aux produits chimiques. Standard industriel au Québec.',
    inclus: ['Préparation industrielle + test d\'humidité', 'Membrane d\'étanchéité si requis', 'Couche polyurée/polyaspartique haute densité', 'Vernis final anti-dérapage (optionnel)'],
  },
]

const EXEMPLES = [
  { label: 'Garage 1 voiture (200 pi²)', epoxy: '600 $ – 1 400 $', polyuree: '1 200 $ – 2 800 $' },
  { label: 'Garage 2 voitures (400 pi²)', epoxy: '1 200 $ – 2 800 $', polyuree: '2 400 $ – 5 600 $' },
  { label: 'Garage 3 voitures (600 pi²)', epoxy: '1 800 $ – 4 200 $', polyuree: '3 600 $ – 8 400 $' },
  { label: 'Sous-sol résidentiel (500 pi²)', epoxy: '1 500 $ – 3 500 $', polyuree: '3 000 $ – 7 000 $' },
  { label: 'Local commercial (1 000 pi²)', epoxy: '3 000 $ – 7 000 $', polyuree: '6 000 $ – 14 000 $' },
  { label: 'Entrepôt (5 000 pi²)', epoxy: '15 000 $ – 35 000 $', polyuree: '30 000 $ – 70 000 $' },
]

const REGIONS = [
  { region: 'Grand Montréal', indice: '+15 % à +25 %', note: 'Densité de main-d\'œuvre qualifiée mais coût de vie et déplacements plus élevés.' },
  { region: 'Québec (ville)', indice: '+5 % à +15 %', note: 'Marché compétitif avec plusieurs poseurs certifiés — légèrement inférieur à Montréal.' },
  { region: 'Rive-Sud / Montérégie', indice: '0 % (référence)', note: 'Zone de référence — tarifs standard du marché québécois.' },
  { region: 'Laurentides / Lanaudière', indice: '+5 % à +20 %', note: 'Déplacements supplémentaires selon l\'éloignement — à confirmer avec le poseur.' },
  { region: 'Outaouais / Gatineau', indice: '+10 % à +20 %', note: 'Proximité d\'Ottawa influence les tarifs à la hausse.' },
  { region: 'Estrie / Cantons-de-l\'Est', indice: '0 % à +10 %', note: 'Bon bassin de poseurs locaux — tarifs compétitifs.' },
  { region: 'Régions éloignées', indice: '+20 % à +40 %', note: 'Déplacement et hébergement peuvent s\'ajouter pour les grandes superficies.' },
]

const EXTRAS = [
  { poste: 'Préparation renforcée du béton (fissures, taches)', cout: '200 $ – 600 $' },
  { poste: 'Réparation de fissures structurales', cout: '150 $ – 400 $ par fissure' },
  { poste: 'Traitement anti-humidité / membrane d\'étanchéité', cout: '1 $ – 2 $ / pi²' },
  { poste: 'Bandes antidérapantes aux seuils et escaliers', cout: '80 $ – 200 $' },
  { poste: 'Deuxième couche de vernis top coat', cout: '0,50 $ – 1,50 $ / pi²' },
  { poste: 'Effets décoratifs additionnels (logo, lignes)', cout: '200 $ – 800 $' },
  { poste: 'Déplacement hors zone (>50 km)', cout: '80 $ – 200 $ (forfait)' },
]

export default function ArticlePrixPage() {
  useEffect(() => {
    document.title = 'Prix plancher époxy Québec 2026 : combien ça coûte? — PoseurEpoxy.ca'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Prix réels des planchers époxy au Québec en 2026 : coût par pi², exemples concrets selon la superficie, variations selon la région et les extras à prévoir.')
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', 'https://poseurepoxy.ca/articles/prix-plancher-epoxy-quebec-2026')
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
        <img src="/epoxy-flake.jpg" alt="" aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center bottom', opacity: 0.15, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: accentLine }} />
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: C.steel, fontSize: '13px', fontWeight: '600', textDecoration: 'none', marginBottom: '28px' }}>
            <ArrowLeft size={14} /> Retour à l'accueil
          </Link>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(180,83,9,0.15)', border: '1px solid rgba(180,83,9,0.3)', borderRadius: '6px', padding: '5px 12px', marginBottom: '20px' }}>
            <DollarSign size={13} color="#B45309" />
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#B45309', letterSpacing: '1px', textTransform: 'uppercase' }}>Prix & coûts</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '800', color: C.white, lineHeight: '1.2', margin: '0 0 20px' }}>
            Combien coûte un plancher d'époxy au Québec en 2026?
          </h1>
          <p style={{ fontSize: '18px', color: C.steel, lineHeight: '1.7', margin: '0 0 32px', maxWidth: '680px' }}>
            Prix réels par pied carré, exemples concrets selon la superficie, variations régionales et extras à prévoir — toutes les données pour budgéter votre projet avec précision.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: C.steel }}>10 min de lecture</span>
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

          {/* Chiffres clés */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '56px' }}>
            {[
              { val: '3 $ – 14 $', label: 'Prix / pi² au Québec', sub: 'selon le système et la région', color: '#0369A1' },
              { val: '1 200 $', label: 'Prix minimum garage 2 voitures', sub: 'époxy uni, installation complète', color: '#059669' },
              { val: '15–20 ans', label: 'Durée de vie', sub: 'installation professionnelle RBQ', color: '#7C3AED' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{ background: C.white, borderRadius: '12px', border: `1px solid ${C.borderL}`, padding: '22px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
              >
                <div style={{ fontSize: '26px', fontWeight: '800', color: item.color, lineHeight: 1, marginBottom: '6px' }}>{item.val}</div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: C.text, marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '12px', color: C.muted }}>{item.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* Prix par système */}
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: C.text, margin: '0 0 12px' }}>
            <Layers size={20} style={{ verticalAlign: 'middle', marginRight: '10px', color: C.blue }} />
            Prix par type de système
          </h2>
          <p style={{ fontSize: '16px', color: C.muted, lineHeight: '1.7', margin: '0 0 32px' }}>
            Tous les prix incluent la main-d'œuvre, les matériaux professionnels et la préparation de base du béton. La TVQ et TPS (15 %) s'ajoutent.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '64px' }}>
            {SYSTEMES.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                style={{ background: C.white, borderRadius: '14px', border: `1px solid ${C.borderL}`, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
              >
                <div style={{ background: `${s.couleur}12`, borderBottom: `1px solid ${s.couleur}25`, padding: '18px 22px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: C.muted, marginBottom: '4px' }}>{s.usage}</div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: s.couleur }}>{s.fourchette} <span style={{ fontSize: '13px', color: C.muted, fontWeight: '400' }}>{s.pi2}</span></div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: C.text, marginTop: '4px' }}>{s.nom}</div>
                </div>
                <div style={{ padding: '18px 22px' }}>
                  <p style={{ fontSize: '14px', color: C.dim, lineHeight: '1.65', margin: '0 0 14px' }}>{s.details}</p>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Inclus :</div>
                  {s.inclus.map((inc, j) => (
                    <div key={j} style={{ display: 'flex', gap: '8px', marginBottom: '5px', alignItems: 'flex-start' }}>
                      <CheckCircle size={12} color="#059669" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ fontSize: '13px', color: C.dim, lineHeight: '1.5' }}>{inc}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Exemples concrets */}
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: C.text, margin: '0 0 12px' }}>
            <Calculator size={20} style={{ verticalAlign: 'middle', marginRight: '10px', color: C.blue }} />
            Exemples de prix selon la superficie
          </h2>
          <p style={{ fontSize: '16px', color: C.muted, lineHeight: '1.7', margin: '0 0 24px' }}>
            Estimations basées sur les tarifs du marché québécois — avant taxes (15 %). Une soumission gratuite vous donnera le prix exact pour votre projet.
          </p>
          <div style={{ background: C.white, borderRadius: '14px', border: `1px solid ${C.borderL}`, overflow: 'hidden', marginBottom: '64px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            {/* En-tête */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', background: C.bg3, padding: '14px 22px', borderBottom: `1px solid ${C.borderL}` }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: C.muted, textTransform: 'uppercase', letterSpacing: '1px' }}>Superficie</span>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#0369A1', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>Époxy</span>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>Polyurée</span>
            </div>
            {EXEMPLES.map((ex, i) => (
              <motion.div key={i}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.04 }}
                style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '14px 22px', borderBottom: i < EXEMPLES.length - 1 ? `1px solid ${C.borderL}` : 'none', background: i % 2 === 1 ? C.bg3 : C.white }}
              >
                <span style={{ fontSize: '14px', fontWeight: '600', color: C.text }}>{ex.label}</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#0369A1', textAlign: 'center' }}>{ex.epoxy}</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#7C3AED', textAlign: 'center' }}>{ex.polyuree}</span>
              </motion.div>
            ))}
          </div>

          {/* Variations régionales */}
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: C.text, margin: '0 0 12px' }}>
            <MapPin size={20} style={{ verticalAlign: 'middle', marginRight: '10px', color: C.blue }} />
            Variations selon la région du Québec
          </h2>
          <p style={{ fontSize: '16px', color: C.muted, lineHeight: '1.7', margin: '0 0 24px' }}>
            Les tarifs varient selon la région en raison des déplacements, de la densité des poseurs et du coût de la vie local.
          </p>
          <div style={{ background: C.white, borderRadius: '14px', border: `1px solid ${C.borderL}`, overflow: 'hidden', marginBottom: '64px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            {REGIONS.map((r, i) => (
              <div key={i} style={{ padding: '16px 22px', borderBottom: i < REGIONS.length - 1 ? `1px solid ${C.borderL}` : 'none', background: i % 2 === 1 ? C.bg3 : C.white, display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ minWidth: '200px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: C.text }}>{r.region}</div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: i === 2 ? '#059669' : r.indice.startsWith('+3') || r.indice.startsWith('+4') ? '#EF4444' : '#F59E0B', marginTop: '2px' }}>{r.indice}</div>
                </div>
                <div style={{ fontSize: '13px', color: C.muted, lineHeight: '1.6' }}>{r.note}</div>
              </div>
            ))}
          </div>

          {/* Extras */}
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: C.text, margin: '0 0 12px' }}>
            <TrendingUp size={20} style={{ verticalAlign: 'middle', marginRight: '10px', color: C.blue }} />
            Coûts supplémentaires à prévoir
          </h2>
          <p style={{ fontSize: '16px', color: C.muted, lineHeight: '1.7', margin: '0 0 24px' }}>
            Ces postes s'ajoutent au prix de base selon l'état de votre béton et vos exigences spécifiques.
          </p>
          <div style={{ background: C.white, borderRadius: '14px', border: `1px solid ${C.borderL}`, overflow: 'hidden', marginBottom: '48px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            {EXTRAS.map((ex, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 22px', borderBottom: i < EXTRAS.length - 1 ? `1px solid ${C.borderL}` : 'none', background: i % 2 === 1 ? C.bg3 : C.white, gap: '16px' }}>
                <span style={{ fontSize: '14px', color: C.dim }}>{ex.poste}</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#B45309', whiteSpace: 'nowrap' }}>{ex.cout}</span>
              </div>
            ))}
          </div>

          {/* Pourquoi ne pas choisir le moins cher */}
          <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', padding: '24px 28px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <AlertTriangle size={18} color="#EF4444" />
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: C.text, margin: 0 }}>Pourquoi ne pas choisir automatiquement le moins cher?</h3>
            </div>
            <p style={{ fontSize: '15px', color: C.dim, lineHeight: '1.75', margin: '0 0 12px' }}>
              Un plancher époxy installé par un non-certifié à 2 $ / pi² peut paraître attrayant — mais sans préparation adéquate, sans produits professionnels et sans licence RBQ, vous risquez un décollage en moins de 2 ans sans recours possible.
            </p>
            <p style={{ fontSize: '15px', color: C.dim, lineHeight: '1.75', margin: 0 }}>
              <strong>La règle d'or :</strong> demandez toujours le numéro de licence RBQ du poseur, une facture avec garantie écrite et une liste des produits utilisés. Un professionnel sérieux ne refuse jamais ces informations.
            </p>
          </div>

          {/* CTA bloc */}
          <div style={{ background: metalGrad, borderRadius: '16px', padding: '36px 40px', border: `1px solid ${C.border}`, marginBottom: '48px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: C.silver, margin: '0 0 14px' }}>
              Obtenez un prix exact pour votre projet
            </h3>
            <p style={{ fontSize: '15px', color: C.steel, lineHeight: '1.75', margin: '0 0 24px' }}>
              Ces fourchettes sont des estimations. Le seul moyen d'obtenir un prix précis est une visite sur place — nos poseurs RBQ évaluent l'état du béton, la superficie exacte, les contraintes d'accès et vous remettent une soumission détaillée sans engagement.
            </p>
            <a href="#form" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: chromeCTA, color: '#0F1923', textDecoration: 'none', padding: '13px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: '800', boxShadow: chromeShadow }}>
              <Phone size={15} /> Soumission gratuite — sans engagement
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
            Soumission gratuite — réponse en 24 h
          </h2>
          <p style={{ color: C.steel, fontSize: '16px', margin: 0 }}>
            Mise en relation avec un poseur certifié RBQ de votre région. Aucun frais, aucun engagement.
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
