import { ErrorMessage, Props as ErrorMessageProps } from '@hookform/error-message';
import { FieldErrors, FieldName, FieldValues } from 'react-hook-form';
import { cn } from '../../utils/cn';
import { FormTextErrorMessage } from './FormTextErrorMessage';

interface FormErrorMessageProps extends ErrorMessageProps<FieldErrors, FieldName<FieldValues>> {
  className?: string;
}

export function FormFieldErrorMessage({ className, ...props }: FormErrorMessageProps) {
  return (
    <ErrorMessage
      {...props}
      render={({ message }) => (
        <FormTextErrorMessage message={message} className={cn('mt-1 text-destructive-500 dark:text-destructive-400', className)} />
      )}
    />
  );
}
