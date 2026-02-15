import { chakraToaster } from '~/shared/config/chakra/toaster';

export type ToastOptions = {
  type: 'info' | 'success' | 'error' | 'warning';
  description: string;
  title?: string;
  durationMs?: number;
};

export function showToast(options: ToastOptions) {
  chakraToaster.create({
    type: options.type,
    title: options.title,
    duration: options.durationMs ?? 3000,
    description: options.description,
  });
}
