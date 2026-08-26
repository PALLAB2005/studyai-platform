import { YouTubeVideo, YouTubeSearchResponse } from '../types/youtube';

/**
 * YouTube API Service Layer.
 * The browser calls the app backend so the YouTube API key never enters the
 * client bundle.
 */

// Simulated realistic delay for smooth loading states
const SIMULATED_LATENCY_MS = 350;

/**
 * Searches for YouTube learning resources.
 * The backend endpoint proxies the official YouTube Data API v3. During local
 * development without a backend, it returns an empty result rather than
 * showing unrelated hardcoded content.
 */
export async function searchYouTubeCourses(
  query: string,
  options?: { limit?: number; forceError?: boolean; language?: string; duration?: string; sort?: string }
): Promise<YouTubeSearchResponse> {
  // Simulate network latency for realistic UX and skeleton demonstration
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));

  if (options?.forceError) {
    throw new Error('Simulated YouTube API connection failure');
  }

  try {
    const params = new URLSearchParams({ q: query, limit: String(options?.limit || 6) });
    if (options?.language) params.set('language', options.language);
    if (options?.duration) params.set('duration', options.duration);
    if (options?.sort) params.set('sort', options.sort);
    const endpoint = `/api/youtube/search?${params.toString()}`;
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error('YouTube results could not be loaded');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.items)) {
        const items: YouTubeVideo[] = data.items.map((item: any) => ({
          id: item.id || `yt-api-${item.videoId}`,
          videoId: item.videoId || item.id,
          title: item.title || item.snippet?.title,
          channel: item.channel || item.snippet?.channelTitle,
          channelUrl: item.channelUrl,
          duration: item.duration || 'Video',
          thumbnail: item.thumbnail || item.snippet?.thumbnails?.high?.url,
          videoUrl: item.videoUrl || `https://www.youtube.com/watch?v=${item.videoId || item.id}`,
          description: item.description || item.snippet?.description || '',
          publishedDate: item.publishedDate || new Date(item.snippet?.publishedAt).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          }),
          source: 'youtube' as const,
          relevanceReason: 'Top YouTube Search Result',
          topic: item.topic || query,
        }));

        return {
          items,
          totalResults: data.totalResults || items.length,
          isMockFallback: false,
          query,
        };
      }
    }
  } catch (err) {
    console.warn('YouTube backend unavailable, using offline development data:', err);
  }

  return {
    items: [],
    totalResults: 0,
    isMockFallback: false,
    query,
  };
}

/**
 * Retrieves recommended YouTube learning resources for a topic or category
 */
export async function getRecommendedVideos(
  topic?: string,
  limit: number = 6
): Promise<YouTubeVideo[]> {
  const res = await searchYouTubeCourses(topic || 'programming', { limit });
  return res.items;
}
