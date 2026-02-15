import { CloseButton, Field, Input, InputGroup, type BoxProps } from '@chakra-ui/react';
import type { HTMLInputAutoCompleteAttribute, ReactNode } from 'react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

export interface TextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<BoxProps, 'children'> {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  placeholder?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  clearable?: boolean;
  icon?: ReactNode;
}

export function TextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: TextFieldProps<TFieldValues, TName>) {
  const {
    control,
    name,
    label,
    placeholder,
    autoComplete,
    clearable,
    icon,
    ...rest
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field.Root {...rest} invalid={fieldState.invalid}>
          <Field.Label>{label}</Field.Label>
          <InputGroup
            startElement={icon}
            endElement={clearable && field.value && <CloseButton size="xs" onClick={() => field.onChange('')} me="-2" />}
          >
            <Input
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={field.disabled}
              name={field.name}
              ref={field.ref}
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          </InputGroup>
          {fieldState.error?.message && <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>}
        </Field.Root>
      )}
    />
  );
};
