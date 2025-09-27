export default {
    AppName: process.env.APP_NAME || "HEAPMIND SSO",
    AppUrl: process.env.APP_URL || "http://localhost:5173",
    ApiUrl: process.env.API_URL || "http://localhost:5000",
    CookieDomain: process.env.COOKIE_DOMAIN || "localhost",
    CookieSecure: process.env.COOKIE_SECURE === "true",
    CookieSameSite: (process.env.COOKIE_SAME_SITE as "lax" | "strict" | "none") || "lax",
    SessionSecret: process.env.SESSION_SECRET || "supersecret",
    Port: parseInt(process.env.PORT || "5173", 10),
    NodeEnv: process.env.NODE_ENV || "development",
    IsProduction: process.env.NODE_ENV === "production",
    IsDevelopment: process.env.NODE_ENV === "development",
    IsTest: process.env.NODE_ENV === "test",
    
}