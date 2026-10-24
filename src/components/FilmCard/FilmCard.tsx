import { Play, Star } from "lucide-react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./FilmCard.module.scss";
import type { Film } from "../../types/Film";
import { AddButton, LinkButton, ShareButton } from "../Button";
import { usePosterUrl } from "../../hooks/usePosterUrl";

type FilmCardProps = {
  film: Film;
  className?: string;
};

export const FilmCard = ({ film, className }: FilmCardProps) => {
  const moviePath = `/movie/${film.id}`;
  const posterUrl = usePosterUrl(film.poster_path);

  return (
    <article className={clsx(styles.film, className)}>
      <div className={styles.imageWrapper}>
        {posterUrl ? (
          <img
            className={styles.image}
            src={posterUrl}
            alt={film.title}
            loading="lazy"
          />
        ) : (
          <div className={styles.imageFallback} aria-hidden="true" />
        )}

        {film.trailer_url && (
          <a
            className={styles.playButton}
            href={film.trailer_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch ${film.title} trailer`}
          >
            <Play className={styles.playIcon} size={16} fill="currentColor" />
          </a>
        )}
      </div>

      <h3 className={styles.film__name}>
        <Link to={moviePath} className={styles.titleLink}>
          {film.title}
        </Link>
      </h3>

      <div className={styles.filmDetails}>
        <div className={styles.filmMeta}>
          <p className={styles.film__date}>
            {film.release_date?.slice(0, 4) ?? ""}
          </p>
          <p className={styles.film__genres}>
            {film.genres.slice(0, 2).join(" / ")}
          </p>
        </div>

        <span className={styles.rating}>
          <Star size={14} fill="currentColor" />
          {film.vote_average.toFixed(1)}
        </span>
      </div>

      <div className={styles.desktopOverlay}>
        <div className={styles.overlayContent}>
          <LinkButton
            to={moviePath}
            size="sm"
            fullWidth
            className={styles.openButton}
          >
            Open
          </LinkButton>

          <div className={styles.overlayActions}>
            <AddButton
              movieId={film.id}
              variant="text"
              size="sm"
              label="Add to playlist"
              addedLabel="In playlist"
              className={styles.overlayActionsText}
            />

            <ShareButton
              variant="text"
              size="sm"
              showIcon={false}
              title={film.title}
              url={`${window.location.origin}${moviePath}`}
              className={styles.overlayActionsText}
            />
          </div>
        </div>
      </div>
    </article>
  );
};
