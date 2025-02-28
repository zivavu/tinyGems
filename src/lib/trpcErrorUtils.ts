import { TRPCClientError } from '@trpc/client';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

/**
 * A simple utility to handle tRPC errors with React Hook Form
 * Maps zod validation errors directly to form fields
 */
export function handleTRPCError<T extends FieldValues>(error: unknown, setError: UseFormSetError<T>): void {
  if (!(error instanceof TRPCClientError)) {
    setError('root' as Path<T>, { message: 'An unexpected error occurred' });
    return;
  }

  try {
    // Parse the error message
    const errors = JSON.parse(error.message);

    // Check if we have an array of errors (typical zod validation errors)
    if (Array.isArray(errors)) {
      let hasSetFieldError = false;

      // Process each error
      for (const err of errors) {
        // If we have a path, use it to set a field-specific error
        if (err.path?.length) {
          const fieldName = err.path[0] as Path<T>;
          setError(fieldName, { message: err.message });
          hasSetFieldError = true;
        }
      }

      // If no field-specific errors were set, set a root error with the first message
      if (!hasSetFieldError && errors[0]?.message) {
        setError('root' as Path<T>, { message: errors[0].message });
      }
    } else {
      // Not an array, just set the root error
      setError('root' as Path<T>, { message: error.message });
    }
  } catch {
    // If parsing fails, use the raw message
    setError('root' as Path<T>, { message: error.message });
  }
}

/**
 * A hook that provides a simple method to handle tRPC query errors
 */
export function useTRPCErrorHandler() {
  /**
   * Handles errors from tRPC query results
   * Returns true if an error was handled, false otherwise
   */
  function handleQueryError<T extends FieldValues>(result: { isError?: boolean; error?: unknown }, setError: UseFormSetError<T>): boolean {
    if (result?.isError && result?.error) {
      handleTRPCError(result.error, setError);
      return true;
    }
    return false;
  }

  return { handleQueryError };
}
