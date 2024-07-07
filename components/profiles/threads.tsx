'use client';

import { useCallback, useState } from 'react';
import type { Attachment, Likes, Thread as ThreadType } from '@prisma/client';

import Card from '../shared/Card';
import Tab from './tab';
import type { getSavedThread } from '@/helper/user';
import { SavedThread, User } from '@/types';

type Thread = {
	users: User;
	likes: Likes[];
	attachment: Attachment[];
} & ThreadType;

const NoItem = ({ title }: { title: string }) => {
	return (
		<div className='flex min-h-20 w-full items-center justify-center'>
			<p>{title}</p>
		</div>
	);
};

const renderContent = (
	items: Thread[],
	noItemTitle: string,
	savedThreads: SavedThread
) => {
	if (items.length < 1) {
		return <NoItem title={noItemTitle} />;
	}
	return (
		<div className='divide-y divide-gray-500 divide-opacity-50'>
			{items.map((thread) => (
				<Card
					savedThreads={savedThreads}
					attachment={thread.attachment}
					created_at={thread.created_at!}
					key={thread.id}
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
	);
};

export default function UserThreads({
	threads,
	replies,
	savedThreads,
}: {
	threads: Thread[];
	replies: Thread[];
	savedThreads: Awaited<ReturnType<typeof getSavedThread>>;
}) {
	const [activeTab, setActiveTab] = useState('threads');

	const selectActiveTab = useCallback((tab: string) => setActiveTab(tab), []);

	if (threads.length < 1 && replies.length < 1) return null;

	return (
		<>
			<Tab activeTab={activeTab} selectActiveTab={selectActiveTab} />
			{activeTab === 'threads' &&
				renderContent(threads, 'No threads yet', savedThreads)}
			{activeTab === 'replies' &&
				renderContent(replies, 'No replies yet', savedThreads)}
			{activeTab === 'saved' &&
				(savedThreads.length < 1 ? (
					<NoItem title='No saved threads' />
				) : (
					savedThreads?.map((thread) => (
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
					))
				))}
		</>
	);
}
