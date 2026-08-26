import { Course } from '../types/course';
import { mockCoursesData } from '../data/courses';

/**
 * StudyAI Platform Course Service
 */

export interface CourseFilterOptions {
  category?: string;
  difficulty?: string;
  status?: string;
  duration?: string;
  sortBy?: string;
}

/**
 * Searches platform courses based on textual query and optional filters
 */
export function searchStudyAICourses(
  query: string,
  options?: CourseFilterOptions
): Course[] {
  let results = [...mockCoursesData];

  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    const searchTerms = q.split(/\s+/).filter(Boolean);

    results = results.filter((course) => {
      const title = course.title.toLowerCase();
      const desc = course.description.toLowerCase();
      const instructor = course.instructor.toLowerCase();
      const category = course.category.toLowerCase();
      const objectives = (course.whatYouWillLearn || []).join(' ').toLowerCase();

      // Direct phrase match
      if (
        title.includes(q) ||
        desc.includes(q) ||
        instructor.includes(q) ||
        category.includes(q) ||
        objectives.includes(q)
      ) {
        return true;
      }

      // Keyword match
      return searchTerms.some(
        (term) =>
          title.includes(term) ||
          category.includes(term) ||
          objectives.includes(term)
      );
    });
  }

  // Filter by category
  if (options?.category && options.category !== 'All' && options.category !== 'All Courses') {
    results = results.filter(
      (c) => c.category.toLowerCase() === options.category!.toLowerCase()
    );
  }

  // Filter by difficulty
  if (options?.difficulty && options.difficulty !== 'all') {
    results = results.filter((c) => c.difficulty === options.difficulty);
  }

  // Filter by status
  if (options?.status && options.status !== 'all') {
    results = results.filter((c) => c.status === options.status);
  }

  // Filter by duration
  if (options?.duration && options.duration !== 'all') {
    results = results.filter((c) => {
      const hours = c.durationHours || 0;
      switch (options.duration) {
        case 'under-5':
          return hours < 5;
        case '5-10':
          return hours >= 5 && hours <= 10;
        case '10-20':
          return hours > 10 && hours <= 20;
        case '20-plus':
          return hours > 20;
        default:
          return true;
      }
    });
  }

  // Sorting
  if (options?.sortBy) {
    results.sort((a, b) => {
      switch (options.sortBy) {
        case 'popular':
          return (b.studentsEnrolled || 0) - (a.studentsEnrolled || 0);
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'duration-asc':
          return (a.durationHours || 0) - (b.durationHours || 0);
        case 'duration-desc':
          return (b.durationHours || 0) - (a.durationHours || 0);
        case 'beginner-friendly': {
          const rank = { Beginner: 1, Intermediate: 2, Advanced: 3 };
          return rank[a.difficulty] - rank[b.difficulty];
        }
        default:
          return 0;
      }
    });
  }

  return results;
}

export function getFeaturedCourses(): Course[] {
  return mockCoursesData.filter((c) => c.featured);
}

export function getCourseByIdOrSlug(identifier: string): Course | undefined {
  return mockCoursesData.find((c) => c.slug === identifier || c.id === identifier);
}

export function getCoursesByCategory(category: string): Course[] {
  if (!category || category === 'All Courses' || category === 'All') {
    return mockCoursesData;
  }
  return mockCoursesData.filter(
    (c) => c.category.toLowerCase() === category.toLowerCase()
  );
}
