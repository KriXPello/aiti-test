import { useDialog } from '@chakra-ui/react';
import z from 'zod';
import { showToast } from '~/shared/lib/toast';

export const createProductSchema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  brand: z.string().min(1, 'Обязательное поле'),
  sku: z.string().min(1, 'Обязательное поле'),
  price: z.number().min(1, 'Не может быть меньше 1'),
});

export type CreateProductData = z.infer<typeof createProductSchema>;

export function useCreateProduct() {
  const dialog = useDialog({
    closeOnInteractOutside: false,
    closeOnEscape: false,
  });

  const openDialog = () => {
    dialog.setOpen(true);
  };
  const onSubmit = (data: CreateProductData) => {
    showToast({
      type: 'success',
      description: 'В реальном приложении был бы отправлен запрос на создание\n' + JSON.stringify(data, null, 2),
    });
    dialog.setOpen(false);
  };

  return {
    dialog,
    openDialog,
    onSubmit,
  };
}
