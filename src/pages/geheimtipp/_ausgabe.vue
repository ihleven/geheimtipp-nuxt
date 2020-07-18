<template>
    <div class="edition-wrapper">
        <!--<h1 class="text-hide" style="background-image: url('/assets/logos/logo-WM2014.svg'); width: 500px; height: 500px;">Bootstrap</h1>-->

        <nav class="navbar navbar-expand-sm navbar-light root sticky-top">
            <n-link class="navbar-brand" :to="'/' + ausgabe.code">
                <img v-if="ausgabe.type == 'L'" src="~assets/logos/bl/bl-logo-quer.svg" style="height: 2rem;" />
                <img v-if="ausgabe.type == 'T'" src="~assets/logos/world-cup-2018.png" style="height: 50px;" />
            </n-link>

            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div id="navbarNav" class="collapse navbar-collapse">
                <ul v-if="ausgabe.type == 'L'" class="navbar nav">
                    <li v-for="compseason in compseasons" :key="compseason" class="nav-item">
                        <n-link class="nav-link yanone menu-link" :to="{ path: 'BL' + compseason }" append router-link-active="active"
                            >{{ compseason }}. Liga</n-link
                        >
                    </li>
                    <li class="nav-item">
                        <n-link class="nav-link yanone menu-link" to="klassement" router-link-active="active">Auswertung</n-link>
                    </li>
                    <li class="nav-item">
                        <n-link v-if="!ausgabe.registration" class="nav-link yanone menu-link red" to="register">Hier bitte zuerst registrieren</n-link>
                    </li>
                </ul>

                <ul v-if="ausgabe.type == 'T'" class="navbar-nav">
                    <li class="nav-item" routerLinkActive="active">
                        <n-link class="nav-link yanone menu-link" to="spiele" router-link-active="active">Spiele</n-link>
                    </li>
                    <li class="nav-item">
                        <n-link class="nav-link yanone menu-link" to="groups" router-link-active="active">Gruppen</n-link>
                    </li>
                    <li class="nav-item" routerLinkActive="active">
                        <n-link class="nav-link yanone menu-link" to="klassement" router-link-active="active">Ranking</n-link>
                    </li>
                    <li v-if="!ausgabe.registration" class="nav-item" routerLinkActive="active">
                        <n-link class="nav-link yanone menu-link" to="register" router-link-active="active">Registrierung</n-link>
                    </li>
                </ul>
            </div>
        </nav>

        <section class="content">
            <nuxt-child :ausgabe="ausgabe" />
        </section>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    async fetch() {
        console.log('async fetch:', this.$route.params.ausgabe)
        const response = await axios.get('https://ihleven.de/api/v1/ausgaben/' + this.$route.params.ausgabe, {
            headers: {
                Authorization:
                    'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Im1hdHQiLCJleHAiOjE1OTYwNDg3NzYsImVtYWlsIjoibWF0dC5paGxlQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNTk0ODM5MTc2fQ.0-cdvZdveMZLnqM2wm19r5M3sb4Ehfc6dn83vtt7KR0',
            },
        })
        this.ausgabe = response.data
        console.log('ausgabe:', this.ausgabe)
    },
    fetchOnServer: false,
    data() {
        return {
            ausgabe: { type: '', code: '', compseasons: [] },
        }
    },
    computed: {
        compseasons() {
            return this.ausgabe.compseasons.map((compseason) => Number((compseason + '').substring(0, 1))) // 12020 => 1
        },
    },
    mounted() {
        console.log('AusgabeComponent: ausgabe', this.$route.params.ausgabe, ' => ', this.compseasons)
    },
}
</script>

<style scoped>
.root {
    padding-top: 0;
    padding-bottom: 0;
    border: 0px solid green;
    background-color: white;
    background: #e8e8e8;
    box-shadow: 2px 4px 5px 0 rgba(0, 0, 0, 0.2);
}

.edition-wrapper {
    border: 1px dotted red;
}

.menu-link {
    font-size: 200%;
    font-wight: bold;
    padding-top: 0;
    padding-bottom: 0;
}
section.content {
    background: white;
}
.red {
    color: red;
}
</style>
