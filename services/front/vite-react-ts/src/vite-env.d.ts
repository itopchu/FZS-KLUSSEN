/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PORT_BACKEND: string
    readonly VITE_PORT_FRONTEND: string
    readonly VITE_DOMAIN_NAME: string
    readonly VITE_DOMAIN_EMAIL: string
    readonly VITE_SERVICE_BACKEND: string
    readonly VITE_URL_BACKEND: string
    readonly VITE_PROJECT_NAME: string
    readonly VITE_SITE_RIGHTS: string
    readonly VITE_SITE_SHORT_NAME: string
    readonly VITE_SITE_PHONE: string
    readonly VITE_SITE_EMAIL: string
    readonly VITE_SITE_LOGO: string
    readonly VITE_SITE_BANNER: string

}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}