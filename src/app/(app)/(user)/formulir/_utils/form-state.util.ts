import { useState } from 'react';
import { toast } from 'sonner';

export interface FormState {
  isLoading: boolean;
  isSubmitting: boolean;
  loadError: string | null;
  hasExistingData: boolean;
}

export function useFormState() {
  const [state, setState] = useState<FormState>({
    isLoading: true,
    isSubmitting: false,
    loadError: null,
    hasExistingData: false,
  });

  const setLoading = (isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  };

  const setSubmitting = (isSubmitting: boolean) => {
    setState((prev) => ({ ...prev, isSubmitting }));
  };

  const setLoadError = (loadError: string | null) => {
    setState((prev) => ({ ...prev, loadError }));
  };

  const setHasExistingData = (hasExistingData: boolean) => {
    setState((prev) => ({ ...prev, hasExistingData }));
  };

  const handleAsyncOperation = async <T>(
    operation: () => Promise<T>,
    options?: {
      loadingMessage?: string;
      successMessage?: string;
      errorMessage?: string;
      onSuccess?: (result: T) => void;
      onError?: (error: unknown) => void;
    },
  ) => {
    try {
      setSubmitting(true);
      if (options?.loadingMessage) {
        toast.loading(options.loadingMessage);
      }

      const result = await operation();

      if (options?.successMessage) {
        toast.dismiss();
        toast.success(options.successMessage);
      }

      options?.onSuccess?.(result);
      return result;
    } catch (error) {
      const errorMsg = options?.errorMessage || 'Terjadi kesalahan';
      toast.dismiss();
      toast.error(errorMsg);
      options?.onError?.(error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    state,
    setLoading,
    setSubmitting,
    setLoadError,
    setHasExistingData,
    handleAsyncOperation,
  };
}

/**
 * Generic form submission handler
 */
export async function handleFormSubmission<T>(
  action: (data: T) => Promise<{ success: boolean; error?: string }>,
  data: T,
  onSuccess?: (data: T) => void,
  successMessage?: string,
) {
  try {
    const result = await action(data);

    if (result.success) {
      if (successMessage) {
        toast.success(successMessage);
      }
      onSuccess?.(data);
    } else {
      toast.error(result.error || 'Gagal menyimpan data');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    toast.error('Terjadi kesalahan saat menyimpan data');
  }
}
