export interface Town {
  id: string;
  name: string;
  state: string;
  latitude: number;
  longitude: number;
  trip_types: string[];
  transit_options: string[];
  categories: string[];
  social_media: {
    instagram: string | null;
    facebook: string | null;
    yelp: string | null;
  };
  images: string;
  places: Place[];
  rating?: number;
  reviewCount?: number;
}

export interface Place {
  id: string;
  name: string;
  type: string[];
  street: string;
  zip: string;
  latitude: number;
  longitude: number;
  website: string;
  categories: string[];
  social_media: {
    instagram: string | null;
    facebook: string | null;
    yelp: string | null;
  };
  images: string;
}
