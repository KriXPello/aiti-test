import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Control } from 'react-hook-form';
import { createProductSchema, type CreateProductData } from '../model/create-product';
import { Stack, type UseDialogReturn } from '@chakra-ui/react';
import { NumberField, TextField } from '~/shared/ui/form';

export function CreateProductForm(props: {
  control: Control<CreateProductData>;
}) {
  const { control } = props;
  return (
    <Stack>
      <TextField
        control={control}
        name="title"
        label="Наименование"
        clearable
      />

      <NumberField
        maxW="200px"
        control={control}
        name="price"
        label="Цена"
      />

      <TextField
        control={control}
        name="brand"
        label="Вендор"
        clearable
      />

      <TextField
        control={control}
        name="sku"
        label="Артикул"
        clearable
      />
    </Stack>
  );
}

import {
  Button,
  CloseButton,
  Dialog,
  Portal,
} from '@chakra-ui/react';

export const CreateProductDialog = (props: {
  dialog: UseDialogReturn;
  onSubmit: (data: CreateProductData) => void;
}) => {
  const {
    control, handleSubmit,
  } = useForm<CreateProductData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: '',
      brand: '',
      sku: '',
      price: 100,
    },
  });
  return (
    <Dialog.RootProvider value={props.dialog}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content as="form" onSubmit={handleSubmit(props.onSubmit)}>
            <Dialog.Header>
              <Dialog.Title>Создание товара</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <CreateProductForm control={control} />
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                colorPalette="blue"
                type="submit"
              >
                Создать
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  );
};
