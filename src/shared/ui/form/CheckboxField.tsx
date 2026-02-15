import { Checkbox, Field, type BoxProps } from '@chakra-ui/react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

export interface CheckboxFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<BoxProps, 'children'> {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
}

export function CheckboxField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: CheckboxFieldProps<TFieldValues, TName>) {
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
          <Checkbox.Root>
            <Checkbox.HiddenInput
              name={field.name}
              ref={field.ref}
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
            <Checkbox.Control />
            <Checkbox.Label>{label}</Checkbox.Label>
          </Checkbox.Root>
          {fieldState.error?.message && <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>}
        </Field.Root>
      )}
    />
  );
};
