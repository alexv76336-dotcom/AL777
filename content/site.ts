/**
 * Site configuration for Alex Dashboard (German)
 */

export const site = {
  name: 'Alex',
  greeting: 'Willkommen zurück',
  tagline: 'Dein persönliches Fitness- & Wellness-Dashboard',
  email: 'alexvv1705@icloud.com',
}

/**
 * Dashboard tiles / slots
 * Each slot can be filled with a tile file in public/tiles/<slot>.html
 */
export const slots = [
  { id: 'train', label: 'Fitness', icon: '💪' },
  { id: 'fuel', label: 'Ernährung', icon: '⚡' },
  { id: 'health', label: 'Gesundheit', icon: '❤️' },
  { id: 'vee', label: 'Ziele', icon: '🎯' },
  { id: 'finance', label: 'Finanzen', icon: '💰' },
  { id: 'peak', label: 'Nova', icon: '🧠' },
  { id: 'brand', label: 'Avatar', icon: '✨' },
]
