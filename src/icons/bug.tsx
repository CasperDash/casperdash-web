import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export const BugIcon = ({ fill = '#20FEB4', ...props }: Props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 8C12.5523 8 13 7.55228 13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7C11 7.55228 11.4477 8 12 8Z"
        fill={fill}
      />
      <path
        d="M8 8C8.55228 8 9 7.55228 9 7C9 6.44772 8.55228 6 8 6C7.44772 6 7 6.44772 7 7C7 7.55228 7.44772 8 8 8Z"
        fill={fill}
      />
      <path
        d="M10 10V17.5"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.0625 10L0.9375 10"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.25 11.25C16.25 12.9076 15.5915 14.4973 14.4194 15.6694C13.2473 16.8415 11.6576 17.5 10 17.5C8.3424 17.5 6.75269 16.8415 5.58058 15.6694C4.40848 14.4973 3.75 12.9076 3.75 11.25V8.75C3.75 7.0924 4.40848 5.50269 5.58058 4.33058C6.75269 3.15848 8.3424 2.5 10 2.5C11.6576 2.5 13.2473 3.15848 14.4194 4.33058C15.5915 5.50269 16.25 7.0924 16.25 8.75V11.25Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.1189 14.6875L15.8735 13.3911"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.1189 5.3125L15.8735 6.60888"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.88086 5.3125L4.12627 6.60889"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.88086 14.6875L4.12625 13.3911"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
