'use client';

import { toast } from 'sonner';
import { useMemo, useState } from 'react';
import type { User } from '@prisma/client';

import { followUnfollow } from '@/actions/users';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

type Props = {
	userToFollow: string;
	userId: string;
	followers: User[];
	style?: string;
};

export default function FollowButton({
	userToFollow,
	userId,
	followers,
	style,
}: Props) {
	const [loading, setIsLoading] = useState(false);
	const pathname = usePathname();
	const isFollowedByUser = useMemo(
		() => followers.map((follower) => follower.id).includes(userId),
		[followers, userId]
	);

	const handleFollowUnfollow = async () => {
		try {
			setIsLoading(true);
			await followUnfollow(userToFollow, userId, pathname);
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			disabled={loading}
			onClick={(e) => {
				e.stopPropagation();
				handleFollowUnfollow();
			}}
			className={cn('w-full bg-white text-black disabled:bg-white/65', style)}
		>
			{isFollowedByUser ? 'Unfollow' : 'Follow'}
		</Button>
	);
}
