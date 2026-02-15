import { Field, type BoxProps } from '@chakra-ui/react';
import type { HTMLInputAutoCompleteAttribute, ReactNode } from 'react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { PasswordInput, type PasswordInputProps } from '../input';

export interface PasswordFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<BoxProps, 'children'> {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  placeholder?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  icon?: ReactNode;
}

export function PasswordField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: PasswordFieldProps<TFieldValues, TName>) {
  const {
    control,
    name,
    label,
    placeholder,
    autoComplete,
    icon,
    ...rest
  } = props;

  const rootProps: PasswordInputProps['rootProps'] = {
    startElement: icon,
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field.Root {...rest} invalid={fieldState.invalid}>
          <Field.Label>{label}</Field.Label>
          <PasswordInput
            rootProps={rootProps}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={field.disabled}
            name={field.name}
            ref={field.ref}
            value={field.value ?? ''}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
          {fieldState.error?.message && <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>}
        </Field.Root>
      )}
    />
  );
};
