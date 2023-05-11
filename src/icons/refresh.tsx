import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export const RefreshIcon = ({ color = '#353945', ...props }: Props) => {
  return (
    <svg
      width="22"
      height="24"
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      {...props}
    >
      <path
        d="M0.793154 13.7076C0.793154 19.0679 5.37195 23.4284 11.0002 23.4284C16.6282 23.4284 21.2069 19.0679 21.2069 13.7076C21.2069 11.9358 20.7007 10.2004 19.7438 8.69071L17.0806 10.2217C17.745 11.27 18.0961 12.4756 18.0964 13.7079C18.0964 17.4344 14.9131 20.4658 11.0005 20.4658C7.0876 20.4658 3.90449 17.4344 3.90449 13.7079C3.90449 10.1164 6.86367 7.17895 10.5804 6.9703H12.1022L10.8207 10.0599C10.7777 10.1634 10.8126 10.2815 10.9059 10.3483C10.9992 10.4154 11.1281 10.4151 11.2208 10.3471L17.5928 5.6809C17.6566 5.63393 17.6943 5.56207 17.6943 5.48461C17.6943 5.40759 17.6566 5.33514 17.5928 5.28832L11.2204 0.622441C11.1737 0.588113 11.1182 0.571289 11.0622 0.571289C11.0069 0.571289 10.9522 0.587821 10.9055 0.620982C10.8122 0.687791 10.7773 0.806093 10.8203 0.90971L12.1018 3.99896L10.9997 3.98661C10.6056 3.98661 9.29832 4.11294 9.08287 4.16122C4.36852 5.01841 0.793154 8.9718 0.793154 13.7076Z"
        fill="currentColor"
      />
    </svg>
  );
};
