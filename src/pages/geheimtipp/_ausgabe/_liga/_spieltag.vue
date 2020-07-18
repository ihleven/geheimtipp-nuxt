<template>
    <div>
        <div v-if="gameweek" class="container">
            <h3>
                {{ gameweek.label }} <small>{{gameweek.from_date|date: 'd. MMM. yyyy'}} - {{gameweek.until_date|date: 'd. MMM. yyyy'}}</small>
            </h3>
            <div class="alert alert-info">
                <i class="fa fa-warning"></i>
                Achtung: Aktuell werden _nicht_ alle ausgefüllten Tipps zusammen abgeschickt. Es müssen alle Tippeingabefelder einzeln abgeschickt werden
                (Return oder Button).
            </div>
        </div>

        <table v-if="spieltag && spieltag.matches" class="table table-condensed table-desktop">
            <thead>
                <tr>
                    <td colspan="3" class="c"></td>
                    <th></th>
                    <th v-for="spiel in spieltag.matches" :key="spiel.id" class="c">
                        <strong class="ergebnis">{{ spiel.kickoff| date: 'EEE, HH:mm' }}</strong>
                    </th>
                </tr>
                <tr>
                    <th colspan="4"></th>
                    <th v-for="spiel in spieltag.matches" :key="spiel.id" style="position: relative;">
                        <n-link
                            class="paarung card card-link"
                            :to="spiel.match_no"
                            :style="{ 'background-image': 'url(assets/logos/clubs/' + spiel.away.team + '.svg)' }"
                        >
                            <div class="hteamnarrow" :style="{ 'background-image': 'url(assets/logos/clubs/' + spiel.home.team + '.svg)' }">
                                <span class="outline">{{ spiel.home.team }}</span>
                            </div>
                            <strong class="abserg outline" style="margin: 5px -5px 0; z-index: 1000;">{{ spiel.result }}</strong>
                            <div class="ateamnarrow" :style="{ 'background-image': 'url(assets/logos/clubs/' + spiel.away.team + '.svg)' }">
                                <div class="outline">{{ spiel.away.team }}</div>
                            </div>
                        </n-link>
                    </th>
                </tr>

                <tr>
                    <th colspan="4"></th>
                    <td v-for="spiel in spieltag.matches" :key="spiel.id" class="c">
                        <strong class="ergebnis">{{ spiel.home.team }} - {{ spiel.away.team }}</strong>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" class="c"></td>
                    <th></th>
                    <th v-for="spiel in spieltag.matches" :key="spiel.id" class="c">
                        <strong class="ergebnis">{{ spiel.result }}</strong>
                    </th>
                </tr>
            </thead>

            <tbody>
                <template v-for="t in spieltag.tipper" class="slide">
                    <tr :key="t.id">
                        <td class="r">
                            <small v-if="t.tag">{{ t.tag.platzierung }}.</small>
                        </td>

                        <td class="tt">
                            <span v-if="t.tag" :title="t.tag.auszahlung">{{ t.tag.auszahlung | number }}</span>
                        </td>

                        <td>
                            <div v-if="t.tag" class="gruen">{{ t.tag.platzpunkte_tw }}</div>
                        </td>

                        <td class="avatar" :style="{ 'background-image': 'url(/media/avatars/thumbs/24/' + t.avatar_id + '.png)' }">
                            <strong>{{ t.name }}</strong>
                        </td>

                        <td v-for="spiel in spieltag.matches" :key="spiel.id" class="c">
                            <tipp :match-id="spiel.id" :tipp="t.tipps[spiel.id]" :readonly="t.id != tipper.id" :deadline="spiel.kickoff"></tipp>
                        </td>

                        <!--<td class="c" *ngFor="let klassement of spieltag.klassements" >
                {{a.trikots[klassement.etappe.id].score_auskommentiert}}
            </td>-->
                        <td></td>
                        <td class="b">
                            <span v-if="t.tag">{{ t.tag.punkte }}</span>
                        </td>
                        <td class="tt detail"><small></small></td>

                        <td class="b">
                            <!-- <small>{{ t.gesamt.pos }}.</small> {{ t.gesamt.score }} -->
                        </td>
                    </tr>

                    <tr v-if="t.id === tipper.id && false" :key="t.id" novalidate @submit="onSubmit()">
                        <td colspan="4">{{ tipper.id }}</td>
                        <td v-for="spiel in spieltag.spiele" :key="spiel.id" class="c">
                            <input class="form-control erg" @keyup.enter="onSubmit()" />
                        </td>
                        <td colspan="3"><button type="submit" @click="onSubmit()"></button></td>
                    </tr>
                    <!-- <tr :key="t.id" formGroup="tippForm" novalidate @submit="onSubmit()">
                        <td colspan="4"></td>
                        <td v-for="spiel in spieltag.matches" :key="spiel.id" class="c">
                            <input class="form-control erg" :formControlName="spiel.id" @keyup.enter="onSubmit()" />
                        </td>
                        <td colspan="3"><button type="submit" @click="onSubmit()"></button></td>
                    </tr> -->
                </template>
            </tbody>
        </table>

        <div v-if="debug === true">
            <p>Form value: {{ tippForm.value | json }}</p>
            <p>Form status: {{ tippForm.status | json }}</p>
            <p>Form status: {{ tippForm.status | json }}</p>
            <p>Form dirty: {{ tippForm.dirty | json }}</p>
            <p>Form pristine: {{ tippForm.pristine | json }}</p>
            <p>Form touched: {{ tippForm.touched | json }}</p>

            <ul v-if="spieltag && spieltag.evaluations">
                <li v-for="a in spieltag.evaluations" :key="a.id" class="slide">
                    {{ a.id }}
                </li>
            </ul>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <nuxt-child :match="spieltag ? spieltag.matches[0] : { match_no: 1, group: { label: 'A' }, round: { label: 'A' }, team1: {}, team2: {}, venue: {} }" />
    </div>
</template>

<script>
// import { Component, Injectable } from '@angular/core';
// import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { Router, ActivatedRoute, Params, Resolve, ActivatedRouteSnapshot } from '@angular/router';

// import { GeheimtippService } from '../../../_services/geheimtipp.service';
// import { AuthenticationService } from '../../../_services/auth.service';
// import { Observable } from 'rxjs';
// import { Ausgabe } from '../../../_models';
// import { Registration } from '../../../_models/registration';

// export class SpieltagComponent {}

import axios from 'axios'
import Tipp from '@/components/Tipp'
export default {
    components: {
        Tipp,
    },
    // constructor(
    //     private route: ActivatedRoute,
    //     private router: Router,
    //     private api: GeheimtippService,
    //     private fb: FormBuilder,
    //     private auth: AuthenticationService
    // ) {}
    // props: {
    //     // eslint-disable-next-line vue/require-default-prop
    //     ausgabe: Object,
    // },
    // https://ihleven.de/api/v1/compseasons/12020
    async fetch() {
        const season = this.$route.params.ausgabe
        const liga = this.$route.params.liga.replace(/BL/g, '')
        const spieltag = this.$route.params.spieltag
        const id = +liga * 1000000 + +season * 100 + +spieltag
        console.log('CompRoundResolve: resolving compRound:', id)

        const response = await axios.get('https://ihleven.de/api/v1/comprounds/' + id, {
            headers: {
                Authorization:
                    'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Im1hdHQiLCJleHAiOjE1OTYwNDg3NzYsImVtYWlsIjoibWF0dC5paGxlQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNTk0ODM5MTc2fQ.0-cdvZdveMZLnqM2wm19r5M3sb4Ehfc6dn83vtt7KR0',
            },
        })
        this.spieltag = response.data
        console.log(' this.spieltag:', this.spieltag)
    },
    fetchOnServer: false,
    data() {
        return {
            debug: false,
            gameweek: null,
            ausgabe: null,
            compSeason: null,
            spieltag: null,
            block: null,
            errorMessage: null,
            tipper: { id: 1 },
            tippForm: null,

            test: [{ a: 10 }, { a: 2 }, { a: 89 }, { a: 3 }],
            test2: [{ a: { b: 2 } }, { a: { b: 21 } }, { a: { b: 1 } }, { a: { b: 12 } }],
        }
    },
    computed: {},
    mounted() {
        console.log('LeagueSeasonComponent => compSeason:', this.round)
    },
    methods: {
        ngOnInit() {
            this.ausgabe = this.route.parent.parent.snapshot.data.ausgabe
            this.tipper = this.ausgabe.registration
            this.compSeason = this.route.parent.snapshot.data.compSeason

            this.route.params.subscribe((params) => {
                const compseasonRoundGefiltert = this.compSeason.rounds.filter((r) => r.no === params.spieltag)
                if (compseasonRoundGefiltert.length) {
                    this.gameweek = compseasonRoundGefiltert[0]
                } else {
                    this.gameweek = { no: params.spieltag }
                }

                this.spieltag = this.route.snapshot.data.compRound
                console.log('CompRoundComponent => compRound:', this.spieltag, params.spieltag, this.gameweek)
                this.sort('gesamt')
                this.createForm()
            })
        },
        sort(col) {
            let sortfunc
            if (col === 'gesamt') {
                sortfunc = function (a, b) {
                    if (!a.gesamt || !a.gesamt.score) return 0
                    return a.gesamt.score === b.gesamt.score ? 0 : a.gesamt.score > b.gesamt.score ? -1 : 1
                }
            } else if (col === 'tag') {
                sortfunc = function (a, b) {
                    if (a.tag && b.tag) return a.tag.platzierung === b.tag.platzierung ? 0 : a.tag.platzierung > b.tag.platzierung ? 1 : -1
                    else return a.tag ? -1 : 1
                }
            }

            this.spieltag.tipper.sort(sortfunc)
        },

        createForm() {
            // const tipperId = this.tipper.id

            if (this.auth.account.id !== this.tipper.account) {
                // throw 'Assertion failed: tipperId != this.tipper.id'
            }
            const auswertung = this.spieltag.tipper.find((t) => t.id === this.tipper.id)
            console.log(auswertung)
            const formModel = {}
            for (const match of this.spieltag.matches) {
                formModel[match.id] = auswertung && auswertung.tipps && auswertung.tipps[match.id] ? auswertung.tipps[match.id].ergebnis : ''
                console.log(formModel[match.id], match.id)
            }
            this.tippForm = this.fb.group(formModel)
        },
        onSubmit() {
            console.log('submmit', this.tippForm.value)
            // this.api
        },
    },
}
</script>

<style scoped>
.table-desktop .avatar {
    padding-left: 32px;
    background-size: 24px;
    background-repeat: no-repeat;
    background-position: left center;
    text-align: left;
}
.table-desktop {
    font-size: 13px;
}
.table-desktop > thead > tr > th,
.table-desktop > thead > tr > td,
.table-desktop > tfoot > tr > th,
.table-desktop > tfoot > tr > td {
    border-top-width: 0;
    border-bottom-width: 0;
}
.table-desktop .gruen {
    padding-left: 7px;
    padding-right: 7px;
    text-align: center;
    background: url(/img/img/trikot-gruen.svg) no-repeat center center;
    -webkit-background-size: contain;
    background-size: contain;
}

.table th,
table td {
    text-align: center;
}
.table td {
    padding: 7px;
    height: 20px;
    vertical-align: middle;
    font-size: 15px;
}
.erg {
    text-align: center;
    border-color: black;
    margin: auto;
    padding: 2px;
    width: 3em;
    height: auto;
    font-size: 13px;
    font-weight: bold;
    margin-top: -10px;
    border-radius: 5px;
}

.paarung {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 100%;
}
.hteamnarrow {
    background-size: 1rem;
    background-repeat: no-repeat;
    background-position: 0%;
}
.ateamnarrow {
    background-size: 1rem;
    background-repeat: no-repeat;
    background-position: 100%;
}
</style>
