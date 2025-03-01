import { cn } from '../../utils/cn';
import { Typography } from '../Typography';

interface FormErrorMessageProps {
  message: string | undefined;
  className?: string;
}

export function FormTextErrorMessage({ className, message }: FormErrorMessageProps) {
  return (
    <Typography variant="small" className={cn('mt-1 text-destructive-500 dark:text-destructive-400', className)}>
      {message}
    </Typography>
  );
}
