import cn from 'classnames';
import { TitleProps } from './Title.props';

export const Title = ({
  tag,
  children,
  className,
}: TitleProps): JSX.Element => {
  const Tag = tag ?? 'h2';

  return (
    <Tag
      data-aos="zoom-in"
      className={cn(className, {
        ['text-3xl leading-[1.3] font-bold xl:text-[44px]']: tag == 'h1',
        ['text-[22px] xl:text-4xl leading-normal font-bold']: tag == 'h2',
        ['']: tag == 'h3',
      })}
    >
      {children}
    </Tag>
  );
};
