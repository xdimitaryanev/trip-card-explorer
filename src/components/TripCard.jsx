import { useMemo } from 'react';
import SafeImage from "./SafeImage";
import { StarHalf, Star } from "lucide-react";

const TripCard = ({ trip, onMoreInfo }) => {
  const stars = useMemo(() => {
    const result = [];
    const fullStars = Math.floor(trip.rating);
    const hasHalfStar = trip.rating % 1 >= 0.5;
    const totalStars = 5;

    for (let i = 0; i < totalStars; i++) {
      if (i < fullStars) {
        result.push(
          <Star 
            key={i} 
            className="trip-card__star trip-card__star--full"
            fill="currentColor"
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        result.push(
          <StarHalf 
            key={i} 
            className="trip-card__star trip-card__star--half"
            fill="currentColor"
          />
        );
      } else {
        result.push(
          <Star 
            key={i} 
            className="trip-card__star trip-card__star--empty"
          />
        );
      }
    }

    return result;
  }, [trip.rating]);

  return (
    <article className="trip-card">
      <div className="trip-card__image-container">
        <SafeImage 
          src={trip.image} 
          alt={trip.name}
          className="trip-card__image"
        />
      </div>

      <div className="trip-card__content">
        <h3 className="trip-card__title">{trip.name}</h3>

        <div 
          className="trip-card__rating"
          aria-label={`Rating: ${trip.rating} out of 5 stars`}
        >
          <div className="trip-card__stars" aria-hidden="true">
            {stars}
          </div>
          <span className="trip-card__rating-number">({trip.rating}/5)</span>
        </div>

        <p className="trip-card__description">{trip.description}</p>

        <button 
          className="trip-card__button"
          onClick={() => onMoreInfo(trip)}
          aria-label={`View more information about ${trip.name}`}
          type="button"
        >
          More Info
        </button>
      </div>
    </article>
  );
};

export default TripCard;