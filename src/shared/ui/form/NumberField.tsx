import { Field, NumberInput, type BoxProps } from '@chakra-ui/react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

export interface NumberFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<BoxProps, 'children'> {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
}

export function NumberField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: NumberFieldProps<TFieldValues, TName>) {
  const {
    control,
    name,
    label,
    ...rest
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field.Root {...rest} invalid={fieldState.invalid}>
          <Field.Label>{label}</Field.Label>
          <NumberInput.Root
            w="full"
            value={field.value ?? '0'}
            onValueChange={(e) => field.onChange(e.valueAsNumber || 0)}
          >
            <NumberInput.Control />
            <NumberInput.Input
              disabled={field.disabled}
              name={field.name}
              ref={field.ref}
              onBlur={field.onBlur}
            />
          </NumberInput.Root>
          {fieldState.error?.message && <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>}
        </Field.Root>
      )}
    />
  );
};
