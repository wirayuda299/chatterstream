import { Plus } from 'lucide-react';

import { getThreads } from '@/helper/threads';
import Card from '@/components/shared/Card';
import Pagination from '@/components/shared/Pagination';
import CreateThreadForm from '@/components/create-thread';
import { getSavedThread } from '@/helper/user';
import { auth } from '@clerk/nextjs';

type Params = {
	searchParams: {
		page: string;
	};
};

export const metadata = {
	title: 'Home',
};

export default async function Home({ searchParams }: Params) {
	const page = searchParams.page ? +searchParams.page : 1;
	const { userId } = auth();
	const [{ threads, totalPages }, savedThreads] = await Promise.all([
		getThreads(page),
		getSavedThread(userId!),
	]);

	return (
		<div className='no-scrollbar flex max-h-dvh  min-h-dvh flex-col items-center overflow-y-auto pb-20 md:max-h-screen md:min-h-screen'>
			<section className=' size-full divide-y divide-gray-500 divide-opacity-50 bg-main  sm:rounded-2xl'>
				{threads?.map((thread) => (
					<Card
						savedThreads={savedThreads}
						likes={thread.likes}
						attachment={thread.attachment}
						created_at={thread.created_at!}
						key={thread.id}
						captions={thread.captions ?? ''}
						id={thread.id}
						user={{
							username: thread.users.username,
							id: thread.users.id,
							image: thread.users.image,
						}}
					/>
				))}
			</section>
			<Pagination totalPage={totalPages} />
			<CreateThreadForm placeholder='Start a thread...'>
				<Plus size={25} />
			</CreateThreadForm>
		</div>
	);
}
