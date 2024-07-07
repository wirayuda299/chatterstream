'use client';

import { useAuth } from '@clerk/nextjs';
import { Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import { likeThread } from '@/actions/threads';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const CreateThreadForm = dynamic(() => import('@/components/create-thread'));

type Props = {
	threadId: string;
	likes: {
		liked_by: string;
	}[];
	threadAuthor?: string;
};

export default function ActionButton({ threadId, likes, threadAuthor }: Props) {
	const { userId } = useAuth();
	const pathname = usePathname();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const isLikeByCurrentUser = useMemo(
		() => likes.map((like) => like.liked_by).includes(userId!),
		[likes, userId]
	);

	const handleLike = async () => {
		try {
			setIsLoading(true);
			await likeThread(threadId, userId!, pathname);
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='mt-2 flex items-center gap-3'>
			<button
				disabled={isLoading}
				aria-disabled={isLoading}
				onClick={handleLike}
				className='size-10 rounded-full hover:bg-main hover:brightness-125'
				title={isLikeByCurrentUser ? 'Dislike' : 'Like'}
				name={isLikeByCurrentUser ? 'Dislike' : 'Like'}
				aria-label={isLikeByCurrentUser ? 'Dislike' : 'Like'}
			>
				<Heart
					className={cn(
						'mx-auto',
						isLikeByCurrentUser ? 'fill-red-600 text-red-600' : 'text-gray-500'
					)}
					size={25}
				/>
			</button>
			{pathname !== `/thread/${threadId}` ? (
				<Link
					href={`/thread/${threadId}`}
					className='flex size-10 items-center rounded-full  hover:bg-main hover:brightness-125'
				>
					<MessageCircle size={25} className='mx-auto text-gray-500' />
				</Link>
			) : (
				<CreateThreadForm
					placeholder={`Reply tp ${threadAuthor}`}
					parentId={threadId}
					styles='static border-none w-auto'
				>
					<MessageCircle size={25} className='mx-auto text-gray-500' />
				</CreateThreadForm>
			)}
		</div>
	);
}
