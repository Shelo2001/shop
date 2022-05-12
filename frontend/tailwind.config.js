module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
    ],
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#32d1b3',

          secondary: '#8999f4',

          accent: '#ebf9a2',

          neutral: '#131A20',

          'base-100': '#3D4C57',

          info: '#43A9CB',

          success: '#11645B',

          warning: '#F2CE64',

          error: '#EB1E2B',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
