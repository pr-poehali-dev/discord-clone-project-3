import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}"
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				display: ['Space Grotesk', 'sans-serif'],
				body: ['Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				nebula: {
					void: '#08080e',
					deep: '#0c0c16',
					surface: '#13132a',
					elevated: '#1a1a3e',
					hover: '#222255',
					border: '#2a2a5a',
					subtle: '#3d3d7a',
				},
				star: {
					blue: '#6c8cff',
					purple: '#a855f7',
					pink: '#ec4899',
					amber: '#f59e0b',
					emerald: '#10b981',
					red: '#ef4444',
					white: '#e2e8f0',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'nebula-drift': {
					'0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.4' },
					'33%': { transform: 'translate(30px, -20px) scale(1.1)', opacity: '0.6' },
					'66%': { transform: 'translate(-20px, 15px) scale(0.9)', opacity: '0.3' },
				},
				'star-twinkle': {
					'0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
					'50%': { opacity: '1', transform: 'scale(1.2)' },
				},
				'pulse-ring': {
					'0%': { transform: 'scale(0.8)', opacity: '1' },
					'100%': { transform: 'scale(2)', opacity: '0' },
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(8px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'slide-in-left': {
					'0%': { opacity: '0', transform: 'translateX(-12px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'orbit': {
					'0%': { transform: 'rotate(0deg) translateX(3px) rotate(0deg)' },
					'100%': { transform: 'rotate(360deg) translateX(3px) rotate(-360deg)' },
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(108, 140, 255, 0.15)' },
					'50%': { boxShadow: '0 0 40px rgba(108, 140, 255, 0.3)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'nebula-drift': 'nebula-drift 20s ease-in-out infinite',
				'star-twinkle': 'star-twinkle 3s ease-in-out infinite',
				'pulse-ring': 'pulse-ring 1.5s ease-out infinite',
				'slide-up': 'slide-up 0.3s ease-out',
				'slide-in-left': 'slide-in-left 0.25s ease-out',
				'fade-in': 'fade-in 0.2s ease-out',
				'orbit': 'orbit 8s linear infinite',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
			},
			backdropBlur: {
				xs: '2px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
