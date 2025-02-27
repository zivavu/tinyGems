'use client';

import { Typography } from '@/features/shared/components/Typography';
import * as Slider from '@radix-ui/react-slider';
import { useEffect, useState } from 'react';
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
  const [localValues, setLocalValues] = useState<[number, number]>(values);

  useEffect(() => {
    setLocalValues(values);
  }, [values]);

  const handleChange = (newValues: [number, number]) => {
    setLocalValues(newValues);
    onChange(newValues);
  };

  const displayValue = (value: number) => formatValue?.(value) ?? value.toString();
  const displayRange = `${displayValue(localValues[0])} - ${displayValue(localValues[1])}`;

  return (
    <Select title={label} icon={icon} selected={localValues[0] !== min || localValues[1] !== max} count={2}>
      <div className="p-3 space-y-4">
        <div className="flex justify-between items-center">
          <Typography variant="h4" className="text-base">
            {label}
          </Typography>
          <div className="px-2 py-1 text-sm text-primary-500 bg-primary-500/10 rounded">{displayRange}</div>
        </div>

        <div className="px-2">
          <Slider.Root
            className="relative flex items-center w-full h-5 touch-none select-none"
            value={localValues}
            onValueChange={handleChange}
            min={min}
            max={max}
            step={step}
          >
            <Slider.Track className="relative h-1 grow rounded-full bg-background-muted">
              <Slider.Range className="absolute h-full rounded-full bg-primary-500" />
            </Slider.Track>
            {localValues.map((_, index) => (
              <Slider.Thumb
                key={index}
                className="cursor-pointer block h-4 w-4 rounded-full bg-primary-500 hover:bg-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-800"
              />
            ))}
          </Slider.Root>
        </div>

        <div className="flex justify-between px-2">
          <Typography variant="small" className="text-text-muted">
            {displayValue(min)}
          </Typography>
          <Typography variant="small" className="text-text-muted">
            {displayValue(max)}
          </Typography>
        </div>
      </div>
    </Select>
  );
}
