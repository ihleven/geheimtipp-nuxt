<template>
    <div>
        <div class="container-fluid">
            <div class="spieltage-list">
                <nav aria-label="Spieltage">
                    <ul v-for="phase in compseason.phases" :key="phase.id" class="pagination pagination-sm">
                        {{
                            phase.type == 'HR' ? 'Hinrunde:' : 'Rückrunde:'
                        }}
                        <li v-for="round in phase.gameweek_range" :key="round" class="page-item" active-class="active">
                            <n-link class="page-link" :to="`${round}`" append :class="{ disbled: false }" style="width: 2.5em; text-align: center;">
                                {{ round }}
                            </n-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <!--<ul class="nav nav-tabs">
        <li class="nav-item" *ngFor="let phase of compSeason?.phases">
            <a class="nav-link active" routerLink="io">{{phase}}</a>
        </li>
    </ul>-->

        <nuxt-child />
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props: {
        // eslint-disable-next-line vue/require-default-prop
        ausgabe: Object,
    },
    // https://ihleven.de/api/v1/compseasons/12020
    async fetch() {
        const liga = this.$route.params.liga.replace(/BL/g, '')
        const season = this.$route.params.ausgabe
        const compseason = +liga * 10000 + +season
        console.log('async fetch liga:', compseason)
        const response = await axios.get('https://ihleven.de/api/v1/compseasons/' + compseason, {
            headers: {
                Authorization:
                    'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Im1hdHQiLCJleHAiOjE1OTYwNDg3NzYsImVtYWlsIjoibWF0dC5paGxlQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNTk0ODM5MTc2fQ.0-cdvZdveMZLnqM2wm19r5M3sb4Ehfc6dn83vtt7KR0',
            },
        })
        this.compseason = response.data
        this.compseason.phases.sort((p1, p2) => (p1.id > p2.id ? 1 : p1.id < p2.id ? -1 : 0))
        this.rounds = this.compseason.rounds.reduce(function (acc, cur, i) {
            acc[cur.no] = cur
            return acc
        }, {})
        this.activeRound = this.$route.params.spieltag
        console.log('compseason:', this.compseason)
    },
    fetchOnServer: false,
    data() {
        return {
            compseason: {},
            rounds: {},
            activeRound: null,
        }
    },
    computed: {},
    mounted() {
        console.log('LeagueSeasonComponent => compSeason:', this.rounds)
        console.log('LigaComponent: compseason', this.compseason, this.ausgabe)
    },
}
</script>
<style scoped>
.root {
    /* margin-top: 80px;
    border: 1px solid black; */
}
.spieltage-list {
    padding: 10px 0;
    text-align: center;
    border-bottom: 1px solid black;
}
a.disabled {
    pointer-events: none;
    cursor: default;
    color: grey;
}
</style>
