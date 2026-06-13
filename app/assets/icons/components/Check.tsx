import type { SVGProps } from 'react';
import { Ref, forwardRef, memo } from 'react';

const SvgCheck = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 14 14"
    ref={ref}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.667 3.5 5.25 9.917 2.333 7"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgCheck);
const Memo = memo(ForwardRef);
export default Memo;
