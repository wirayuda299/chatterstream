'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

const whichRoutes = {
	'/': 'Home',
	'/saved': 'Saved',
} as const;

export default function Menu() {
	const pathname = usePathname();

	if (!(pathname in whichRoutes)) return null;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='flex w-full items-center justify-center gap-2 !border-none p-3 text-center text-lg font-bold !text-white focus-visible:!outline-none'>
				{/* @ts-ignore */}
				{whichRoutes[pathname]} <ChevronDown size={18} />
			</DropdownMenuTrigger>
			<DropdownMenuContent className='flex flex-col gap-2 divide-y divide-main border-none bg-black text-white'>
				<Link href={'/'} className='p-1 text-base'>
					Home
				</Link>
				<Link href={'/saved'} className='p-1 text-base'>
					Saved
				</Link>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
