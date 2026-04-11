import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Phone, AlertTriangle, CheckCircle, XCircle, Clock, Thermometer, Layers, ShieldOff, Wrench } from 'lucide-react'
import LeadForm from '../components/LeadForm'

const C = {
  bg0: '#060C14', bg1: '#0B1422', bg2: '#101D2E',
  bg3: '#F4F6F8', white: '#FFFFFF',
  steel: '#8BA3B8', silver: '#C8D6E0',
  blue: '#0369A1', blueLt: '#38BDF8',
  text: '#0F172A', muted: '#64748B',
  border: '#1E2E42', borderL: '#E2E8F0',
}
const chromeCTA  = `linear-gradient(135deg, #8E9EAE 0%, #C8D6E0 22%, #F0F4F8 40%, #FFFFFF 50%, #E0E8F0 60%, #B0C0CE 78%, #7A8C9A 100%)`
const chromeShadow = `0 6px 28px rgba(140,165,185,0.5), 0 2px 0 rgba(255,255,255,0.6) inset, 0 -1px 0 rgba(0,0,0,0.15) inset`
const metalGrad  = `linear-gradient(160deg, #0B1422 0%, #0D1826 50%, #091420 100%)`
const accentLine = `linear-gradient(90deg, transparent, rgba(56,189,248,0.35), transparent)`

const ERRORS = [
  {
    num: '01',
    icon: Wrench,
    color: '#EF4444',
    title: 'Ne pas préparer le béton correctement',
    intro: 'C\'est de loin l\'erreur la plus fréquente — et la plus coûteuse. Un époxy n\'adhère pas à un béton sale, huileux, peint ou encore imprégné d\'humidité.',
    details: [
      'Le béton doit être meulé mécaniquement (scarification) ou traité à l\'acide pour ouvrir les pores et créer un profil d\'ancrage. Un simple nettoyage à la vadrouille ne suffit pas.',
      'Les taches d\'huile de moteur doivent être dégraissées chimiquement — elles bloquent la pénétration de la résine même après lavage.',
      'L\'humidité est ennemie n°1 : un test simple consiste à coller un plastique 45×45 cm pendant 24 h. Si de la condensation apparaît en dessous, le béton est trop humide.',
    ],
    bonne: 'Meulage mécanique + test d\'humidité + dégraissage chimique avant toute application.',
    mauvaise: 'Passer l\'époxy directement sur le béton existant sans préparation.',
    cout: 'Réfection complète du plancher : 2 000 $ – 5 000 $',
  },
  {
    num: '02',
    icon: Thermometer,
    color: '#F59E0B',
    title: 'Appliquer par mauvaises conditions météo',
    intro: 'La température et l\'humidité au moment de l\'application déterminent directement la qualité de la réticulation (durcissement) de la résine époxy.',
    details: [
      'En dessous de 10 °C, la résine durcit trop lentement et peut rester collante ou blanchir — un phénomène appelé "blush" causé par la condensation de la vapeur d\'eau.',
      'Au-dessus de 30 °C, le mélange réagit trop vite et le produit peut se gélifier dans le seau avant même d\'avoir le temps de l\'étaler uniformément.',
      'Un taux d\'humidité relative supérieur à 85 % compromet l\'adhérence, même si la température est correcte. Les journées de pluie ou de brouillard sont à éviter absolument.',
    ],
    bonne: 'Température entre 15 °C et 25 °C, humidité sous 80 %, sans pluie prévue dans les 24 heures.',
    mauvaise: 'Appliquer en octobre ou novembre dans un garage non chauffé au Québec.',
    cout: 'Décollage et bullage → reprise complète : 800 $ – 2 500 $',
  },
  {
    num: '03',
    icon: ShieldOff,
    color: '#8B5CF6',
    title: 'Utiliser un produit de qualité inférieure',
    intro: 'Les kits époxy vendus en grandes surfaces (Rona, Home Depot) contiennent souvent moins de 50 % de solides — contre 90–100 % pour les produits professionnels. Le résultat final est radicalement différent.',
    details: [
      'Un époxy à faible teneur en solides donne une couche très mince qui s\'écaille rapidement, surtout sous les pneus d\'automobiles chauds (phénomène de "tire peel").',
      'Les pigments bon marché jaunissent ou pâlissent au contact des rayons UV si aucune couche de finition polyuréthane UV-stable n\'est appliquée par-dessus.',
      'Les produits professionnels sont formulés pour le béton québécois (cycles gel-dégel) avec des flexibilisants adaptés qui préviennent la fissuration hivernale.',
    ],
    bonne: 'Époxy 100 % solides à deux composants, appliqué par un professionnel RBQ avec vernis polyuréthane UV.',
    mauvaise: 'Kit Rust-Oleum de 60 $ du Home Depot sur un garage de 400 pi².',
    cout: 'Durée de vie : 2–3 ans au lieu de 15–20 ans. Refaire = 1 500 $ – 3 000 $',
  },
  {
    num: '04',
    icon: Layers,
    color: '#0369A1',
    title: 'Omettre le vernis de finition',
    intro: 'L\'époxy de base est poreux et susceptible aux taches, aux rayures et aux UV. Le vernis de finition (top coat) est la couche protectrice qui donne au plancher son aspect ultra-brillant et sa durabilité.',
    details: [
      'Sans top coat polyuréthane ou polyaspartique, l\'époxy absorbe les taches d\'huile, de caoutchouc et de dégivrant — et elles deviennent permanentes.',
      'Les finitions polyaspartiques durcissent en quelques heures (retour à la circulation en 24 h) contre 72 h pour un époxy standard, et résistent mieux aux égratignures.',
      'Un top coat anti-UV empêche le jaunissement des époxys clairs ou à pigments pâles — crucial pour les garages avec fenêtres ou portes vitrées.',
    ],
    bonne: 'Système complet : couche d\'apprêt + couche de corps époxy + vernis top coat polyuréthane ou polyaspartique.',
    mauvaise: 'S\'arrêter après la couche d\'époxy principale pour "économiser" sur la finition.',
    cout: 'Remplacement anticipé du plancher : 1 500 $ – 4 000 $',
  },
  {
    num: '05',
    icon: Clock,
    color: '#059669',
    title: 'Sous-estimer le temps de séchage',
    intro: 'Un époxy peut sembler sec au toucher après quelques heures, mais la réticulation chimique complète (full cure) prend de 5 à 7 jours. Utiliser le plancher trop tôt cause des dommages permanents.',
    details: [
      'Se garer sur un époxy qui n\'a pas complété sa cure laisse des marques de pneus indélébiles, surtout si les pneus sont chauds après un trajet.',
      'Déposer des objets lourds ou frapper le sol trop tôt peut créer des indentations (marques de table, d\'escabeau) qui ne disparaissent pas une fois la résine durcie.',
      'En hiver québécois, la cure ralentit considérablement sous 15 °C — il faut chauffer le garage pendant toute la durée du séchage pour obtenir un résultat optimal.',
    ],
    bonne: 'Trafic à pied après 24 h, véhicules après 72 h minimum, charge complète après 7 jours.',
    mauvaise: 'Rentrer la voiture dans le garage le soir même de l\'application.',
    cout: 'Marques permanentes → ponçage et reprise partielle : 400 $ – 1 200 $',
  },
]

export default function ArticlePage() {
  useEffect(() => {
    document.title = '5 erreurs à éviter avec votre plancher d\'époxy — PoseurEpoxy.ca'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Découvrez les 5 erreurs les plus courantes qui ruinent les planchers époxy au Québec — et comment les éviter pour protéger votre investissement.')
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', 'https://poseurepoxy.ca/articles/5-erreurs-plancher-epoxy')
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

      {/* ── Hero article ── */}
      <section style={{ padding: '72px 28px 56px', background: metalGrad, position: 'relative', overflow: 'hidden', borderBottom: `1px solid ${C.border}` }}>
        <img src="/epoxy-flake.jpg" alt="" aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center bottom', opacity: 0.18, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: accentLine }} />
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: C.steel, fontSize: '13px', fontWeight: '600', textDecoration: 'none', marginBottom: '28px' }}>
            <ArrowLeft size={14} /> Retour à l'accueil
          </Link>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', padding: '5px 12px', marginBottom: '20px' }}>
            <AlertTriangle size={13} color="#EF4444" />
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#EF4444', letterSpacing: '1px', textTransform: 'uppercase' }}>Conseils</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '800', color: C.white, lineHeight: '1.2', margin: '0 0 20px' }}>
            5 erreurs à éviter avec votre plancher d'époxy
          </h1>
          <p style={{ fontSize: '18px', color: C.steel, lineHeight: '1.7', margin: '0 0 32px', maxWidth: '640px' }}>
            Évitez ces erreurs courantes qui peuvent ruiner votre plancher époxy et vous coûter cher en réparations — certaines sont irréversibles sans tout refaire.
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

      {/* ── Article body ── */}
      <section style={{ padding: '72px 28px', background: C.bg3 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          {/* Intro */}
          <div style={{ background: 'rgba(3,105,161,0.08)', border: `1px solid rgba(3,105,161,0.25)`, borderRadius: '12px', padding: '24px 28px', marginBottom: '56px' }}>
            <p style={{ fontSize: '16px', color: C.text, lineHeight: '1.75', margin: 0 }}>
              Au Québec, un plancher époxy mal installé peut se décoller dès la première année — surtout dans un garage exposé aux cycles gel-dégel, aux sels de voirie et aux pneus d'automobilespartag. Ces 5 erreurs sont celles que nos poseurs certifiés RBQ voient le plus souvent lors de travaux de réfection. Apprenez à les reconnaître avant d'investir.
            </p>
          </div>

          {/* Errors */}
          {ERRORS.map((err, i) => {
            const Icon = err.icon
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ marginBottom: '56px', paddingBottom: '56px', borderBottom: i < ERRORS.length - 1 ? `1px solid ${C.borderL}` : 'none' }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '20px' }}>
                  <div style={{ flexShrink: 0, width: '52px', height: '52px', borderRadius: '12px', background: `${err.color}18`, border: `1px solid ${err.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={22} color={err.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '800', color: err.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Erreur {err.num}
                    </div>
                    <h2 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: '800', color: C.text, margin: 0, lineHeight: '1.3' }}>
                      {err.title}
                    </h2>
                  </div>
                </div>

                {/* Intro paragraph */}
                <p style={{ fontSize: '16px', color: C.text, lineHeight: '1.75', margin: '0 0 20px' }}>
                  {err.intro}
                </p>

                {/* Details */}
                <div style={{ marginBottom: '24px' }}>
                  {err.details.map((d, j) => (
                    <div key={j} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-start' }}>
                      <div style={{ flexShrink: 0, marginTop: '5px', width: '6px', height: '6px', borderRadius: '50%', background: err.color }} />
                      <p style={{ fontSize: '15px', color: C.dim, lineHeight: '1.7', margin: 0 }}>{d}</p>
                    </div>
                  ))}
                </div>

                {/* Bonne vs mauvaise pratique */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.3)', borderRadius: '10px', padding: '16px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <CheckCircle size={14} color="#059669" />
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Bonne pratique</span>
                    </div>
                    <p style={{ fontSize: '14px', color: C.text, lineHeight: '1.6', margin: 0 }}>{err.bonne}</p>
                  </div>
                  <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', padding: '16px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <XCircle size={14} color="#EF4444" />
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#EF4444', textTransform: 'uppercase', letterSpacing: '0.8px' }}>À ne pas faire</span>
                    </div>
                    <p style={{ fontSize: '14px', color: C.text, lineHeight: '1.6', margin: 0 }}>{err.mauvaise}</p>
                  </div>
                </div>

                {/* Cost warning */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '8px', padding: '8px 14px' }}>
                  <AlertTriangle size={13} color="#F59E0B" />
                  <span style={{ fontSize: '13px', color: '#92400E', fontWeight: '600' }}>Coût d'une erreur : {err.cout}</span>
                </div>
              </motion.article>
            )
          })}

          {/* Conclusion */}
          <div style={{ background: metalGrad, borderRadius: '16px', padding: '40px', border: `1px solid ${C.border}`, marginBottom: '48px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: C.silver, margin: '0 0 16px' }}>
              La solution : confier votre projet à un poseur certifié RBQ
            </h3>
            <p style={{ fontSize: '15px', color: C.steel, lineHeight: '1.75', margin: '0 0 24px' }}>
              Un poseur professionnel évite systématiquement ces 5 erreurs grâce à sa formation, son équipement (meuleuse industrielle, hygromètre, etc.) et ses produits professionnels. Le coût supplémentaire par rapport à un DIY est largement amorti par la durée de vie du plancher : 15 à 20 ans contre 2 à 3 ans pour un kit grand public mal appliqué.
            </p>
            <a href="#form" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: chromeCTA, color: '#0F1923', textDecoration: 'none', padding: '14px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: '800', boxShadow: chromeShadow }}>
              <Phone size={15} /> Obtenir une soumission gratuite
            </a>
          </div>

          {/* Back link */}
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
