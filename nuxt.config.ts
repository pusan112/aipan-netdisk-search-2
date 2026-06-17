export default defineNuxtConfig({
    devtools: { enabled: false },

    ssr: {
        noExternal: ['video.js']
    },

    build: {
        transpile: ['video.js']
    },

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
                            if (id.includes('video.js')) return 'video-js'
                            if (id.includes('vue') || id.includes('@vue')) return 'vue-vendor'
                            if (id.includes('element-plus')) return 'element-plus'
                        }
                    }
                }
            }
        }
    },

    app: {
        pageTransition: { name: 'page', mode: 'out-in' },

        head: {
            title: '爱盼：资源随心，娱乐无限',

            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'referrer', content: 'no-referrer' }
            ]
        }
    },

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

    i18n: {
        defaultLocale: 'cn',
        langDir: './assets/lang/',
        locales: [
            { code: 'en', name: 'English', file: 'en-US.json' },
            { code: 'cn', name: '中文', file: 'zh-CN.json' }
        ]
    },

    nitro: {
        experimental: {
            wasm: true
        }
    },

    runtimeConfig: {
        adminUser: process.env.ADMIN_USER,
        adminPassword: process.env.ADMIN_PASSWORD,
        adminEmail: process.env.ADMIN_EMAIL,
        jwtSecret: process.env.JWT_SECRET
    },

    compatibilityDate: '2024-09-12'
})
