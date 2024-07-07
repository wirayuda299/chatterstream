import { auth } from '@clerk/nextjs';

import { getUserFollowers, showUnFollowedUser } from '@/helper/user';
import SearchForm from '@/components/search/form';
import Pagination from '@/components/shared/Pagination';

export default async function SearchPage({
	searchParams,
}: {
	searchParams: { page: number };
}) {
	const { userId } = auth();
	const page = searchParams.page ? +searchParams.page : 1;

	const [{ results, totalPages }, followers] = await Promise.all([
		showUnFollowedUser(userId!, page),
		getUserFollowers(userId!),
	]);
	return (
		<div className='h-full max-h-dvh min-h-dvh pb-40 sm:max-h-screen sm:min-h-screen '>
			<h3 className='p-3 text-center text-lg font-bold'>Search</h3>
			<SearchForm
				followers={followers || []}
				userId={userId!}
				defaultValues={results}
			/>
			<Pagination totalPage={totalPages} />
		</div>
	);
}
