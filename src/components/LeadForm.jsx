import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, CheckCircle, ArrowRight, User, MapPin, Wrench, Lock, Maximize2, FlaskConical } from 'lucide-react'

const services = [
  'Plancher de garage',
  'Sous-sol / Cave',
  'Local commercial',
  'Espace industriel',
  'Autre',
]

const superficies = [
  { label: 'Moins de 500 pi²', value: '< 500 pi²' },
  { label: '500 – 1 000 pi²', value: '500-1000 pi²' },
  { label: '1 000 – 2 000 pi²', value: '1000-2000 pi²' },
  { label: 'Plus de 2 000 pi²', value: '> 2000 pi²' },
]

export default function LeadForm({ city = '' }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    service: '',
    superficie: '',
    resistance_chimique: '',
    name: '',
    phone: '',
    city: city,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch('https://formspree.io/f/mpqoobqw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, _subject: `Nouveau lead époxy — ${form.city || city}` }),
      })
    } catch (_) {}
    setSubmitted(true)
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: '#f8faff', border: '2px solid #e2e8f0',
    borderRadius: '10px', fontSize: '16px',
    fontFamily: 'Lexend, sans-serif', color: '#1a1a1a',
    transition: 'border-color 0.2s', boxSizing: 'border-box',
  }

  const btnStyle = {
    width: '100%', padding: '16px',
    background: 'linear-gradient(135deg, #0369A1, #025f8c)',
    color: '#fff', border: 'none', borderRadius: '10px',
    fontSize: '16px', fontWeight: '700', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    fontFamily: 'Lexend, sans-serif', transition: 'all 0.2s ease',
  }

  const optionBtnStyle = (selected) => ({
    padding: '14px 18px', border: '2px solid',
    borderColor: selected ? '#0369A1' : '#e2e8f0',
    background: selected ? '#e0f2fe' : '#fff',
    borderRadius: '10px', cursor: 'pointer', textAlign: 'left',
    fontSize: '15px', fontWeight: '500', color: '#1a1a1a',
    fontFamily: 'Lexend, sans-serif', transition: 'all 0.15s',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    width: '100%',
  })

  const TOTAL_STEPS = 5

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', padding: '48px 24px' }}
      >
        <div style={{ width: '72px', height: '72px', background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <CheckCircle size={36} color="#fff" />
        </div>
        <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 10px' }}>
          Demande reçue
        </h3>
        <p style={{ color: '#64748b', fontSize: '16px', margin: '0 0 24px', lineHeight: '1.6' }}>
          Un entrepreneur certifié vous contactera dans les prochains jours ouvrables pour votre soumission gratuite.
        </p>
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '16px' }}>
          <p style={{ color: '#15803d', fontSize: '14px', fontWeight: '600', margin: 0 }}>
            Soumission 100% gratuite et sans engagement
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Progress bar */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
        {Array.from({ length: TOTAL_STEPS }).map((_, s) => (
          <div key={s} style={{ flex: 1, height: '4px', borderRadius: '2px', background: s + 1 <= step ? '#0369A1' : '#e2e8f0', transition: 'background 0.3s' }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1 — Service type */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <p style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 8px' }}>Étape 1 sur {TOTAL_STEPS}</p>
            <h3 style={{ fontSize: '19px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wrench size={18} color="#0369A1" />
              Quel type de projet?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {services.map(s => (
                <button
                  key={s} type="button"
                  onClick={() => { setForm({ ...form, service: s }); setStep(2) }}
                  style={optionBtnStyle(form.service === s)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#0369A1'; e.currentTarget.style.background = '#e0f2fe' }}
                  onMouseLeave={e => { if (form.service !== s) { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff' } }}
                >
                  {s}
                  <ArrowRight size={15} color="#94a3b8" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2 — Superficie */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <p style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 8px' }}>Étape 2 sur {TOTAL_STEPS}</p>
            <h3 style={{ fontSize: '19px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Maximize2 size={18} color="#0369A1" />
              Superficie approximative
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {superficies.map(s => (
                <button
                  key={s.value} type="button"
                  onClick={() => { setForm({ ...form, superficie: s.value }); setStep(3) }}
                  style={optionBtnStyle(form.superficie === s.value)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#0369A1'; e.currentTarget.style.background = '#e0f2fe' }}
                  onMouseLeave={e => { if (form.superficie !== s.value) { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff' } }}
                >
                  {s.label}
                  <ArrowRight size={15} color="#94a3b8" />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '14px', cursor: 'pointer', fontFamily: 'Lexend, sans-serif', padding: '12px 4px 4px' }}>
              Retour
            </button>
          </motion.div>
        )}

        {/* Step 3 — Résistance chimique */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <p style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 8px' }}>Étape 3 sur {TOTAL_STEPS}</p>
            <h3 style={{ fontSize: '19px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FlaskConical size={18} color="#0369A1" />
              Résistance chimique requise?
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px', lineHeight: '1.6' }}>
              Utile pour les ateliers mécaniques, cuisines commerciales ou espaces industriels exposés à des produits chimiques.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Oui — exposition à des produits chimiques', value: 'Oui' },
                { label: 'Non — usage résidentiel ou léger', value: 'Non' },
                { label: 'Je ne sais pas', value: 'Inconnu' },
              ].map(opt => (
                <button
                  key={opt.value} type="button"
                  onClick={() => { setForm({ ...form, resistance_chimique: opt.value }); setStep(4) }}
                  style={optionBtnStyle(form.resistance_chimique === opt.value)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#0369A1'; e.currentTarget.style.background = '#e0f2fe' }}
                  onMouseLeave={e => { if (form.resistance_chimique !== opt.value) { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff' } }}
                >
                  {opt.label}
                  <ArrowRight size={15} color="#94a3b8" />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '14px', cursor: 'pointer', fontFamily: 'Lexend, sans-serif', padding: '12px 4px 4px' }}>
              Retour
            </button>
          </motion.div>
        )}

        {/* Step 4 — Localisation */}
        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <p style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 8px' }}>Étape 4 sur {TOTAL_STEPS}</p>
            <h3 style={{ fontSize: '19px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} color="#0369A1" />
              Votre localisation
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
              <button type="button" style={btnStyle} onClick={() => { if (form.city) setStep(5) }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Continuer <ArrowRight size={17} />
              </button>
              <button type="button" onClick={() => setStep(3)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '14px', cursor: 'pointer', fontFamily: 'Lexend, sans-serif', padding: '4px' }}>
                Retour
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 5 — Coordonnées */}
        {step === 5 && (
          <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <p style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 8px' }}>Étape 5 sur {TOTAL_STEPS}</p>
            <h3 style={{ fontSize: '19px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} color="#0369A1" />
              Vos coordonnées
            </h3>
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
              <button type="submit" style={btnStyle}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <Phone size={16} />
                Recevoir ma soumission gratuite
              </button>
              <button type="button" onClick={() => setStep(4)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '14px', cursor: 'pointer', fontFamily: 'Lexend, sans-serif', padding: '4px' }}>
                Retour
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '14px' }}>
              <Lock size={12} color="#94a3b8" />
              <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>
                Vos informations sont confidentielles. Aucun spam.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}
