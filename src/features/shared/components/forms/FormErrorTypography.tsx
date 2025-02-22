import { cn } from '../../utils/cn';
import { Typography } from '../Typography';

interface FormErrorMessageProps {
  message?: string;
  className?: string;
}

export function FormErrorTypography({ message, className }: FormErrorMessageProps) {
  if (!message) return null;

  return (
    <Typography variant="small" className={cn('mt-1 text-red-500 dark:text-red-400', className)}>
      {message}
    </Typography>
  );
}
