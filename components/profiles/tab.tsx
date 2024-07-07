import { useCallback } from 'react';

import { cn } from '@/lib/utils';

const tabs = ['threads', 'replies', 'saved'] as const;

export default function Tab({
	activeTab,
	selectActiveTab,
}: {
	activeTab: string;
	selectActiveTab: (tab: string) => void;
}) {
	const getIndicatorStyle = useCallback((tab: string) => {
		switch (tab) {
			case 'threads':
				return 'left-[9%] min-[482px]:left-[13%] sm:left-[17%]';
			case 'replies':
				return 'left-[35%] min-[482px]:left-[39%] sm:left-[44%]';
			case 'saved':
				return 'left-[65%] min-[482px]:left-[67%] sm:left-[71%]';
			default:
				return 'left-[9%] min-[482px]:left-[13%] sm:left-[17%]';
		}
	}, []);

	return (
		<div className='relative'>
			<div className='flex h-14 items-center justify-evenly border-b border-gray-500'>
				{tabs.map((tab) => (
					<button
						className={`text-sm capitalize md:text-lg ${
							activeTab === tab ? 'text-white' : 'text-gray-500'
						}`}
						key={tab}
						onClick={() => selectActiveTab(tab)}
					>
						{tab}
					</button>
				))}
			</div>
			<div
				className={cn(
					'w-24 absolute bottom-0 h-[2px] rounded-full bg-white transition-all duration-300',
					getIndicatorStyle(activeTab)
				)}
			></div>
		</div>
	);
}
