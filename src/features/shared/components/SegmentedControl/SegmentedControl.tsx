'use client';

import { ContentType } from '@/features/gems/components/FiltersInputBar/hooks';
import { RadioGroup } from '@headlessui/react';
import { IconName, Icons } from '../Icons';

export type SegmentOption = {
  id: string;
  label: string;
  icon: IconName;
};

interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: ContentType) => void;
}

export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  return (
    <RadioGroup value={value} onChange={onChange} className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl">
      {options.map((option) => {
        const Icon = Icons[option.icon];
        const isSelected = value === option.id;

        return (
          <RadioGroup.Option
            key={option.id}
            value={option.id}
            className={`
              ${isSelected ? 'bg-white dark:bg-gray-900 shadow-sm' : 'hover:bg-white/50 dark:hover:bg-gray-900/50'} 
              relative flex items-center gap-2 px-4 py-2 cursor-pointer rounded-xl transition-all
            `}
          >
            <Icon className={`w-5 h-5 ${isSelected ? 'text-rose-500' : 'text-gray-500'}`} />
            <span className={`font-medium ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>{option.label}</span>
          </RadioGroup.Option>
        );
      })}
    </RadioGroup>
  );
}
