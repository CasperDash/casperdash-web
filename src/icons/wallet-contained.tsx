import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export const WalletContained = ({ color = '#FCFCFD', ...props }: Props) => {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="80" height="80" rx="40" fill="#FA2852" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M47 33H33C31.8954 33 31 33.8954 31 35V45C31 46.1046 31.8954 47 33 47H47C48.1046 47 49 46.1046 49 45V35C49 33.8954 48.1046 33 47 33ZM33 31C30.7909 31 29 32.7909 29 35V45C29 47.2091 30.7909 49 33 49H47C49.2091 49 51 47.2091 51 45V35C51 32.7909 49.2091 31 47 31H33Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41 40C41 37.2386 43.2386 35 46 35H50C50.5523 35 51 35.4477 51 36C51 36.5523 50.5523 37 50 37H46C44.3431 37 43 38.3431 43 40C43 41.6569 44.3431 43 46 43H50C50.5523 43 51 43.4477 51 44C51 44.5523 50.5523 45 50 45H46C43.2386 45 41 42.7614 41 40Z"
        fill={color}
      />
      <path
        d="M47 40C47 40.5523 46.5523 41 46 41C45.4477 41 45 40.5523 45 40C45 39.4477 45.4477 39 46 39C46.5523 39 47 39.4477 47 40Z"
        fill={color}
      />
    </svg>
  );
};
