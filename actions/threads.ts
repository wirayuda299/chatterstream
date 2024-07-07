'use server';

import { revalidatePath } from 'next/cache';

import { utapi } from '@/lib/utils/utapi';
import type { uploadFiles } from '@/actions/files';
import prisma from '@/prisma';
import type { UploadFileResult } from 'uploadthing/types';

export async function createThread(
	captions: string,
	type: string,
	path: string,
	author: string,
	attachments: ReturnType<typeof uploadFiles> | null,
	parentId?: string
) {
	if (!author) return;

	try {
		const res = await prisma.thread.create({
			data: {
				captions,
				type,
				author,
				...(parentId && { parent_id: parentId }),
			},
		});
		if (attachments && 'errors' in attachments) {
			return {
				errors: 'Failed to upload file',
			};
		}

		if (attachments && Array.isArray(attachments)) {
			const attachmentData = attachments.map(
				(attachment: UploadFileResult) => ({
					image_url: attachment.data?.url as string,
					image_asset_id: attachment.data?.key as string,
					thread_id: res.id,
				})
			);

			await prisma.attachment.createMany({
				data: attachmentData,
			});
		}

		revalidatePath(path);
	} catch (error) {
		return {
			errors: (error as Error).message,
		};
	}
}

export async function likeThread(
	threadId: string,
	userId: string,
	path: string
) {
	try {
		if (!userId) return;

		const thread = await prisma.thread.findFirst({
			where: { id: threadId },
			include: {
				likes: true,
			},
		});
		if (!thread) return;
		const userIds = thread.likes
			.map((like) => like.liked_by)
			.filter(Boolean)
			.flat();
		if (userIds.length < 1 || !userIds.includes(userId)) {
			await prisma.likes.create({
				data: {
					liked_by: userId,
					thread_id: thread.id,
				},
			});
		} else {
			await prisma.likes.delete({
				where: {
					thread_id_liked_by: {
						thread_id: thread.id,
						liked_by: userId,
					},
				},
			});
		}

		revalidatePath(path);
	} catch (error) {
		return (error as Error).message;
	}
}

export async function deleteThread(id: string, pathname: string) {
	try {
		const thread = await prisma.thread.findUnique({
			where: { id },
			include: {
				attachment: true,
			},
		});
		if (!thread)
			return {
				errors: 'Thread not found',
			};

		const attachmentImageAssetIds = thread.attachment
			.map((attachment) => attachment.image_asset_id)
			.filter(Boolean)
			.flat();

		if (attachmentImageAssetIds.length >= 1) {
			const isSuccess = await utapi.deleteFiles(attachmentImageAssetIds);
			if (!isSuccess.success) {
				return {
					errors: 'Failed to delete image',
				};
			}
		}

		await prisma.thread.delete({ where: { id } }).then(() => {
			return {
				success: true,
			};
		});
		revalidatePath(pathname);
	} catch (error) {
		return {
			errors: (error as Error).message,
		};
	}
}

export async function saveOrDeleteThread(
	threadId: string,
	author: string,
	pathname: string
) {
	if (!author || !threadId) return;

	try {
		const isSaved = await prisma.bookmarks.findUnique({
			where: {
				thread_id_author: {
					thread_id: threadId,
					author,
				},
			},
		});
		if (isSaved) {
			await prisma.bookmarks.delete({
				where: {
					thread_id_author: {
						author,
						thread_id: threadId,
					},
				},
			});
		} else {
			await prisma.bookmarks.create({
				data: {
					thread_id: threadId,
					author,
				},
			});
		}
		revalidatePath('/saved');
		revalidatePath(pathname);
	} catch (error) {
		return {
			errors: (error as Error).message,
		};
	}
}
