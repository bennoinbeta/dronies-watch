import React from 'react';

type Props = {
  color?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number;
  className?: string; // Required to apply styling via Styled-Components
} & React.SVGProps<SVGSVGElement>;

const Discord = React.forwardRef<SVGSVGElement, Props>((props, ref) => {
  const { width, height, color, strokeWidth, ...others } = props;

  return (
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      ref={ref}
      {...others}
    >
      <path
        d="M20.317 4.52a19.757 19.757 0 0 0-4.885-1.519.074.074 0 0 0-.079.037c-.21.377-.444.867-.608 1.253a18.228 18.228 0 0 0-5.487 0 12.687 12.687 0 0 0-.617-1.253.077.077 0 0 0-.079-.037A19.702 19.702 0 0 0 3.677 4.52a.07.07 0 0 0-.032.028C.533 9.208-.32 13.752.099 18.24a.083.083 0 0 0 .031.056 19.88 19.88 0 0 0 5.993 3.037.078.078 0 0 0 .084-.028 14.27 14.27 0 0 0 1.226-1.999c.021-.041.001-.09-.041-.106a13.097 13.097 0 0 1-1.872-.894.077.077 0 0 1-.008-.128c.126-.095.252-.193.372-.292a.074.074 0 0 1 .078-.01c3.927 1.797 8.18 1.797 12.061 0a.074.074 0 0 1 .079.009c.12.099.245.198.372.293.044.032.04.1-.006.128-.598.35-1.22.646-1.873.893a.077.077 0 0 0-.041.107c.36.7.772 1.366 1.225 1.998a.076.076 0 0 0 .084.029 19.815 19.815 0 0 0 6.002-3.037.077.077 0 0 0 .032-.055c.5-5.19-.838-9.697-3.549-13.693a.06.06 0 0 0-.031-.029ZM8.02 15.508c-1.182 0-2.157-1.088-2.157-2.425 0-1.337.956-2.425 2.157-2.425 1.21 0 2.176 1.098 2.157 2.425 0 1.336-.956 2.425-2.157 2.425Zm7.975 0c-1.183 0-2.157-1.088-2.157-2.425 0-1.337.955-2.425 2.157-2.425 1.21 0 2.176 1.098 2.157 2.425 0 1.336-.946 2.425-2.157 2.425Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

Discord.defaultProps = {
  color: '#000000',
  width: 15,
  height: 15,
  strokeWidth: 2,
};

export default Discord;
