import { Typography } from '../Typography';

interface FormErrorMessageProps {
  message?: string;
}

export function FormErrorMessage({ message }: FormErrorMessageProps) {
  if (!message) return null;

  return (
    <Typography variant="small" className="mt-1 text-red-500 dark:text-red-400">
      {message}
    </Typography>
  );
}
