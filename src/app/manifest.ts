import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Small Talk — אנגלית לילדים',
    short_name: 'Small Talk',
    description: 'אנגלית לילדים דוברי עברית: מהאות הראשונה ועד שיחה.',
    start_url: '/',
    display: 'standalone',
    dir: 'rtl',
    lang: 'he',
    background_color: '#FFFBF7',
    theme_color: '#6C63FF',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }
}
