export interface Artist {
  id: string;
  name: string;
  avatar?: string;
  banner?: string;
  location?: string;
  bio?: string;
  links: {
    website?: string;
    bandcamp?: string;
    soundcloud?: string;
    spotify?: string;
    youtube?: string;
    instagram?: string;
    twitter?: string;
  };
  joinedAt: string;
  stats: {
    followers: number;
    following: number;
    gems: number;
  };
  tags: string[];
  primaryCategory?: string;
}
