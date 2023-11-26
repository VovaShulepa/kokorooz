import { FC } from 'react';
import cn from 'classnames';

import { SectionProps } from './Section.props';

export const Section: FC<SectionProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section className={cn('py-[60px]', className)} {...props}>
      {children}
    </section>
  );
};
