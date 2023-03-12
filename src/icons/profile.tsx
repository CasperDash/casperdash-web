import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export const ProfileIcon = ({ fill = '#20FEB4', ...props }: Props) => {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.3332 4.83333C10.3332 6.67428 8.84079 8.16667 6.99984 8.16667C5.15889 8.16667 3.6665 6.67428 3.6665 4.83333C3.6665 2.99238 5.15889 1.5 6.99984 1.5C8.84079 1.5 10.3332 2.99238 10.3332 4.83333Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.99984 10.6667C3.77818 10.6667 1.1665 13.2783 1.1665 16.5H12.8332C12.8332 13.2783 10.2215 10.6667 6.99984 10.6667Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
