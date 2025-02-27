import { cn } from '../../utils/cn';
import { Typography } from '../Typography';

interface FormErrorMessageProps {
  message?: string;
  className?: string;
}

export function FormErrorTypography({ message, className }: FormErrorMessageProps) {
  if (!message) return null;

  return (
    <Typography variant="small" className={cn('mt-1 text-destructive-500 dark:text-destructive-400', className)}>
      {message}
    </Typography>
  );
}
