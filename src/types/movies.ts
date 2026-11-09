export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  profile_path?: string;
  character?: string;
  order?: number;
}

export interface StreamingPlatform {
  id: number;
  name: string;
  logo_url?: string;
}

export interface PickedMovie {
  id: number;
  title: string;
  genres: Genre[];
  cast: CastMember[];
  release_date: string;
  overview: string;
  runtime: number;
  vote_average: number;
  poster_path?: string;
  backdrop_path?: string;
  average_rating: number;
  ratings_count: number;
  trailer_url?: string;
  streaming_platforms: StreamingPlatform[];
}