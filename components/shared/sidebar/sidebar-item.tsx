'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

export default function SidebarItem() {
	const pathname = usePathname();

	return (
		<ul className='flex w-full items-center justify-between gap-5 sm:flex-col sm:justify-center'>
			{sidebarLinks?.map((link) => {
				const Icon = link.icon;
				return (
					<li
						key={link.label}
						className='flex size-10 items-center justify-center rounded-full hover:bg-main/50 md:size-12'
					>
						<Link href={link.path} aria-label={link.label}>
							<Icon
								className={cn(
									pathname === link.path ? 'text-white' : 'text-gray-500'
								)}
							/>
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
