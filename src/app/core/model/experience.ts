export interface Experience {
  id: string;
  title: string;
  description?: string;
  image: string;
  location: string;
  type: string[];
  website: string;
  social_media?: {
    instagram?: string;
    facebook?: string;
    yelp?: string;
  };
}
