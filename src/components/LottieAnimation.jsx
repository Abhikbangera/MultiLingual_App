import React from 'react';
import Lottie from 'lottie-react';
import { useLanguage } from '../context/LanguageContext';

// Placeholder animation data - replace with actual Lottie JSON files
const placeholderAnimation = {
  v: "5.5.7",
  fr: 60,
  ip: 0,
  op: 60,
  w: 400,
  h: 400,
  nm: "Placeholder Animation",
 ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ i: {x:[0.833],y:[0.833]}, o: {x:[0.167],y:[0.167]}, t: 0, s: [0]}, {t: 60, s: [360]}] },
        p: { a: 0, k: [200, 200, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [150, 150] },
              p: { a: 0, k: [0, 0] },
              nm: "Ellipse Path"
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.933, 0.333, 0.102, 1] },
              o: { a: 0, k: 100 },
              nm: "Fill"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ],
          nm: "Circle Group"
        }
      ],
      ip: 0,
      op: 60,
      st: 0
    }
  ]
};

const LottieAnimation = ({ 
  animationData, 
  animationName = 'placeholder',
  height = 300,
  width = 300,
  className = '',
  autoplay = true,
  loop = true
}) => {
  const { t } = useLanguage();
  
  // Use placeholder if no animation data provided
  const animation = animationData || placeholderAnimation;
  
  return (
    <div 
      className={`lottie-container ${className}`}
      style={{ minHeight: height }}
    >
      <Lottie
        animationData={animation}
        height={height}
        width={width}
        autoplay={autoplay}
        loop={loop}
        className="rounded-xl"
      />
    </div>
  );
};

export default LottieAnimation;

