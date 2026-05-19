import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, CheckCircle, ArrowRight, User, MapPin, Wrench, Lock, Ruler } from 'lucide-react'

const services = [
  'Plancher de garage',
  'Sous-sol / Cave',
  'Local commercial',
  'Espace industriel',
  'Autre',
]

const superficies = [
  { label: 'Moins de 200 pi²', sub: 'Petit espace' },
  { label: '200 – 400 pi²',    sub: 'Garage 1 auto' },
  { label: '400 – 700 pi²',    sub: 'Garage 2 autos' },
  { label: '700 – 1 000 pi²',  sub: 'Grand garage / petit local' },
  { label: 'Plus de 1 000 pi²',sub: 'Local commercial / industriel' },
  { label: 'Je ne sais pas',   sub: 'Le poseur estimera' },
]

export default function LeadForm({ city = '' }) {
  const [step, setStep]           = useState(1)
  const [form, setForm]           = useState({ service: '', superficie: '', name: '', phone: '', city })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.service || !form.city) return
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, city: form.city || city }),
      })
    } catch (_) {}
    setSubmitted(true)
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: '#f8faff', border: '2px solid #e2e8f0',
    borderRadius: '10px', fontSize: '16px',
    fontFamily: 'inherit', color: '#1a1a1a',
    transition: 'border-color 0.2s', boxSizing: 'border-box',
  }

  const btnPrimary = {
    width: '100%', padding: '16px',
    background: 'linear-gradient(135deg, #8E9EAE 0%, #C8D6E0 22%, #F0F4F8 40%, #FFFFFF 50%, #E0E8F0 60%, #B0C0CE 78%, #7A8C9A 100%)',
    color: '#0F1923', border: 'none', borderRadius: '10px',
    fontSize: '16px', fontWeight: '800', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    fontFamily: 'inherit', transition: 'opacity 0.2s',
    boxShadow: '0 6px 28px rgba(140,165,185,0.45), 0 2px 0 rgba(255,255,255,0.6) inset, 0 -1px 0 rgba(0,0,0,0.12) inset',
  }

  const TOTAL_STEPS = 4

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '48px 24px' }}>
        <div style={{ width: '72px', height: '72px', background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <CheckCircle size={36} color="#fff" />
        </div>
        <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 10px' }}>Demande reçue</h3>
        <p style={{ color: '#64748b', fontSize: '16px', margin: '0 0 24px', lineHeight: '1.6' }}>
          Un entrepreneur certifié vous contactera dans les prochains jours ouvrables pour votre soumission gratuite.
        </p>
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '16px' }}>
          <p style={{ color: '#15803d', fontSize: '14px', fontWeight: '600', margin: 0 }}>Soumission 100% gratuite et sans engagement</p>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Progress bar — 4 étapes */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map(s => (
          <div key={s} style={{
            flex: 1, height: '4px', borderRadius: '2px',
            background: s <= step ? '#0369A1' : '#e2e8f0',
            transition: 'background 0.3s',
          }} />
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* ── ÉTAPE 1 : Type de projet ── */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <p style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 8px' }}>
              Étape 1 sur {TOTAL_STEPS}
            </p>
            <h3 style={{ fontSize: '19px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wrench size={18} color="#0369A1" /> Quel type de projet?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {services.map(s => (
                <button
                  key={s} type="button"
                  onClick={() => { setForm({ ...form, service: s }); setStep(2) }}
                  style={{
                    padding: '14px 18px', border: '2px solid',
                    borderColor: form.service === s ? '#0369A1' : '#e2e8f0',
                    background: form.service === s ? '#e0f2fe' : '#fff',
                    borderRadius: '10px', cursor: 'pointer', textAlign: 'left',
                    fontSize: '15px', fontWeight: '500', color: '#1a1a1a',
                    fontFamily: 'inherit', transition: 'all 0.15s',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#0369A1'; e.currentTarget.style.background = '#e0f2fe' }}
                  onMouseLeave={e => { if (form.service !== s) { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff' } }}
                >
                  {s} <ArrowRight size={15} color="#94a3b8" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── ÉTAPE 2 : Superficie ── */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <p style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 8px' }}>
              Étape 2 sur {TOTAL_STEPS}
            </p>
            <h3 style={{ fontSize: '19px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Ruler size={18} color="#0369A1" /> Superficie du plancher?
            </h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 18px' }}>
              Estimation approximative — aide le poseur à préparer la soumission.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {superficies.map(opt => (
                <button
                  key={opt.label} type="button"
                  onClick={() => { setForm({ ...form, superficie: opt.label }); setStep(3) }}
                  style={{
                    padding: '12px 16px', border: '2px solid',
                    borderColor: form.superficie === opt.label ? '#0369A1' : '#e2e8f0',
                    background: form.superficie === opt.label ? '#e0f2fe' : '#fff',
                    borderRadius: '10px', cursor: 'pointer', textAlign: 'left',
                    fontFamily: 'inherit', transition: 'all 0.15s',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#0369A1'; e.currentTarget.style.background = '#e0f2fe' }}
                  onMouseLeave={e => { if (form.superficie !== opt.label) { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff' } }}
                >
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#1a1a1a' }}>{opt.label}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '1px' }}>{opt.sub}</div>
                  </div>
                  <ArrowRight size={15} color="#94a3b8" />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', padding: '12px 4px 4px' }}>
              Retour
            </button>
          </motion.div>
        )}

        {/* ── ÉTAPE 3 : Localisation ── */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <p style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 8px' }}>
              Étape 3 sur {TOTAL_STEPS}
            </p>
            <h3 style={{ fontSize: '19px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} color="#0369A1" /> Votre localisation
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                required value={form.city}
                onChange={e => setForm({ ...form, city: e.target.value })}
                placeholder="Votre ville (ex: Montréal, Sherbrooke...)"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#0369A1'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
              <button type="button" style={btnPrimary} onClick={() => { if (form.city) setStep(4) }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Continuer <ArrowRight size={17} />
              </button>
              <button type="button" onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', padding: '4px' }}>
                Retour
              </button>
            </div>
          </motion.div>
        )}

        {/* ── ÉTAPE 4 : Coordonnées ── */}
        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <p style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 8px' }}>
              Étape 4 sur {TOTAL_STEPS}
            </p>
            <h3 style={{ fontSize: '19px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} color="#0369A1" /> Vos coordonnées
            </h3>

            {/* Récapitulatif */}
            <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '12px 14px', marginBottom: '16px', fontSize: '13px', color: '#0369A1' }}>
              <strong>{form.service}</strong> · <strong>{form.superficie}</strong> · <strong>{form.city}</strong>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                required value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Prénom et nom"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#0369A1'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
              <input
                required type="tel" value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="Numéro de téléphone"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#0369A1'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
              <button type="submit" style={btnPrimary}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <Phone size={16} /> Recevoir ma soumission gratuite
              </button>
              <button type="button" onClick={() => setStep(3)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', padding: '4px' }}>
                Retour
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '14px' }}>
              <Lock size={12} color="#94a3b8" />
              <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>Vos informations sont confidentielles. Aucun spam.</p>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </form>
  )
}
