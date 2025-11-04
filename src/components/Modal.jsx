import { useEffect } from 'react';
import { X } from 'lucide-react';
import SafeImage from './SafeImage';

const Modal = ({ trip, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    const modal = document.querySelector('.modal');
    if (modal) {
      modal.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return '★'.repeat(fullStars) + (hasHalfStar ? '½' : '') + '☆'.repeat(5 - Math.ceil(rating));
  };

  if (!trip) return null;

  return (
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick} 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div 
        className="modal" 
        tabIndex={-1}
        role="document"
      >
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <X size={24} />
        </button>
        
        <div className="modal__image-container">
          <SafeImage
            src={trip.image}
            alt={trip.name}
            className="modal__image"
          />
        </div>
        
        <div className="modal__content">
          <h2 id="modal-title" className="modal__title">{trip.name}</h2>
          
          <div className="modal__rating" role="img" aria-label={`Rating: ${trip.rating} out of 5 stars`}>
            <span className="modal__stars" aria-hidden="true">
              {renderStars(trip.rating)}
            </span>
            <span className="modal__rating-number">({trip.rating}/5)</span>
          </div>
          
          <p id="modal-description" className="modal__description">
            {trip.long_description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;