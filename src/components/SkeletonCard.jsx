const SkeletonCard = () => {
  return (
    <div className="skeleton-card" aria-label="Loading trip card" role="status">
      <div className="skeleton-card__image" />
      <div className="skeleton-card__content">
        <div className="skeleton-card__title" />
        <div className="skeleton-card__rating" />
        <div className="skeleton-card__description">
          <div className="skeleton-card__line" />
          <div className="skeleton-card__line" />
          <div className="skeleton-card__line skeleton-card__line--short" />
        </div>
        <div className="skeleton-card__button" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SkeletonCard;