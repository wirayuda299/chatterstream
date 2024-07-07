import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Roboto } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const roboto = Roboto({
	display: 'swap',
	subsets: ['latin'],
	weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
	metadataBase: new URL(process.env.SITE_URL!),
	title: {
		template: '%s  |  ChatterStream',
		default: 'ChatterStream',
		absolute: '',
	},
	openGraph: {
		title: 'ChatterStream',
		description: 'ChatterStream build with NextJS 14',
		url: process.env.SITE_URL!,
		siteName: 'ChatterStream',
	},
	alternates: {
		canonical: process.env.SITE_URL!,
	},
	description: 'ChatterStream with Nextjs 14',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={'size-full bg-[#0a0a0a] ' + roboto.className}>
					{children}
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
