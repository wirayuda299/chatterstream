'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname } from 'next/navigation';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { ReactNode, useCallback, useState } from 'react';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { createThread } from '@/actions/threads';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import ImageUpload from './image-upload';
import { uploadFiles } from '@/actions/files';
import { cn } from '@/lib/utils';
import { shimmer, toBase64 } from '@/utils/image-loader';

const formSchema = z.object({
	caption: z.string().min(1, 'Please add caption'),
});

type Props = {
	children: ReactNode;
	placeholder: string;
	parentId?: string;
	styles?: string;
};

export default function ThreadForm({
	placeholder,
	children,
	parentId,
	styles,
}: Props) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { caption: '' },
	});
	let res: ReturnType<typeof uploadFiles> | null = null;

	const [files, setFiles] = useState<File[]>([]);
	const pathname = usePathname();
	const [imagePreviews, setImagePreviews] = useState<string[]>([]);

	const { user } = useUser();
	const isSubmitting = form.formState.isSubmitting;
	const isSubmitted = form.formState.isSubmitted;
	const isValid = form.formState.isValid;

	const reset = useCallback(() => {
		form.reset();
		setFiles([]);
		setImagePreviews([]);
	}, [form]);

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			if (files.length >= 1) {
				const formData = new FormData();

				files.forEach((file) => formData.append('files', file));
				res = (await uploadFiles(formData)) as unknown as ReturnType<
					typeof uploadFiles
				>;
			}
			const response = await createThread(
				data.caption,
				'thread',
				pathname,
				user?.id!!,
				res,
				parentId
			);

			if (response !== undefined && 'errors' in response) {
				toast.error(response?.errors);
			} else {
				toast.success('Thread has been created');
			}
		} catch (e) {
			toast.error((e as Error).message);
		} finally {
			reset();
		}
	};

	const storeFiles = useCallback((data: File[]) => setFiles(data), []);
	const storeImagePreview = useCallback(
		(res: string[]) => setImagePreviews(res),
		[]
	);

	return (
		<Dialog
			onOpenChange={(isOpen) => {
				if (!isOpen) {
					reset();
				}
			}}
		>
			<DialogTrigger
				className={cn(
					'md:size-14 size-10 fixed bottom-40 sm:bottom-3 right-3 bg-main border border-gray-500 rounded-md flex justify-center items-center',
					styles
				)}
			>
				{children}
			</DialogTrigger>
			<DialogContent className='flex border-gray-500 bg-main '>
				<div className='flex flex-col items-center'>
					<Image
						src={user?.imageUrl ?? ''}
						width={35}
						height={35}
						loading='lazy'
						placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(25, 25))}`}
						alt='user'
						className='aspect-auto size-10 min-h-10 min-w-10 rounded-full object-cover'
					/>
					<div className='h-full w-px bg-gradient-to-b from-gray-500'></div>
					<Image
						src={user?.imageUrl ?? ''}
						width={25}
						height={25}
						alt='user'
						loading='lazy'
						placeholder='blur'
						blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(25, 25))}`}
						className='aspect-auto size-6 min-h-6 min-w-6 rounded-full object-cover opacity-50'
					/>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
						<p className='font-semibold text-white'>{user?.username}</p>
						<FormField
							control={form.control}
							name='caption'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											className='h-5 border-none bg-transparent pl-0 ring-0'
											{...field}
											placeholder={placeholder}
										/>
									</FormControl>
									<FormMessage className='text-xs font-normal' />
								</FormItem>
							)}
						/>
						<div className='flex items-center gap-2 pt-2'>
							<ImageUpload
								storeFiles={storeFiles}
								storeImagePreview={storeImagePreview}
							/>
						</div>
						{imagePreviews.length >= 1 && (
							<div className='max-w-[500px] snap-x snap-mandatory overflow-x-auto'>
								{imagePreviews.length >= 1 && (
									<div className='mt-2 inline-flex w-full max-w-min snap-x gap-2 overflow-x-auto'>
										{imagePreviews.map((img, i) => (
											<Image
												key={img}
												width={300}
												sizes='300px'
												src={img}
												loading='lazy'
												placeholder='blur'
												blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(300, 300))}`}
												className='aspect-auto size-60  min-w-60 snap-start rounded-lg border border-gray-500 object-cover'
												height={300}
												alt='media'
											/>
										))}
									</div>
								)}
							</div>
						)}
						<div className='flex w-full items-center justify-between pt-8 text-gray-500'>
							<p>Anyone can reply or quote</p>
							{isSubmitted ? (
								<DialogClose className='h-8 min-w-14 rounded-lg border border-gray-500 shadow shadow-main disabled:cursor-not-allowed'>
									Close
								</DialogClose>
							) : (
								<button
									disabled={isSubmitting || !isValid}
									className='h-8 min-w-14 rounded-lg border border-gray-500 shadow shadow-main disabled:cursor-not-allowed'
								>
									{isSubmitting ? (
										<Loader className='mx-auto animate-spin' />
									) : (
										'Post'
									)}
								</button>
							)}
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
