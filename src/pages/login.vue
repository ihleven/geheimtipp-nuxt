<template>
    <div class="d-flex align-items-center flex-column justify-content-center h-100 bg-dark text-white">
        <!--<h1 class="display-4">Hello.</h1>-->
        <form name="form" novalidate @submit.prevent="userLogin">
            <div class="form-group username">
                <label for="username" class="sr-only">Username</label>
                <input
                    v-model="login.username"
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Benutzername"
                    name="username"
                    required
                    autofocus
                />
            </div>

            <div class="form-group password">
                <label for="password" class="sr-only">Passwort</label>
                <input v-model="login.password" type="password" class="form-control form-control-lg" placeholder="Passwort" name="password" required />
            </div>

            <!--<div class="checkbox">
                <label>
                    <input type="checkbox" value="remember-me" ng-model='loginform.rememberMe' > dauerhaft anmelden
                </label>
            </div>-->
            <button class="btn-outline-light btn-lg btn-block" type="submit">
                Anmelden
                <i class="fa" :class="loading ? 'fa-spinner fa-spin' : 'fa-sign-in'"></i>
            </button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
// import { mapMutations } from 'vuex'

export default {
    layout: 'default',
    data() {
        return {
            loading: false,
            login: {
                username: '',
                password: '',
            },
        }
    },
    methods: {
        async userLogin() {
            console.log('user:')
            try {
                const response = await axios.post('https://ihleven.de/token-auth', this.login, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                this.$store.commit('auth/setLoginData', response.data)
                this.$router.push('/geheimtipp')
            } catch (err) {
                console.log('$auth.loginWich ERROR', err)
            }

            // try {
            //     const response = await this.$auth.loginWith('local', { data: this.login })
            //     console.log('$auth.loginWich SUCCESS', response.data)
            // } catch (err) {
            //     console.log('$auth.loginWich ERROR', err)
            // }
        },
    },
}
</script>

<style lang="css" scoped>
.checkbox {
    margin-bottom: 10px;
}
.form-signin .checkbox {
    font-weight: normal;
}

.form-signin .form-control {
    position: relative;
    height: auto;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
}
.form-control:focus {
    z-index: 2;
}
.form-group.username {
    padding-bototm: 0px;
    margin-bottom: 0;
}
.form-group.username input {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
.form-group.password input[type='password'] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>
