import { useState } from 'react';

import styles from './MovierPicker.module.scss';
import { Brain, Coffee, Film, Heart, Smile, Zap } from 'lucide-react';
import { GenreStep } from './components/GenreStep';
import { MoodStep, type Moodoption } from './components/MoodStep';
import { YearStep } from './components/YearStep';
import { RatingStep } from './components/RatingStep';
import { SurpriseCard } from './components/SurpriseCard';
import { apiFetch } from '../../api/client';
import type { PickedMovie } from '../../types/movies';
import { PreferencesSummary } from './components/PreferencesSummary';

const DEFAULT_YEARS: [number, number] = [2010, 2026];

const GENRES = [
  'All', 'Action', 'Sci-Fi', 'Adventure', 'Drama', 
  'Comedy', 'Thriller', 'Mystery', 'Animation', 'Fantasy', 
  'Horror', 'Crime', 'Romance', 'Documentary', 'War', 'Western', 'History'
];

const GENRE_NAME_TO_ID: Record<string, number> = {
  'Sci-Fi': 1,
  'Action': 2,
  'Adventure': 3,
  'Animation': 4,
  'Fantasy': 5,
  'Horror': 6,
  'Thriller': 7,
  'Comedy': 8,
  'Drama': 10,
  'Mystery': 11,
  'Romance': 12,
  'History': 13,
  'Crime': 14,
  'War': 16,
  'Western': 18,
  'Documentary': 19,
}

const MOODS: Moodoption[] = [
  { id: 'mind-bending', label: 'Mind-bending', icon: Brain },
  { id: 'feel-good', label: 'Feel-good', icon: Smile },
  { id: 'intense', label: 'Intense', icon: Zap },
  { id: 'emotional', label: 'Emotional', icon: Heart },
  { id: 'relaxing', label: 'Relaxing', icon: Coffee },
];

const MOOD_MAP: Record<string, string[]> = {
  'mind-bending': ['Sci-Fi', 'Mystery', 'Thriller'],
  'feel-good': ['Comedy', 'Romance', 'Animation'],
  'intense': ['Action', 'Thriller', 'Crime', 'War'],
  'emotional': ['Drama', 'Romance', 'History'],
  'relaxing': ['Comedy', 'Fantasy', 'Animation', 'Documentary'],
};

export const MoviePicker = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [yearRange, setYearRange] = useState<[number, number]>(DEFAULT_YEARS);
  const [minRating, setMinRating] = useState<number>(0);

  const [pickedMovie, setPickedMovie] = useState<PickedMovie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const moodBaseGenres = selectedMood ? (MOOD_MAP[selectedMood] || []) : [];

  const calculatedGenres = selectedGenres.length > 0
    ? (selectedMood 
        ? selectedGenres.filter((g) => moodBaseGenres.includes(g))
        : selectedGenres)
    : moodBaseGenres;

  const effectiveGenres = (selectedGenres.length > 0 && calculatedGenres.length === 0)
    ? selectedGenres
    : calculatedGenres;

  const toggleGenre = (genre: string) => {
    if (genre === 'All') {
      setSelectedGenres([]);
      return;
    }

    setSelectedGenres((prev) => 
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood((prev) => (prev === moodId ? '' : moodId));
  };

  const handleRatingSelect = (rating: number) => {
    setMinRating((prev) => (prev === rating ? 0 : rating));
  };

  const handleReset = () => {
    setSelectedGenres([]);
    setSelectedMood('');
    setYearRange(DEFAULT_YEARS);
    setMinRating(0);
    setPickedMovie(null);
    setIsError(null);
  };

  const fetchRandomMovie = async (isSurprise = false) => {
    setIsLoading(true);
    setIsError(null);

    const params = new URLSearchParams();

    if (isSurprise !== true) {
      if (effectiveGenres.length > 0) {
        const genreIds = effectiveGenres
        .map((g) => GENRE_NAME_TO_ID[g])
        .filter((id) => id !== undefined);

        if (genreIds.length > 0) {
          params.append('genres', genreIds.join(','));
        }
      }
      if (minRating > 0) {
        params.append('min_rating', minRating.toString());
      }
      params.append('year_from', yearRange[0].toString());
      params.append('year_to', yearRange[1].toString());
    }

    const queryString = params.toString() ? `?${params.toString()}` : '';

    try {
      const data = await apiFetch<PickedMovie>(`/api/movies/random/${queryString}`);
      setPickedMovie(data);
    } catch (err: unknown) {
      console.error("Error fetching random movie:", err);
      setIsError("No movies found matching your criteria. Try expanding your filters.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.moviePickerContainer}>
      <div className={styles.pageHeader}>
        <div className={styles.badge}>
          <Film size={16} />
          MOVIE PICKER
        </div>
        <h1 className={styles.title}>
          Find your next favorite <span>movie</span>
        </h1>
        <p className={styles.headerDescription}>Tell us what you're in the mood for, and we'll find the perfect movie for you.</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.filtersColumn}>
          <div className={styles.filtersCard}>
            <GenreStep 
              genres={GENRES} 
              selectedGenres={selectedGenres} 
              onToggleGenre={toggleGenre} 
            />
            <MoodStep 
              moods={MOODS} 
              selectedMood={selectedMood} 
              onSelectMood={handleMoodSelect}
            />

            <div className={styles.rowGrid}>
              <YearStep 
                yearRange={yearRange}
                onChange={setYearRange}
                minYear={1970}
                maxYear={2026}
              />
              <RatingStep 
                minRating={minRating} 
                onSelectRating={handleRatingSelect}
              />
            </div>
          </div>

          <SurpriseCard
            isLoading={isLoading}
            onSurprise={() => fetchRandomMovie(true)}
          />
        </div>
        <PreferencesSummary 
          effectiveGenres={effectiveGenres}
          selectedMood={selectedMood}
          moods={MOODS}
          yearRange={yearRange}
          minRating={minRating}
          pickedMovie={pickedMovie}
          isLoading={isLoading}
          isError={isError}
          onReset={handleReset}
          onFindMovies={() => fetchRandomMovie(false)}
        />
      </div>
    </section>
  );
};