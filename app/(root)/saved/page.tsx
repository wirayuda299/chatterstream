import { auth } from '@clerk/nextjs';

import Card from '@/components/shared/Card';
import { getSavedThread } from '@/helper/user';

export default async function Saved() {
	const { userId } = auth();

	const savedThreads = await getSavedThread(userId!);

	return (
		<div className='no-scrollbar flex max-h-dvh  min-h-dvh flex-col items-center overflow-y-auto pb-20 md:max-h-screen md:min-h-screen'>
			<section className=' size-full divide-y divide-gray-500 divide-opacity-50 bg-main  sm:rounded-2xl'>
				{savedThreads?.map((thread) => (
					<Card
						savedThreads={savedThreads}
						likes={thread.thread.likes}
						attachment={thread.thread.attachment}
						created_at={thread.thread.created_at!}
						key={thread.thread_id}
						captions={thread.thread.captions ?? ''}
						id={thread.thread_id}
						user={{
							username: thread.users.username,
							id: thread.users.id,
							image: thread.users.image,
						}}
					/>
				))}
			</section>
		</div>
	);
}
