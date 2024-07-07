import prisma from '@/prisma';

export async function getThreads(page: number = 1) {
	try {
		const [threads, totalPosts] = await prisma.$transaction([
			prisma?.thread.findMany({
				orderBy: {
					created_at: 'desc',
				},

				take: 10,
				skip: (page - 1) * 10,
				include: {
					users: {
						select: {
							id: true,
							username: true,
							image: true,
						},
					},
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
				},
				where: {
					parent_id: null,
				},
			}),
			prisma.thread.count(),
		]);

		const totalPages = Math.ceil(totalPosts / 10);
		return { threads, totalPages };
	} catch (error) {
		throw error;
	}
}

export const getThreadById = async (id: string) => {
	try {
		const thread = await prisma.thread.findUnique({
			where: { id },
			include: {
				users: {
					select: {
						id: true,
						username: true,
						image: true,
					},
				},
				likes: true,
				attachment: true,
			},
		});
		return thread;
	} catch (error) {
		throw error;
	}
};

export async function getThreadComments(id: string) {
	try {
		const comments = await prisma.thread.findMany({
			where: {
				parent_id: id,
			},
			orderBy: {
				created_at: 'desc',
			},
			include: {
				users: {
					select: {
						id: true,
						username: true,
						image: true,
					},
				},
				likes: true,
				attachment: true,
			},
		});
		return comments;
	} catch (error) {
		throw error;
	}
}
