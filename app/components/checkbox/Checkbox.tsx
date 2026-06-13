import { clsx } from 'clsx';
import {
  ComponentPropsWithoutRef, ElementRef, forwardRef, memo, ComponentProps,
} from 'react';
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { Text } from '../text/Text';
import Check from '../../assets/icons/components/Check';
import s from './checkbox.module.scss';

// eslint-disable-next-line react/no-unused-prop-types
export type CheckboxProps = {error?: string,
    // eslint-disable-next-line react/no-unused-prop-types
    fullWidth?: boolean, containerClassName?: string}
    &
  ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

const CheckboxRootWrapper = memo(
  forwardRef<ElementRef<typeof CheckboxRadix.Root>, ComponentProps<typeof CheckboxRadix.Root>>(
    (props, ref) => <CheckboxRadix.Root {...props} ref={ref} />,
  ),
);

export const Checkbox = memo(forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
  (props, ref) => {
    const {
      checked,
      fullWidth,
      containerClassName,
      className, disabled,
      error,
      children,
      id,
      ...rest
    } = props;
    const isError = Boolean(error);
    return (
      <div className={s.containerError}>
        <label
          htmlFor={id}
          className={clsx(s.container, fullWidth && s.fullWidth, containerClassName)}
        >
          <CheckboxRootWrapper
            checked={checked}
            className={clsx(s.checkboxRoot, isError && s.error, className)}
            disabled={disabled}
            id={id}
            ref={ref}
            {...rest}
          >
            <CheckboxRadix.Indicator className={clsx(
              s.checkboxIndicator,
              disabled && s.checkboxIndicatorDisabled,
            )}
            >
              <Check />
            </CheckboxRadix.Indicator>
          </CheckboxRootWrapper>
          {Boolean(children) && (
          <Text as="div" variant="medium-text16" variantColor="accent13">{children}</Text>
          )}
        </label>
        {Boolean(error) && <Text variant="error" className={s.errorText}>{error}</Text>}
      </div>
    );
  },
));

Checkbox.displayName = 'Checkbox';
