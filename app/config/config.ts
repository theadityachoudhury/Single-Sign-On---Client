export default {
    APP_NAME: import.meta.env.VITE_APP_NAME || "HEAPMIND SSO",
    COMPANY_NAME: import.meta.env.VITE_COMPANY_NAME || "HeapMind",
    APP_URL: import.meta.env.VITE_APP_URL || "http://localhost:5173",
    API_URL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    COOKIE_DOMAIN: import.meta.env.VITE_COOKIE_DOMAIN || "localhost",
    COOKIE_SECURE: import.meta.env.VITE_COOKIE_SECURE === "true",
    COOKIE_SAME_SITE: (import.meta.env.VITE_COOKIE_SAME_SITE as "lax" | "strict" | "none") || "lax",
    SESSION_SECRET: import.meta.env.VITE_SESSION_SECRET || "supersecret",
    PORT: parseInt(import.meta.env.VITE_APP_PORT || "5173", 10),
    NODE_ENV: import.meta.env.MODE || "development",
    IsProduction: import.meta.env.MODE === "production",
    IsDevelopment: import.meta.env.MODE === "development",
    IsTest: import.meta.env.MODE === "test",

}