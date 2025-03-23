import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FallbackContainer = styled.div<{ $height?: string }>`
  width: 100%;
  height: ${props => props.$height || '100%'};
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 1rem;
`;

const StyledImage = styled.img`
  opacity: 1;
  transition: opacity 0.3s ease;

  &.loading {
    opacity: 0;
  }
`;

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackHeight?: string;
}

function ImageWithFallback({ src, alt, style, fallbackHeight, ...props }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    // 이미지를 미리 로드
    const img = new Image();
    img.onload = () => {
      setImgSrc(src);
      setIsLoading(false);
    };
    img.onerror = () => {
      setHasError(true);
      setIsLoading(false);
    };
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  if (hasError || !imgSrc) {
    return (
      <FallbackContainer $height={fallbackHeight}>
        <span>🏰</span>
      </FallbackContainer>
    );
  }

  return (
    <StyledImage
      src={imgSrc}
      alt={alt}
      className={isLoading ? 'loading' : ''}
      style={style}
      {...props}
    />
  );
}

export default ImageWithFallback;
