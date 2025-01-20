import NextLink from 'next/link';
import type { ComponentProps } from 'react';
import { Typography } from './Typography';
import { cn } from '../utils/dummy/utils';

type LinkProps = ComponentProps<typeof NextLink> & {
  variant?: ComponentProps<typeof Typography>['variant'];
  className?: string;
};

export function Link({ href, variant = 'p', className, children, ...props }: LinkProps) {
  return (
    <NextLink href={href} className={cn('inline-flex gap-1 items-center', className)} {...props}>
      <Typography variant={variant} className="inherit">
        {children}
      </Typography>
    </NextLink>
  );
}
