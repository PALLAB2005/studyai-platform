export interface YouTubeVideo {
  id: string;
  videoId: string;
  title: string;
  channel: string;
  channelUrl?: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  publishedDate?: string;
  views?: string;
  source: 'youtube';
  topic?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  relevanceReason?: string;
  tags?: string[];
}

export interface YouTubeSearchResponse {
  items: YouTubeVideo[];
  totalResults: number;
  isMockFallback?: boolean;
  query: string;
}
