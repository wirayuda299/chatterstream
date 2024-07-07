import type { getSavedThread } from '@/helper/user';

export type User = {
	id: string;
	username: string;
	image: string;
};

export type Attachment = {
	id: string;
	image_url: string;
	image_asset_id: string;
};

export type SavedThread = Awaited<ReturnType<typeof getSavedThread>>;
