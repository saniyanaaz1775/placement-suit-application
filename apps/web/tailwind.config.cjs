module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F6F3',
        primaryText: '#111111',
        accent: '#8B0000',
        muted: '#6b6b6b',
        cardBorder: '#e6e2dd'
      },
      spacing: {
        // spacing scale: 8px,16px,24px,40px,64px
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '10': '40px',
        '16': '64px'
      },
      fontFamily: {
        heading: ['Georgia', 'Times New Roman', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        'content': '720px'
      },
    },
  },
  plugins: [],
}

