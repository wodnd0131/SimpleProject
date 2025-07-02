export const designTokens = {
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    '3xl': '3rem',    // 48px
  },
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
  },
  
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    full: '9999px',
  },
  
  issue: {
    states: {
      open: {
        color: 'rgb(34, 197, 94)',    // green-500
        background: 'rgb(34, 197, 94, 0.1)',
        textColor: 'rgb(21, 128, 61)', // green-700
      },
      closed: {
        color: 'rgb(239, 68, 68)',    // red-500
        background: 'rgb(239, 68, 68, 0.1)',
        textColor: 'rgb(185, 28, 28)', // red-700
      },
    },
  },
  
  avatar: {
    sizes: {
      xs: '1rem',      // 16px
      sm: '1.5rem',    // 24px
      md: '2rem',      // 32px
      lg: '2.5rem',    // 40px
      xl: '3rem',      // 48px
    },
  },
  
  layout: {
    container: {
      maxWidth: '1200px',
      padding: '1rem',
    },
    header: {
      height: '4rem',  // 64px
    },
    sidebar: {
      width: '16rem',  // 256px
    },
  },
  
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    timing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
} as const

export type DesignTokens = typeof designTokens