import posthog from 'posthog-js';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY || 'phc_tZEysUqymcjUVCcKcvioofdps25FiPhMAjXQy9pddsnB';
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

let isInitialized = false;

export const initPostHog = () => {
  if (typeof window === 'undefined' || isInitialized) return posthog;

  // Avoid firing analytics during prerendering build steps (react-snap)
  if (navigator.userAgent && navigator.userAgent.includes('ReactSnap')) {
    return posthog;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    persistence: 'memory', // Cookieless/memory-only persistence to respect privacy without cookie banner
    autocapture: true,
    capture_pageview: false, // Tracked manually via router to ensure clean SPA transitions
    capture_pageleave: true,
    disable_session_recording: true, // Cookieless mode
  });

  isInitialized = true;
  return posthog;
};

export default posthog;
