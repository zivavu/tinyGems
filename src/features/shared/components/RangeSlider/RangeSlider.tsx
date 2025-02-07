'use client';

import { Typography } from '@/features/shared/components/Typography';
import * as Slider from '@radix-ui/react-slider';
import { useCallback } from 'react';
import { IconName } from '../Icons';
import { Select } from '../Select';

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  values: [number, number];
  onChange: (values: [number, number]) => void;
  label: string;
  icon?: IconName;
  formatValue?: (value: number) => string;
}

export function RangeSlider({ min, max, step, values, onChange, label, icon, formatValue }: RangeSliderProps) {
  const displayValue = useCallback((value: number) => formatValue?.(value) ?? value.toString(), [formatValue]);
  const displayRange = `${displayValue(values[0])} - ${displayValue(values[1])}`;

  return (
    <Select title={label} icon={icon} selected={values[0] !== min || values[1] !== max} count={2} description={displayRange}>
      <div className="p-3 space-y-4">
        <div className="flex justify-between items-center">
          <Typography variant="h4" className="text-base">
            {label}
          </Typography>
          <div className="px-2 py-1 text-sm text-rose-400 bg-rose-400/10 rounded">{displayRange}</div>
        </div>

        <div className="px-2">
          <Slider.Root
            className="relative flex items-center w-full h-5 touch-none select-none"
            value={values}
            onValueChange={onChange}
            min={min}
            max={max}
            step={step}
          >
            <Slider.Track className="relative h-1 grow rounded-full bg-gray-700">
              <Slider.Range className="absolute h-full rounded-full bg-rose-500" />
            </Slider.Track>
            {values.map((_, index) => (
              <Slider.Thumb
                key={index}
                className="block h-4 w-4 rounded-full bg-rose-500 hover:bg-rose-400 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              />
            ))}
          </Slider.Root>
        </div>

        <div className="flex justify-between px-2">
          <Typography variant="small" className="text-gray-500">
            {displayValue(min)}
          </Typography>
          <Typography variant="small" className="text-gray-500">
            {displayValue(max)}
          </Typography>
        </div>
      </div>
    </Select>
  );
}
