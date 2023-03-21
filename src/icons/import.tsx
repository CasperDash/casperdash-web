import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export const ImportIcon = ({ color = '#353945', ...props }: Props) => {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      color={color}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.77666 0.250732C4.03417 0.250732 3.39967 0.735719 3.15835 1.40073H15.5938C15.3522 0.735719 14.7169 0.250732 13.9744 0.250732H4.77666ZM2.47666 2.55185C1.53095 2.55185 0.748291 3.3334 0.748291 4.2791V13.4769C0.748291 14.4226 1.53095 15.2052 2.47666 15.2052H16.2755C17.2212 15.2052 17.9983 14.4226 17.9983 13.4769V4.2791C17.9983 3.3334 17.2212 2.55185 16.2755 2.55185H2.47666ZM9.36543 4.84399C9.69143 4.83786 9.95667 5.10309 9.95054 5.4291V10.9399L11.2712 9.62256C11.3228 9.56237 11.3862 9.51349 11.4576 9.47898C11.5289 9.44448 11.6066 9.42509 11.6858 9.42203C11.765 9.41898 11.844 9.43233 11.9178 9.46124C11.9915 9.49015 12.0586 9.534 12.1146 9.59004C12.1706 9.64608 12.2145 9.71309 12.2434 9.78688C12.2723 9.86067 12.2857 9.93963 12.2826 10.0188C12.2795 10.098 12.2602 10.1757 12.2257 10.2471C12.1911 10.3184 12.1423 10.3818 12.0821 10.4334L9.78096 12.7345C9.67321 12.8416 9.52746 12.9017 9.37554 12.9017C9.22361 12.9017 9.07786 12.8416 8.97012 12.7345L6.67012 10.4334C6.59145 10.357 6.53624 10.2598 6.511 10.1531C6.48576 10.0465 6.49154 9.93478 6.52765 9.83128C6.56377 9.72777 6.62871 9.63675 6.71484 9.56893C6.80097 9.50111 6.90468 9.45932 7.01377 9.44848C7.09971 9.44058 7.18633 9.45212 7.26721 9.48226C7.34808 9.51239 7.42114 9.56034 7.48096 9.62256L8.80054 10.9433V5.4291C8.79458 5.11142 9.04775 4.85051 9.36543 4.84399Z"
        fill="currentColor"
      />
    </svg>
  );
};
