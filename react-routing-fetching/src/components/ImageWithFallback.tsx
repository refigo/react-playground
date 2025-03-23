import React, { useState } from 'react';
import defaultCharacter from '../assets/default-character.svg';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, ...props }) => {
  const [error, setError] = useState(false);

  return (
    <img
      src={error ? defaultCharacter : src}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
};

export default ImageWithFallback;
