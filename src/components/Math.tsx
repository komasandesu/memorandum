// components/Math.tsx
import { FC } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface MathProps {
  inline?: boolean;
  math: string;
}

const Math: FC<MathProps> = ({ inline = false, math }) => {
  return inline ? <InlineMath math={math} /> : <BlockMath math={math} />;
};

export default Math;
