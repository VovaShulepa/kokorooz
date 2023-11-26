import { FC } from 'react';
import cn from 'classnames';
import { ParagraphProps } from './Paragraph.props';

export const Paragraph: FC<ParagraphProps> = ({
  size = 'big',
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={cn(
        'font-light',
        {
          'text-xl xl:text-[24px] font-normal': size === 'big',
          'text-sm md:text-base': size === 'small',
        },
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
};