import Image from 'next/image';
import Link from 'next/link';

import SidebarItem from './sidebar-item';
import { currentUser } from '@clerk/nextjs';
import { shimmer, toBase64 } from '@/utils/image-loader';

export default async function Sidebar() {
	const user = await currentUser();
	return (
		<aside className='fixed bottom-0 z-10 flex max-h-screen w-full max-w-full flex-col items-center justify-between border-t border-gray-500/50 bg-main px-5 py-3 sm:static sm:z-0 sm:min-h-screen sm:max-w-20 sm:border-none sm:bg-transparent sm:p-3'>
			<Link href='/'>
				<Image
					src={'/logo.svg'}
					width={50}
					sizes='50px'
					height={50}
					className='hidden aspect-auto size-16 rounded-full object-contain sm:block'
					alt='logo'
				/>
			</Link>

			<SidebarItem />
			<div className=' flex size-8 items-center justify-center rounded-full hover:bg-main/50'>
				<Link href={`/profile/${user?.id}`}>
					<Image
						src={user?.imageUrl ?? '/logo.svg'}
						width={50}
						height={50}
						alt='user'
						loading='lazy'
						placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(50, 50))}`}
						className='rounded-full  object-contain'
					/>
				</Link>
			</div>
		</aside>
	);
}
