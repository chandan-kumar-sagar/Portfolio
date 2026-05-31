/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_OWNER_NAME: string;
  readonly VITE_OWNER_TITLE: string;
  readonly VITE_OWNER_EMAIL: string;
  readonly VITE_OWNER_PHONE: string;
  readonly VITE_GITHUB_URL: string;
  readonly VITE_LINKEDIN_URL: string;
  readonly VITE_RESUME_URL: string;
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
