const raw = (import.meta.env.VITE_OWNER_PHONE || '5141234567').replace(/\D/g, '')

export const PHONE_TEL     = `tel:${raw}`
export const PHONE_DISPLAY = raw.length === 10
  ? `(${raw.slice(0,3)}) ${raw.slice(3,6)}-${raw.slice(6)}`
  : raw
