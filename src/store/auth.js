export const state = () => ({
    counter: 0,
    token: '',
    expiration: null,
    account: {},
})

export const mutations = {
    setLoginData(state, { token, expiration, account }) {
        state.counter++
        state.token = token
        state.expiration = expiration
        if (account) state.account = account
        localStorage.setItem('auth', JSON.stringify({ token, expiration, account }))
        document.cookie = `geheimtipp-token=${token}; expires=Thu, 18 Aug 2020 12:00:00 UTC; path=/`

        console.log('auth', token, expiration, account)
    },
    loadAuth(state) {
        const authStr = localStorage.getItem('auth')
        if (authStr) {
            const auth = JSON.parse(authStr)
            state.token = auth.token
            state.expiration = auth.expiration
            if (auth.account) state.account = auth.account
        }
        console.log('loadAuth', state.token, state.expiration, state.account)
    },
}

export const actions = {
    loadAuth({ commit }, params) {
        const authStr = localStorage.getItem('auth')
        if (authStr) {
            const auth = JSON.parse(authStr)
            commit('setLoginData', auth)
        }
    },
}
