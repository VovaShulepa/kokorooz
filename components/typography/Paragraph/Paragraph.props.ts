import { ReactNode } from 'react';

export interface ParagraphProps {
  size?: 'big' | 'small' | 'extrasmall';
  className?: string;
  children: ReactNode;
}
