import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import ActionButton from './ActionButtons';
import { shimmer, toBase64 } from '@/utils/image-loader';
import Menu, { SavedThread } from './menu';
import { Attachment, User, SavedThread as SavedThreadDetail } from '@/types';
const Media = dynamic(() => import('./media'));

type Props = {
	captions: string;
	user: User;
	id: string;
	likes: {
		liked_by: string;
	}[];
	created_at: Date;
	attachment: Attachment[];
	savedThreads: SavedThread[] | SavedThreadDetail;
};

export default function Card({
	captions,
	user,
	id,
	likes,
	created_at,
	attachment,
	savedThreads,
}: Props) {
	return (
		<article className='flex w-full gap-4 p-3'>
			<Image
				src={user.image}
				width={45}
				height={45}
				alt='author'
				placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
				className='hidden aspect-auto size-11 min-w-11 rounded-full object-cover sm:block'
			/>

			<div className='w-full overflow-x-auto'>
				<header className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<Image
							src={user.image}
							width={45}
							height={45}
							alt='author'
							placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
							className='block aspect-auto size-11 min-w-11 rounded-full object-cover sm:hidden'
						/>
						<Link
							href={`/profile/${user.id}`}
							className='flex items-center gap-3'
						>
							<h2 className='text-lg font-semibold'>{user.username}</h2>
							<span className='text-xs text-gray-500'>
								{created_at?.toDateString()}
							</span>
						</Link>
					</div>

					<Menu author={user.id} threadId={id} savedThreads={savedThreads} />
				</header>
				<p className='pt-2 text-sm'>{captions}</p>
				{attachment.length >= 1 && (
					<div className=' max-w-fit overflow-x-auto'>
						<Media images={attachment} />
					</div>
				)}

				<ActionButton
					threadId={id}
					likes={likes}
					threadAuthor={user.username}
				/>
			</div>
		</article>
	);
}
