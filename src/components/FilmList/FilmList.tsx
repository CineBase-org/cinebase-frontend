import type { Film } from '../../types/Film';
import { FilmCard } from '../FilmCard';
import styles from './FilmList.module.scss';

type Props = {
  films: Film[];
};

export const FilmList = ({ films }: Props) => {
  return (
    <div className={styles.films}>
      {films.map(film => (
        <FilmCard key={film.id} film={film} />
      ))}
    </div>
  );
};