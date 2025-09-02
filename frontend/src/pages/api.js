import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});


// Add CSRF token to requests
api.interceptors.request.use(config => {
    config.headers['X-CSRF-Token'] = getCSRFToken();
    return config;
});

// Response interceptor
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Skip interceptor for login/refresh routes
        const urlList = ['/api/login', '/api/users', '/api/users/update', '/api/users/record', '/api/reviews', '/api/reviews/record'];
        if (urlList.includes(originalRequest.url)) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Attempt refresh
                await axios.post('/api/refresh', {}, {
                    withCredentials: true
                });

                // Retry original request
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed - force logout
                localStorage.removeItem('user');
                window.location.href = '/login?session_expired=true';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export function getCSRFToken() {
    // 1. Get cookie value (works with libraries like js-cookie or universal-cookie)
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

    // 2. Fallback to meta tag (for SSR frameworks like Next.js)
    const metaTagValue = document.querySelector('meta[name="csrf-token"]')?.content;

    return cookieValue || metaTagValue || '';
}

export default api;