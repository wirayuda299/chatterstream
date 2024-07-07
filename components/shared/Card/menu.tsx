'use client';

import Image from 'next/image';
import { useAuth } from '@clerk/nextjs';
import { Link as Chain, Bookmark, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { deleteThread, saveOrDeleteThread } from '@/actions/threads';
import type { getSavedThread } from '@/helper/user';

export type SavedThread = {
	thread_id: string;
	author: string;
};

export function copyText(text: string, message: string) {
	navigator.clipboard.writeText(text).then(() => toast.success(message));
}

export default function Menu({
	author,
	threadId,
	savedThreads,
}: {
	author: string;
	threadId: string;
	savedThreads: SavedThread[] | typeof getSavedThread;
}) {
	const { userId } = useAuth();
	const pathname = usePathname();
	const [loading, setLoading] = useState<boolean>(false);

	const isSaved = useMemo(
		() =>
			(savedThreads as SavedThread[])
				.map((thread) => thread.thread_id)
				.includes(threadId),
		[savedThreads, threadId]
	);

	const handleDeleteThread = async () => {
		try {
			setLoading(true);
			const res = await deleteThread(threadId, pathname);
			if (res?.errors) {
				toast.error(res.errors);
			} else {
				toast.success('Thread has been deleted');
			}
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			setLoading(false);
		}
	};

	const handleSaveOrDeleteThread = async () => {
		try {
			const res = await saveOrDeleteThread(threadId, userId!, pathname);
			if (res && res?.errors) {
				toast.error(res.errors);
			}
		} catch (error) {
			toast.error((error as Error).message);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Image src={'/assets/ellipsis.svg'} width={20} height={20} alt='menu' />
			</DropdownMenuTrigger>
			<DropdownMenuContent className='space-y-2 border-none bg-black text-white'>
				<DropdownMenuItem
					onClick={handleSaveOrDeleteThread}
					className='flex items-center justify-between !text-white hover:!bg-main/50'
				>
					<span>{isSaved ? 'Saved' : 'Save'}</span>
					<Bookmark size={18} className={isSaved ? 'fill-white' : ''} />
				</DropdownMenuItem>

				{userId === author && (
					<Dialog>
						<DialogTrigger className='flex w-full items-center justify-between  rounded px-2 py-1 text-sm text-red-600 hover:!bg-red-600 hover:!text-white'>
							<span>Delete</span>
							<Trash size={18} />
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle className='text-white'>
									Are you sure want to delete this thread?
								</DialogTitle>
							</DialogHeader>
							<DialogDescription>
								Remember!! This action cannot be undo, your thread including
								likes, comment and attachment will permanently deleted.
							</DialogDescription>
							<div className='flex items-center gap-2'>
								<DialogClose className='w-full text-white'>Cancel</DialogClose>
								<Button
									disabled={loading}
									onClick={handleDeleteThread}
									className='w-full bg-red-600 !text-white hover:bg-red-700'
								>
									Delete
								</Button>
							</div>
						</DialogContent>
					</Dialog>
				)}
				<button
					onClick={() =>
						copyText(`/thread/${threadId}`, 'Link has been copied')
					}
					className='flex w-full items-center justify-between rounded px-2 py-1.5 text-sm !text-white hover:!bg-main/50'
				>
					<span>Copy link</span>
					<Chain size={18} color='#949494' />
				</button>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
