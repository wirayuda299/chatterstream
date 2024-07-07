import dynamic from 'next/dynamic';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import BackButton from '@/components/back-button';
import { getSavedThread, getUser, getUserReplies } from '@/helper/user';
import { shimmer, toBase64 } from '@/utils/image-loader';
const EditProfile = dynamic(
	() => import('@/components/profiles/edit-profile'),
	{
		ssr: false,
	}
);
const FollowButton = dynamic(
	() => import('@/components/shared/follow-button'),
	{ ssr: false }
);
const UserThreads = dynamic(() => import('@/components/profiles/threads'));
const FollowerList = dynamic(
	() => import('@/components/profiles/follower-list')
);

type Props = {
	params: {
		id: string;
	};
};

export default async function Profile({ params }: Props) {
	const { userId } = auth();
	if (!userId) return null;

	const [user, replies, savedThreads] = await Promise.all([
		getUser(params.id),
		getUserReplies(params.id),
		getSavedThread(userId!),
	]);
	if (!user) return notFound();

	const threads = user.threads || [];
	const followers = user.followers;
	const following = user.following;

	return (
		<main className='no-scrollbar max-h-screen min-h-screen overflow-y-auto pb-20'>
			<BackButton styles='mb-0' />
			<div className=' size-full min-h-full  bg-main  sm:rounded-2xl'>
				<header className='flex min-h-36 items-center justify-between p-5'>
					<div className='flex min-h-32 flex-col justify-between'>
						<div>
							<h2 className='text-2xl font-extrabold capitalize'>
								{user?.username}
							</h2>
							<p>{user.username}</p>
						</div>
						<div>
							<p>{user.bio}</p>
							<div className='flex flex-wrap items-center gap-2'>
								<FollowerList
									followers={followers}
									following={following}
									currentUser={userId}
								/>
								{user.link && (
									<a
										title={user.link}
										aria-label={user.link}
										href={user.link}
										target='_blank'
										className='text-sm text-blue-500'
									>
										{user.link}
									</a>
								)}
							</div>
						</div>
					</div>

					<Image
						placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
						src={user.image}
						width={100}
						height={100}
						alt='user'
						className='size-24 rounded-full object-cover'
					/>
				</header>
				<div className='px-5'>
					{userId === user.id ? (
						<EditProfile user={user} />
					) : (
						<FollowButton
							style='!bg-white !text-black '
							userToFollow={params.id}
							userId={userId}
							followers={followers}
						/>
					)}
				</div>
				<UserThreads
					threads={threads}
					replies={replies}
					savedThreads={savedThreads}
				/>
			</div>
		</main>
	);
}
