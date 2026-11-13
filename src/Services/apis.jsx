// Relative URL: in Docker the API and the frontend share one origin; in local dev
// the CRA "proxy" setting in package.json forwards /api to the backend.
export const BASE_URL = process.env.REACT_APP_API_URL || "/api/v1";



// Auth Endpoints
export const endpoints = {
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
}
