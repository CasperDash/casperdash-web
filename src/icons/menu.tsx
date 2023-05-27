import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export const MenuIcon = ({ color = '#353945', ...props }: Props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      color={color}
    >
      <g clipPath="url(#clip0_1792_6348)">
        <path
          d="M2.26562 4C2.26562 3.44773 2.71336 3 3.26563 3H16.2656C16.8179 3 17.2656 3.44773 17.2656 4C17.2656 4.55227 16.8179 5 16.2656 5H3.26563C2.71336 5 2.26562 4.55223 2.26562 4ZM19 9H1C0.447734 9 0 9.44777 0 10C0 10.5523 0.447734 11 1 11H19C19.5523 11 20 10.5523 20 10C20 9.44777 19.5523 9 19 9ZM16.2656 15H3.26563C2.7134 15 2.26562 15.4477 2.26562 16C2.26562 16.5522 2.7134 17 3.26563 17H16.2656C16.8179 17 17.2656 16.5522 17.2656 16C17.2656 15.4477 16.8179 15 16.2656 15Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_1792_6348">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
