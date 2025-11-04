import { useState, useEffect, useMemo, useTransition } from 'react';
import TripCard from './components/TripCard';
import SkeletonCard from './components/SkeletonCard';
import Modal from './components/Modal';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';

const ITEMS_PER_PAGE = 6;

const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

function App() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByRating, setSortByRating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const isSearching = searchTerm !== debouncedSearchTerm;

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('data.json');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.trips || !Array.isArray(data.trips)) {
          throw new Error('Invalid data format: trips array not found');
        }

        setTrips(data.trips);
      } catch (err) {
        const errorMessage = err instanceof Error
          ? err.message
          : 'An unexpected error occurred';
        setError(`Failed to load trips: ${errorMessage}`);
        console.error('Error fetching trips:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const filteredAndSortedTrips = useMemo(() => {
    const filtered = trips.filter(trip =>
      trip.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    if (!sortByRating) {
      return filtered;
    }

    return [...filtered].sort((a, b) => b.rating - a.rating);
  }, [trips, debouncedSearchTerm, sortByRating]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, sortByRating]);


  const totalPages = Math.ceil(filteredAndSortedTrips.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTrips = filteredAndSortedTrips.slice(startIndex, endIndex);

  const handleMoreInfo = (trip) => {
    setSelectedTrip(trip);
  };

  const handleCloseModal = () => {
    setSelectedTrip(null);
  };

  const handleSortToggle = (checked) => {
    startTransition(() => {
      setSortByRating(checked);
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="app">
        <header className="header">
          <h1 className="header__title">Trip Card Explorer</h1>
          <p className="header__subtitle">Discover amazing destinations around the United States</p>
        </header>

        <main className="main">
          <div className="trip-grid" role="status" aria-label="Loading trips">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error" role="alert">
          <h2 className="error__title">Something went wrong</h2>
          <p className="error__message">{error}</p>
          <button
            className="error__button"
            onClick={handleRetry}
            aria-label="Retry loading trips"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="header__title">Trip Card Explorer</h1>
        <p className="header__subtitle">Discover amazing destinations around the United States</p>
      </header>

      <main className="main">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortByRating={sortByRating}
          onSortToggle={handleSortToggle}
        />

        {isSearching && (
          <div className="searching-indicator" role="status" aria-live="polite">
            Searching...
          </div>
        )}

        {isPending && !isSearching && (
          <div className="searching-indicator" role="status" aria-live="polite">
            Sorting...
          </div>
        )}

        {!isSearching && filteredAndSortedTrips.length === 0 ? (
          <div className="no-results" role="status">
            <p className="no-results__text">
              No trips found matching "{debouncedSearchTerm}".
            </p>
            <button
              className="no-results__button"
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </button>
          </div>
        ) : !isSearching ? (
          <>
            <div className="results-count" role="status" aria-live="polite">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedTrips.length)} of {filteredAndSortedTrips.length} {filteredAndSortedTrips.length === 1 ? 'trip' : 'trips'}
            </div>
            <div className="trip-grid">
              {currentTrips.map(trip => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onMoreInfo={handleMoreInfo}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : null}
      </main>

      {selectedTrip && (
        <Modal trip={selectedTrip} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;