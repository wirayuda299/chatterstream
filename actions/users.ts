'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/prisma';

export async function createUser(
	email: string,
	image: string,
	username: string,
	id: string
) {
	try {
		return await prisma.user.create({
			data: {
				username,
				email,
				id,
				image,
				bio: '',
			},
		});
	} catch (error) {
		throw error;
	}
}

export async function updateUser(
	id: string,
	bio: string,
	link: string,
	pathname: string
) {
	try {
		await prisma.user.update({
			where: { id },
			data: { bio, link },
		});
		revalidatePath(pathname);
	} catch (error) {
		throw error;
	}
}

export async function followUnfollow(
	userToFollow: string,
	currentUser: string,
	path: string
) {
	try {
		const isFollowing = await prisma.user.findFirst({
			where: {
				following: {
					some: {
						id: userToFollow,
					},
				},
			},
		});

		if (isFollowing) {
			await prisma.user.update({
				where: { id: currentUser },
				data: {
					following: {
						disconnect: { id: userToFollow },
					},
				},
			});
		} else {
			await prisma.user.update({
				where: { id: currentUser },
				data: {
					following: {
						connect: { id: userToFollow },
					},
				},
			});
		}

		revalidatePath(path);
	} catch (error) {
		console.error(error);
		return {
			errors: (error as Error).message,
		};
	}
}

export async function searchUser(username: string) {
	try {
		const results = await prisma.user.findMany({
			where: {
				username: {
					search: username,
				},
			},
			orderBy: {
				_relevance: {
					fields: 'username',
					sort: 'asc',
					search: username,
				},
			},
			include: {
				followers: true,
			},
		});
		return results;
	} catch (error) {
		throw error;
	}
}
