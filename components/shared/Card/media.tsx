import Image from 'next/image';

import { shimmer, toBase64 } from '@/utils/image-loader';
import { Attachment } from '@/types';

export default function Media({ images }: { images: Attachment[] }) {
	if (images.length < 1) return null;

	return (
		<div className='mt-3 inline-flex shrink-0 snap-x items-center gap-2'>
			{images?.map((img) => (
				<Image
					key={img.id}
					width={300}
					placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(300, 300))}`}
					src={img.image_url}
					className=' aspect-auto snap-start rounded-lg border border-main object-cover'
					height={300}
					alt='media'
				/>
			))}
		</div>
	);
}
