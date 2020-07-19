<template>
    <div class="edition-wrapper">
        <nav class="ilvn-navbar">
            <n-link class="logo" :to="'/' + ausgabe.code">
                <img v-if="ausgabe.type == 'L'" src="~assets/logos/bl/bl-logo-quer.svg" style="height: 2rem;" />
                <img v-if="ausgabe.type == 'T'" src="~assets/logos/world-cup-2018.png" style="height: 50px;" />
            </n-link>
            <ul v-if="ausgabe.type == 'L'" class="ilvn-nav">
                <li v-for="compseason in compseasons" :key="compseason">
                    <n-link class="ilvn-nav-item yanone" :to="{ path: 'BL' + compseason }" append router-link-active="active">{{ compseason }}. Liga</n-link>
                </li>
                <li>
                    <n-link class="ilvn-nav-item yanone" to="klassement" router-link-active="active">Auswertung</n-link>
                </li>
                <li>
                    <n-link v-if="!ausgabe.registration" class="ilvn-nav-item yanone" to="register">Hier bitte zuerst registrieren</n-link>
                </li>
            </ul>

            <ul v-if="ausgabe.type == 'T'" class="ilvn-nav">
                <li>
                    <n-link class="ilvn-nav-item yanone" to="spiele" router-link-active="active">Spiele</n-link>
                </li>
                <li>
                    <n-link class="ilvn-nav-item yanone" to="groups" router-link-active="active">Gruppen</n-link>
                </li>
                <li>
                    <n-link class="ilvn-nav-item yanone" to="klassement" router-link-active="active">Ranking</n-link>
                </li>
                <li v-if="!ausgabe.registration">
                    <n-link class="ilvn-nav-item yanone" to="register" router-link-active="active">Registrierung</n-link>
                </li>
            </ul>
        </nav>

        <section class="content">
            <nuxt-child />
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
        this.$store.commit('ausgabe/setAusgabe', this.ausgabe)
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
<style lang="css" scoped>
.edition-wrapper {
    border: 1px dotted red;
}
.ilvn-navbar {
    position: sticky;
    top: 0;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    padding: 0 1rem;

    background: #e8e8e8;
    box-shadow: 2px 4px 5px 0 rgba(0, 0, 0, 0.2);
}
.ilvn-navbar .logo {
    display: inline-block;
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
}
.ilvn-navbar .ilvn-nav {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    margin: 0;
    list-style: none;
}

.ilvn-navbar .ilvn-nav-item {
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
}

section.content {
    background: white;
}
</style>
