export const actions = {
    nuxtServerInit({ commit }, { req }) {
        const token = parseCookie(req.headers.cookie)
        if (token) {
            commit('setLoginData', { token })
            console.log(token)
        }
    },
}

function parseCookie(cookies) {
    const cookie = cookies.split(';').find((value) => value.includes('geheimtipp-token'))

    if (cookie) {
        const token = cookie.split('=')[1]
        if (token !== null) {
            return token
        }
        return null
    }
}
