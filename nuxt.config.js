export default {
    mode: 'universal',
    srcDir: 'src/',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || '',
            },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    pwa: {
        manifest: {
            lang: 'de',
            name: 'Geheimtipp',
            short_name: 'Geheimtipp',
            // start_url: 'https://ihleven.de/geheimtipp/',
            display: 'fullscreen',
        },
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [
        'bootstrap/dist/css/bootstrap.css',
        '~/assets/styles/styles.css',
        // 'node_modules/flag-icon-css/css/flag-icon.css',
        // 'node_modules/font-awesome/css/font-awesome.css',
        '~/assets/styles/fonts.css',
        '~/assets/styles/deSandro.css',
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: ['@/plugins/filters'],
    /*
     ** Nuxt.js dev-modules
     */

    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module',
        '@nuxtjs/pwa',
    ],
    /*
     ** Nuxt.js modules
     */
    // modules: ['@nuxtjs/axios', '@nuxtjs/auth'],
    // auth: {
    //     strategies: {
    //         local: {
    //             endpoints: {
    //                 login: { url: 'https://ihleven.de/token-auth', method: 'post', propertyName: 'token' },
    //                 logout: { url: '/api/auth/logout', method: 'post' },
    //                 user: { url: '/api/auth/user', method: 'get', propertyName: 'user' },
    //             },
    //             // tokenRequired: true,
    //             // tokenType: 'bearer',
    //             // globalToken: true,
    //             autoFetchUser: false,
    //         },
    //     },
    // },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {},
    },
}
