import type {Config} from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './renders/**/*.{js,ts,jsx,tsx,mdx}',
        './bundles/**/*.{js,ts,jsx,tsx,mdx}',
        './application/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'rgb(var(--background) / <alpha-value>)',
                foreground: 'rgb(var(--foreground) / <alpha-value>)',
                card: {
                    DEFAULT: 'rgb(var(--card) / <alpha-value>)',
                    foreground: 'rgb(var(--card-foreground) / <alpha-value>)',
                },
                popover: {
                    DEFAULT: 'rgb(var(--popover) / <alpha-value>)',
                    foreground: 'rgb(var(--popover-foreground) / <alpha-value>)',
                },
                primary: {
                    DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
                    foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
                },
                secondary: {
                    DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
                    foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)',
                },
                muted: {
                    DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
                    foreground: 'rgb(var(--muted-foreground) / <alpha-value>)',
                },
                accent: {
                    DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
                    foreground: 'rgb(var(--accent-foreground) / <alpha-value>)',
                },
                destructive: {
                    DEFAULT: 'rgb(var(--destructive) / <alpha-value>)',
                    foreground: 'rgb(var(--destructive-foreground) / <alpha-value>)',
                },
                border: 'rgb(var(--border) / <alpha-value>)',
                input: 'rgb(var(--input) / <alpha-value>)',
                ring: 'rgb(var(--ring) / <alpha-value>)',
            },
            animation: {
                marquee: "marquee 25s linear infinite reverse",
            },
            keyframes: {
                marquee: {
                    "0%": {transform: "translateX(0)"},
                    "100%": {transform: "translateX(-50%)"},
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'var(--radius-md)',
                sm: 'var(--radius-sm)',
            },
            ringWidth: {
                3: '3px',
            },
        },
    },
    plugins: [typography],
}

export default config