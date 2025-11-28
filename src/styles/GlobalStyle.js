import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    /* Color Palette - Neo-Brutalism with WCAG AA considerations */
    --bg-color: #f0f0f0; /* Lighter gray for better overall contrast */
    --text-color: #1a1a1a; /* Slightly softer black for text */
    --border-color: #000000; /* Pure black for borders */
    
    /* Accents - Adjusted for legibility */
    --accent-color: #d600d6; /* Darker Magenta */
    --secondary-accent: #00cc00; /* Darker Lime Green */
    --card-bg: #ffffff;
    --highlight: #ffff00; /* Yellow for highlighting */
    --error-color: #ff3333;
    
    /* System */
    --border-width: 3px;
    --shadow-offset: 4px;
    --radius-sm: 0px; /* Hard edges */
    --radius-md: 4px; /* Slight rounding for buttons */
    
    /* Typography Scale */
    --font-xs: 0.75rem;
    --font-sm: 0.875rem;
    --font-base: 1rem;
    --font-lg: 1.25rem;
    --font-xl: 1.5rem;
    --font-xxl: 2rem;
    --font-jumbo: 4rem;
    
    @media (max-width: 600px) {
      --font-jumbo: 3rem; /* Smaller jumbo on mobile */
      --font-xxl: 1.5rem;
      --font-xl: 1.25rem;
    }

    @media (max-width: 350px) {
      --font-jumbo: 2.5rem; /* Even smaller for iPhone SE */
      --font-xxl: 1.2rem;
    }
    
    /* Breakpoints */
    --mobile: 600px;
    --tablet: 900px;
    --desktop: 1200px;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    min-width: 0; /* Reset any browser default min-width to prevent forced scrolling */
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Courier New', Courier, monospace; 
    background-color: var(--bg-color);
    color: var(--text-color);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    text-transform: uppercase;
    letter-spacing: -0.05em;
    margin-top: 0;
    margin-bottom: 1rem;
    font-weight: 900;
    line-height: 1.1;
  }
  
  button {
    font-family: inherit;
  }

  /* Brutalist Scrollbar */
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-color);
    border-left: var(--border-width) solid var(--border-color);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--accent-color);
    border: var(--border-width) solid var(--border-color);
  }
`;
