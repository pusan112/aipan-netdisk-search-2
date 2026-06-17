export default defineNuxtConfig({
    devtools: { enabled: false },

    // ✅ SSR 修复（video.js 必须）
    ssr: {
        noExternal: ['video.js']
    },

    // ✅ Vite 构建优化（解决 Rollup + video.js）
    vite: {
        optimizeDeps: {
            include: ['video.js']
        },

        build: {
            chunkSizeWarningLimit: 3000,

            rollupOptions: {
                treeshake: true,

                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            if (id.includes('video.js')) {
                                return 'video-js'
                            }

                            if (id.includes('vue') || id.includes('@vue')) {
                                return 'vue-vendor'
                            }

                            if (id.includes('element-plus')) {
                                return 'element-plus'
                            }
                        }
                    }
                }
            }
        }
    },

    // =====================
    // App config
    // =====================
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },

        head: {
            title: '爱盼：资源随心，娱乐无限',

            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
                },
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ],

            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'referrer', content: 'no-referrer' },

                { name: 'keywords', content: '爱盼,网盘搜索,影视资源,TVBox,音乐下载' },
                { name: 'description', content: '开源资源搜索平台' },

                { property: 'og:title', content: '爱盼' },
                { property: 'og:description', content: '资源搜索平台' },
                { property: 'og:image', content: 'https://aipan.me/logo.png' },
                { property: 'og:url', content: 'https://aipan.me' }
            ],

            script: [
                {
                    src: 'https://www.googletagmanager.com/gtag/js?id=G-17SPF6S871',
                    async: true
                },
                { src: '/ga.js' },
                { src: '/qrcode.min.js' },
                {
                    src: 'https://challenges.cloudflare.com/turnstile/v0/api.js'
                },
                {
                    src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8210373406341452',
                    async: true,
                    crossorigin: 'anonymous'
                }
            ]
        }
    },

    // =====================
    // Modules
    // =====================
    modules: [
        '@element-plus/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/device',
        '@nuxtjs/i18n',
        '@nuxtjs/google-fonts',
        '@nuxtjs/color-mode',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@nuxtjs/sitemap'
    ],

    css: ['~/assets/css/main.css'],

    colorMode: {
        preference: 'light',
        classSuffix: ''
    },

    tailwindcss: {
        configPath: 'tailwind.config.js'
    },

    googleFonts: {
        display: 'swap',
        download: false,
        families: {
            Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
            'Noto Sans Simplified Chinese': [100, 400, 700]
        }
    },

    i18n: {
        defaultLocale: 'cn',
        langDir: './assets/lang/',
        locales: [
            {
                code: 'en',
                name: 'English',
                file: 'en-US.json'
            },
            {
                code: 'cn',
                name: '中文',
                file: 'zh-CN.json'
            }
        ]
    },

    nitro: {
        devProxy: {
            '/aipanme': {
                target: '',
                changeOrigin: true
            }
        },

        experimental: {
            wasm: true
        }
    },

    runtimeConfig: {
        adminUser: process.env.ADMIN_USER,
        adminPassword: process.env.ADMIN_PASSWORD,
        adminEmail: process.env.ADMIN_EMAIL,
        jwtSecret: process.env.JWT_SECRET,

        public: {
            GITHUB_OWNER: process.env.NUXT_PUBLIC_GITHUB_OWNER,
            GITHUB_REPO: process.env.NUXT_PUBLIC_GITHUB_REPO,
            GITHUB_TOKEN: process.env.NUXT_PUBLIC_GITHUB_TOKEN,
            GITHUB_BRANCH: process.env.NUXT_PUBLIC_GITHUB_BRANCH
        }
    },

    sitemap: {
        sources: ['/api/__sitemap__/urls'],
        exclude: ['/admin/**']
    },

    site: {
        name: '爱盼 - 资源随心，娱乐无限',
        url: 'https://www.aipan.me',
        description: '开源资源搜索平台'
    },

    compatibilityDate: '2024-09-12'
})
