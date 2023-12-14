import { ReactNode } from 'react';

export interface ParagraphProps {
  size?: 'big' | 'small' | 'list';
  className?: string;
  children: ReactNode;
}
