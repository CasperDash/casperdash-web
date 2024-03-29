import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export const KeyIcon = ({ color = '#353945', ...props }: Props) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      color={color}
    >
      <g
        transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M160 527 c-30 -16 -51 -37 -67 -67 -27 -51 -29 -87 -8 -137 31 -74
81 -106 165 -107 51 -1 55 -3 58 -26 5 -34 20 -50 48 -50 16 0 24 -6 24 -18 0
-10 5 -23 12 -30 16 -16 120 -16 136 0 7 7 12 35 12 62 0 49 -2 53 -66 117
-62 63 -66 69 -68 115 -2 65 -34 117 -90 143 -55 27 -102 26 -156 -2z m94
-110 c16 -26 -27 -62 -55 -47 -19 10 -26 50 -12 64 13 12 56 2 67 -17z"
        />
      </g>
    </svg>
  );
};
