import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export const SearchIcon = ({ color = '#777E90', ...props }: Props) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.2979 14.2981C11.2975 17.2985 6.43294 17.2985 3.43254 14.2981C0.43215 11.2977 0.43215 6.43308 3.43254 3.43269C6.43294 0.432299 11.2975 0.432299 14.2979 3.43269C17.2983 6.43308 17.2983 11.2977 14.2979 14.2981ZM14.2979 14.2981L17.6934 17.6935"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
