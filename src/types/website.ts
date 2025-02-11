export interface WebsiteData {
  userId: string;
  slug: string;
  title: string;
  coupleNames: string;
  weddingDate: string;
  heroImage?: string;
  storyImage?: string;
  storyText?: string;
  events: WeddingEvent[];
  theme: WebsiteTheme;
  createdAt: Date;
  updatedAt: Date;
}

export interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  description?: string;
}

export interface WebsiteTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  buttonStyle: 'rounded' | 'square';
}
