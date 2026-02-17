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
				cyber: ['Orbitron', 'sans-serif'],
				body: ['Roboto', 'sans-serif'],
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
				neon: {
					cyan: '#00f0ff',
					pink: '#ff00ea',
					purple: '#b400ff',
					green: '#39ff14',
					yellow: '#ffe600',
					red: '#ff003c',
				},
				cyber: {
					dark: '#0a0a0f',
					darker: '#06060a',
					panel: '#12121a',
					hover: '#1a1a2e',
					border: '#1e1e3a',
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
				'glitch-1': {
					'0%, 100%': { clipPath: 'inset(0 0 0 0)', transform: 'translate(0)' },
					'20%': { clipPath: 'inset(20% 0 60% 0)', transform: 'translate(-3px, 3px)' },
					'40%': { clipPath: 'inset(40% 0 40% 0)', transform: 'translate(3px, -3px)' },
					'60%': { clipPath: 'inset(60% 0 20% 0)', transform: 'translate(-2px, 2px)' },
					'80%': { clipPath: 'inset(80% 0 5% 0)', transform: 'translate(2px, -2px)' },
				},
				'glitch-2': {
					'0%, 100%': { clipPath: 'inset(0 0 0 0)', transform: 'translate(0)' },
					'20%': { clipPath: 'inset(60% 0 10% 0)', transform: 'translate(3px, -3px)' },
					'40%': { clipPath: 'inset(10% 0 70% 0)', transform: 'translate(-3px, 3px)' },
					'60%': { clipPath: 'inset(50% 0 30% 0)', transform: 'translate(2px, -2px)' },
					'80%': { clipPath: 'inset(30% 0 50% 0)', transform: 'translate(-2px, 2px)' },
				},
				'neon-pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				},
				'scan-line': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100vh)' },
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'slide-in-right': {
					'0%': { opacity: '0', transform: 'translateX(20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glitch-1': 'glitch-1 0.3s ease-in-out',
				'glitch-2': 'glitch-2 0.3s ease-in-out 0.1s',
				'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
				'scan-line': 'scan-line 8s linear infinite',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'float': 'float 3s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
