import { useState } from "react";
import { Image } from "lucide-react";

const SafeImage = ({ src, alt, className, onLoadComplete }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
    if (onLoadComplete) {
      onLoadComplete();
    }
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
    if (onLoadComplete) {
      onLoadComplete();
    }
  };

  if (error) {
    return (
      <div 
        className={`${className} safe-image__error`}
        role="img"
        aria-label={`Image not available: ${alt}`}
      >
        <Image size={48} aria-hidden="true" />
        <span className="safe-image__error-text">Image not available</span>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div 
          className={`${className} safe-image__loading`}
          aria-label="Loading image"
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loading ? 'safe-image--loading' : 'safe-image--loaded'}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </>
  );
};

export default SafeImage;