import { DetailedHTMLProps, ReactNode } from 'react';

export interface TitleProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  tag?: 'h1' | 'h2' | 'h3';
  children: ReactNode;
}
