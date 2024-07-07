import type { ReactNode } from 'react';
import Menu from '@/components/menu';

import Sidebar from '@/components/shared/sidebar';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<div className=' mx-auto size-full max-h-max max-w-[1470px] overflow-hidden text-white'>
			<section className='flex  max-h-screen min-h-screen  w-full justify-center'>
				<Sidebar />
				<main className='mx-auto w-full max-w-screen-md p-2 md:p-5 '>
					<Menu />

					{children}
				</main>
			</section>
		</div>
	);
}
