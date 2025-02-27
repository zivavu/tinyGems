'use client';

import { RadioGroup } from '@headlessui/react';
import { IconName, Icons } from '../Icons';

export type SegmentOption<T extends string> = {
  value: T;
  label: string;
  icon?: IconName;
};

interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({ options, value, onChange }: SegmentedControlProps<T>) {
  return (
    <RadioGroup value={value} onChange={onChange} className="flex p-1 bg-background-muted dark:bg-background-muted rounded-2xl">
      {options.map((option) => {
        const Icon = option.icon ? Icons[option.icon] : null;
        const isSelected = value === option.value;

        return (
          <RadioGroup.Option
            key={option.value}
            value={option.value}
            className={`
              relative flex items-center justify-center gap-2 flex-1 p-2 cursor-pointer rounded-xl transition-all duration-150
              ${isSelected ? 'bg-background dark:bg-background-subtle shadow-sm' : 'hover:bg-background/50 dark:hover:bg-background-subtle/50'}
            `}
          >
            {Icon && <Icon className={`w-5 h-5 ${isSelected ? 'text-primary-500' : 'text-text-muted'}`} />}
            <span className={`font-medium ${isSelected ? 'text-text dark:text-text-inverted' : 'text-text-muted'}`}>{option.label}</span>
          </RadioGroup.Option>
        );
      })}
    </RadioGroup>
  );
}
