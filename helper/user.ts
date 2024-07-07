import prisma from '@/prisma';

export async function getUser(userId: string) {
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: {
				threads: {
					include: {
						users: {
							select: {
								id: true,
								username: true,
								image: true,
							},
						},
						attachment: true,
						likes: true,
					},
					where: {
						parent_id: null,
					},
				},
				followers: true,
				following: true,
			},
		});
		return user;
	} catch (error) {
		throw error;
	}
}

export async function getUserReplies(userId: string) {
	try {
		const replies = await prisma.thread.findMany({
			where: {
				author: userId,
				parent_id: {
					not: null,
				},
			},
			include: {
				users: {
					select: {
						id: true,
						username: true,
						image: true,
					},
				},
				attachment: true,
				likes: true,
			},
		});

		return replies;
	} catch (error) {
		throw error;
	}
}

export async function getUserFollowers(id: string) {
	if (!id) return [];
	try {
		const followers = await prisma.user.findUnique({
			where: { id },
			include: {
				followers: true,
			},
		});
		return followers?.followers;
	} catch (error) {
		throw error;
	}
}

export async function showUnFollowedUser(userId: string, page: number = 1) {
	try {
		const currentUser = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				following: {
					select: {
						id: true,
					},
				},
			},
		});
		const followingIds = currentUser?.following.map(
			(following) => following.id
		);

		const [followers, totalUsers] = await Promise.all([
			prisma.user.findMany({
				where: {
					id: {
						notIn: followingIds,
					},
				},
				select: {
					id: true,
					username: true,
					image: true,
					followers: true,
				},
				take: 10,
				skip: (page - 1) * 10,
			}),
			prisma.user.count({
				where: {
					id: {
						notIn: followingIds,
					},
				},
			}),
		]);
		const results = followers.filter((user) => user.id !== userId);
		const totalPages = Math.ceil(totalUsers / 10);

		return { results, totalPages };
	} catch (error) {
		throw error;
	}
}

export async function getSavedThread(userId: string) {
	try {
		const res = await prisma.bookmarks.findMany({
			where: {
				author: userId,
			},
			include: {
				users: {
					select: {
						id: true,
						username: true,
						image: true,
					},
				},
				thread: {
					select: {
						likes: {
							select: {
								liked_by: true,
							},
						},
						attachment: {
							select: {
								id: true,
								image_asset_id: true,
								image_url: true,
							},
						},
						captions: true,
						created_at: true,
						id: true,
						users: {
							select: {
								id: true,
								username: true,
								image: true,
							},
						},
					},
				},
			},
		});
		return res;
	} catch (error) {
		throw error;
	}
}
