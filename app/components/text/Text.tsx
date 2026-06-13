import { clsx } from 'clsx';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  forwardRef, Ref, ReactNode,
} from 'react';

import s from './text.module.scss';

type Variant =
  | 'regular-text10'
  | 'semi-bold-text60'
  | 'regular-text12'
  | 'regular-text14'
  | 'semi-bold-text14'
  | 'regular-text16'
  | 'bold-text16'
  | 'regular-text18'
  | 'regular-text20'
  | 'regular-text24'
  | 'regular-text36'
  | 'regular-text48'
  | 'medium-text24'
  | 'medium-text12'
  | 'light-text12'
  | 'bold-text14'
  | 'bold-text18'
  | 'bold-text20'
  | 'bold-text24'
  | 'bold-text36'
  | 'semi-bold-text30'
  | 'semi-bold-text16'
  | 'bold-text48'
  | 'label10'
  | 'label14'
  | 'light-text20'
  | 'medium-text14'
  | 'medium-text36'
  | 'medium-text86'
  | 'medium-text16'
  | 'error'
  | 'medium-text20'
  | 'medium-text18'
  | 'medium-text48'
  | 'light-text36'
  | 'semi-bold-text18'
  | 'light-text18'
  | 'semi-bold-text12'
  | 'semi-bold-text48'
| 'semi-bold-text24'

type VariantColor =
  | 'primary'
  | 'gradient-primary'
  | 'accent1'
  | 'accent2'
  | 'accent3'
  | 'accent4'
  | 'accent5'
  | 'accent6'
  | 'accent7'
  | 'accent8'
  | 'accent9'
  | 'accent10'
  | 'accent11'
  | 'accent12'
  | 'accent13'
  | 'accent14'
  | 'accent15'
  | 'accent16'
  | 'accent17'
  | 'accent18';

type TextOwnProps<T extends ElementType> = {
  variantColor?: VariantColor
  as?: T
  variant?: Variant
  textDecoration?: 'link-text' | 'margin-right' | 'margin-left'
    | 'text-decoration-underline' | 'text-decoration-none-underline';
}

export type TextProps<T extends ElementType = 'span'> = TextOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps<T>>

type TextWithRef = <T extends ElementType = 'span'>(
  props: TextProps<T>,
  // @ts-expect-error
  ref?: Ref<ElementRef<T>>
) => ReactNode


export const Text: TextWithRef = forwardRef(
    // @ts-expect-error
  <T extends ElementType>(props: TextProps<T>, ref?: Ref<ElementRef<T>>) => {
    const {
      as,
      className,
      textDecoration,
      variant = 'regular-text16',
      variantColor = 'primary',
      ...restProps
    } = props;

    const Component: ElementType = as || 'span';
    const classNames =
        clsx(
          s.text,
          variant && s[variant],
          variantColor && s[variantColor],
          textDecoration && s[textDecoration],
          className,
        );

    return (
      <Component className={classNames} ref={ref} {...restProps} />
    );
  },
);
