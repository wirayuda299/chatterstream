import { auth } from '@clerk/nextjs';
import { notFound } from 'next/navigation';

import BackButton from '@/components/back-button';
import Card from '@/components/shared/Card';
import { getThreadById, getThreadComments } from '@/helper/threads';
import { getSavedThread } from '@/helper/user';

type Props = {
	params: { id: string };
};

export default async function ThreadDetail({ params: { id } }: Props) {
	const { userId } = auth();

	const thread = await getThreadById(id);
	if (!thread) return notFound();

	const [comments, savedThreads] = await Promise.all([
		getThreadComments(thread?.id),
		getSavedThread(userId!),
	]);

	return (
		<div className='no-scrollbar flex max-h-screen min-h-screen flex-col items-center overflow-y-auto pb-20'>
			<BackButton />
			<section className='no-scrollbar w-full divide-y divide-gray-500 divide-opacity-50 rounded-2xl bg-main'>
				<Card
					savedThreads={savedThreads}
					attachment={thread.attachment}
					created_at={thread.created_at!}
					captions={thread.captions ?? ''}
					likes={thread.likes}
					id={thread.id}
					user={{
						username: thread.users.username,
						id: thread.users.id,
						image: thread.users.image,
					}}
				/>
				{comments.length >= 1 && (
					<div>
						<h3 className='border-b border-gray-500/50 p-3 text-lg font-semibold'>
							Replies
						</h3>
						<div className='divide-y divide-gray-500 divide-opacity-50'>
							{comments?.map((thread) => (
								<Card
									savedThreads={savedThreads}
									key={thread.id}
									attachment={thread.attachment}
									created_at={thread.created_at!}
									captions={thread.captions ?? ''}
									likes={thread.likes}
									id={thread.id}
									user={{
										username: thread.users.username,
										id: thread.users.id,
										image: thread.users.image,
									}}
								/>
							))}
						</div>
					</div>
				)}
			</section>
		</div>
	);
}
