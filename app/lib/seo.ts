import type { MetaDescriptor } from "react-router";

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  siteName?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  noIndex?: boolean;
  canonical?: string;
}

const defaultSEOConfig = {
  siteName: 'HeapMind SSO',
  type: 'website' as const,
  twitterCard: 'summary_large_image' as const,
  image: '/og-image.png', // Default OG image
};

export function generateSEOMeta(config: SEOConfig): MetaDescriptor[] {
  const fullConfig = { ...defaultSEOConfig, ...config };
  const fullTitle = fullConfig.siteName ? `${fullConfig.title} | ${fullConfig.siteName}` : fullConfig.title;

  const meta: MetaDescriptor[] = [
    // Basic meta tags
    { title: fullTitle },
    { name: 'description', content: fullConfig.description },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { charSet: 'utf-8' },
    
    // Keywords
    ...(fullConfig.keywords ? [{ name: 'keywords', content: fullConfig.keywords }] : []),
    
    // Canonical URL
    ...(fullConfig.canonical ? [{ tagName: 'link', rel: 'canonical', href: fullConfig.canonical }] : []),
    
    // Robots meta
    ...(fullConfig.noIndex ? [{ name: 'robots', content: 'noindex, nofollow' }] : [{ name: 'robots', content: 'index, follow' }]),
    
    // Open Graph
    { property: 'og:title', content: fullConfig.title },
    { property: 'og:description', content: fullConfig.description },
    { property: 'og:type', content: fullConfig.type },
    { property: 'og:site_name', content: fullConfig.siteName },
    ...(fullConfig.image ? [{ property: 'og:image', content: fullConfig.image }] : []),
    ...(fullConfig.url ? [{ property: 'og:url', content: fullConfig.url }] : []),
    
    // Twitter Card
    { name: 'twitter:card', content: fullConfig.twitterCard },
    { name: 'twitter:title', content: fullConfig.title },
    { name: 'twitter:description', content: fullConfig.description },
    ...(fullConfig.image ? [{ name: 'twitter:image', content: fullConfig.image }] : []),
    
    // Additional meta for better indexing
    { name: 'theme-color', content: '#000000' },
    { name: 'color-scheme', content: 'light dark' },
    { name: 'format-detection', content: 'telephone=no' },
  ];

  return meta;
}

export function generateLoginPageStructuredData(siteName: string = 'HeapMind SSO') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Sign In - ${siteName}`,
    description: `Secure login page for ${siteName}. Access your account with your email and password.`,
    url: typeof window !== 'undefined' ? window.location.href : '',
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: typeof window !== 'undefined' ? window.location.origin : '',
    },
    mainEntity: {
      '@type': 'WebApplication',
      name: `${siteName} Login`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web Browser',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: typeof window !== 'undefined' ? window.location.origin : '',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Sign In',
          item: typeof window !== 'undefined' ? window.location.href : '',
        },
      ],
    },
  };
}

export function generateAuthPageKeywords(): string {
  return 'login, sign in, authentication, secure login, user account, HeapMind, SSO, single sign on, access account, user portal, secure access, member login';
}