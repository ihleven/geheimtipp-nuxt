<template>
    <div v-if="match" class="section-match">
        <div class="grid-container">
            <div class="intro outline">
                Spiel {{ match.match_no }}
                <h5 class="">
                    <span v-if="match.group">
                        <n-link :to="['/', ausgabe.code, 'groups', match.group]">Gruppe {{ match.group }}</n-link
                        >,
                    </span>
                    <n-link :to="['..']">{{ match.round }}</n-link>
                </h5>
            </div>
            <!--
            <n-link class="prev" :to="prev" :class="{ disabled: !prev }" :href="prev ? '#' : null">
                <i class="fa fa-2x outline" :class="loadingLeft ? 'fa-spin fa-spinner' : 'fa-chevron-left'"></i>
            </n-link>

            <n-link class="next" :to="next" :class="{ disabled: !next }" :href="next ? '#' : null">
                <i class="fa fa-2x outline" :class="loadingRight ? 'fa-spin fa-spinner' : 'fa-chevron-right'"></i>
            </n-link>-->

            <div class="sep">
                <h2 class="outline"><i class="fa fa-window-minimize"></i></h2>
            </div>

            <div class="hteam">
                <h1 class="outline">{{ match.team1 }}</h1>
            </div>
            <div class="ateam">
                <h1 class="outline">{{ match.team2 }}</h1>
            </div>
            <div class="hlogo">
                <span class="flag-icon" :class="('flag-icon-' + match.team1 + (match.team1 == 'gb' ? '-' + match.team1 : '')) | lowercase"> </span>
            </div>
            <div class="alogo">
                <span class="flag-icon" :class="('flag-icon-' + match.team2 + (match.team2 == 'gb' ? '-' + match.team2 : '')) | lowercase"> </span>
            </div>
            <div class="result">
                <result :match="match" :readonly="!allowResultChanges"></result>
            </div>

            <div class="footer outline">
                <h4>{{match.kickoff | date:'dd.M.yyyy HH:mm'}}</h4>

                <strong>{{ match.venue }} ( Ortszeit {{ anstoss }} )</strong>
            </div>
        </div>

        <!-- <odds-tipp :odds="match.odds" :match="match"></odds-tipp> -->

        <div v-if="match.odds" class="container">
            <h4>Tipps:</h4>

            <div class="grid-row-container">
                <template v-for="(tipp, i) in match.odds.tipps">
                    <div :key="i" class="grid-row-cell avatar">
                        <img class="img-fluid rounded" :src="'/media/avatars/thumbs/48/' + tipp.tipper.avatar + '.png'" />
                    </div>
                    <div :key="i" class="grid-row-cell username">
                        <span v-text="tipp.tipper.name"></span>
                    </div>

                    <!--<div class="row">
                    <span class="square-flag" [style.background-image]="'url(/assets/country-flags/svg/' + match.team1.abbr + '.svg)'"></span>
                </div>-->
                    <div :key="i" class="grid-row-cell tipp">
                        <span v-text="tipp.ergebnis"></span>
                    </div>
                    <!--<div class="row">
                    <span class="square-flag" [style.background-image]="'url(/assets/country-flags/svg/' + match.team1.abbr + '.svg)'"></span>
                </div>-->

                    <div :key="i" class="grid-row-cell score">
                        <span class="outline" v-text="tipp.punkte"></span>
                        <small>Pkt.</small>
                    </div>
                    <div :key="i" class="grid-row-cell timestamp">
                        <!-- <small class="" v-text="tipp.ts|date:'dd.MM.yy HH:mm'"></small> -->
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
// import { Component, OnInit, Input } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// import { Turnierspiel } from '../../_models/turnierspiel';
// import { GeheimtippService }  from '../../_services/geheimtipp.service';
// import { AuthenticationService } from '../../_services/auth.service';
// import { Ausgabe } from '../../_models';

export default {
    // @Component({
    //     selector: 'turnierspiel',
    //     templateUrl: './match.component.html',
    //     styleUrls: ['./match.component.css']
    // })
    // constructor(
    //         private route: ActivatedRoute,
    //         private auth: AuthenticationService,
    //         private api: GeheimtippService
    //     ) { }

    props: {
        match: {
            type: Object,
            default() {
                return { match_no: 1, group: { label: 'A' }, round: { label: 'A' }, team1: {}, team2: {}, venue: {} }
            },
        }, // Turnierspiel;
    },
    data() {
        return {
            id: 0,
            ausgabe: {}, // Ausgabe;
            loadingLeft: false, // boolean;
            loadingRight: false, // boolean;
            anstoss: null, // any;
            allowResultChanges: false, // boolean = false;
            prev: null, // any;
            next: null,
        }
    },

    mounted() {
        // this.route.params.subscribe((param) => {
        //     if (param.match_no) {
        //         this.ausgabe = this.route.parent.parent.snapshot.data.ausgabe
        //         if (param.round_no) {
        //             // aufgerufen über /:ausgabe/:liga/:round_no/:match_no
        //             const compSeason = this.route.parent.snapshot.data.compSeason
        //             this.id = compSeason.id * 10000 + +param.round_no * 100 + +param.match_no
        //         } else {
        //             // aufgerufen über /:ausgabe/spiele/:match_no
        //             this.id = +this.ausgabe.compseasons[0] * 100 + +param.match_no
        //         }
        //     } else if (param.match_id) {
        //         // aufgerufen über /spiele/:match_id
        //         this.id = +this.route.snapshot.paramMap.get('match_id')
        //     }
        //     this.getMatch(this.id)
        // })
        // if (this.auth.account && this.auth.account.id === 1) {
        //     this.allowResultChanges = true
        // }
    },
    methods: {
        getMatch(id) {
            if (this.match) id < this.match.id ? (this.loadingLeft = true) : (this.loadingRight = true)
            this.api.getTurnierspiel(id).subscribe((match) => {
                this.match = match
                if (this.match.venue) {
                    this.anstoss = new Date(this.match.kickoff).toLocaleString('de-DE', {
                        hour: '2-digit',
                        minute: 'numeric',
                        hour12: false,
                        timeZone: this.match.venue.timezone,
                    })
                }
                if (this.match.odds && this.match.odds.tipps) {
                    this.match.odds.tipps.sort((left, right) => {
                        if (left.punkte < right.punkte) return 1
                        else if (left.punkte > right.punkte) return -1
                        else {
                            if (left.ts < right.ts) return 1
                            if (left.ts > right.ts) return -1
                            return 0
                        }
                    })
                }

                this.loadingLeft = this.loadingRight = false
                this.prev = this.next = null
                if (this.match.match_no > 1) {
                    // this.loadingLeft = true;
                    this.prev = ['..', this.match.match_no - 1]
                }

                if (this.match.match_no < this.match.round.no_matches) {
                    this.next = ['..', this.match.match_no + 1]
                }
            })
        },
    },
}
</script>

<style>
.section-match {
    background: white;
    padding-bottom: 50px;
}
.outline {
    color: white;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    font-weight: 900;
}
a.disabled {
    pointer-events: none;
    cursor: not-allowed;
}

/* Header Grid*/
.intro {
    grid-area: intro;
    background: aquamarine;
    background: transparent;
    text-align: center;
}
.hteam {
    grid-area: hteam;
    text-align: right;
}
.ateam {
    grid-area: ateam;
}
.hlogo {
    grid-area: hlogo;
    border: 0.5px dotted grey;
    text-align: center;
}
.alogo {
    grid-area: alogo;
    border: 0.5px dotted grey;
    text-align: center;
}
.sep {
    grid-area: sep;
    justify-self: center;
}
.result {
    grid-area: result;
    background: gold;
    text-align: center;
}
.footer {
    grid-area: footer;
    background: gray;
    background: transparent;
    text-align: center;
}
.prev,
.next {
    grid-area: prev;
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
}
.next {
    grid-area: next;
}

.grid-container {
    background: url('/assets/bg/bg-rasen.jpg');
    padding: 15px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 50px 1fr 100px 1fr 50px;
    grid-template-rows: auto;
    grid-template-areas:
        'intro intro intro intro intro'
        'hteam hteam sep ateam ateam'
        'prev hlogo result alogo next'
        'footer footer footer footer footer';
    justify-items: center;
    justify-items: stretch;
    align-items: center;
}

.flag-icon {
    background-size: contain;
    background-position: 50%;
    background-repeat: no-repeat;
    position: relative;
    display: inline-block;
    width: 100px;
    line-height: 75px;
    border-radius: 5px;
}
.spielsplash {
    background-image: url('/static/django16_py27/Fotolia_39770783_XL2.jpg');
    background-size: cover;
    /* background-position: 50% 75%; */

    background-position-x: 1%;
    background-position-y: 70%;
    background-size: auto 800px;
    margin-bottom: 0;
}

/* Tipp Grid */

.grid-row-container {
    display: grid;
    grid-template-columns: 64px minmax(100px, 1fr) minmax(80px, 1fr) 100px minmax(0px, 1fr);
    grid-template-rows: auto;
    grid-gap: 0;
    gap: 0;
    justify-content: center; /* schmaler */
    place-items: stretch / stretch;
    padding-top: 50px;
}

/* => https://stackoverflow.com/questions/48108879/how-to-make-hover-state-on-row-table-with-css-grid-layout
.grid-row-container>* {
  /*padding-left: 15px;   * 
  position: relative;
}
.grid-row-cell span {
  position: relative;
  z-index: 2;
}
.grid-row-cell:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  right: -1000%;
  left: -1000%;
  z-index: 1;
}
/* border um span
.row:after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  right: -1px;
  width: 1px;
  z-index: 2;
  background-color: green;
}
*
.grid-row-cell:nth-child(5n+5)::after {
  bottom: -1px;
  right: 0;
  left: -1000%;
  height: 1px;
  z-index: 3;
  width: auto;
  top: auto;
  background-color: #fff;
}
.grid-row-cell:hover::before {
  background: #e90052;
  color: #fff;
  cursor: arrow;
}
*/

.grid-row-container > div.grid-row-cell {
    border-top: 1px solid rgba(0, 0, 0, 0.125);
}

.grid-row-cell.avatar {
    background-color: #fff;
    padding: 0.25rem;
}
.grid-row-cell.avatar > img {
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    padding: 0;
    height: 50px;
    width: 50px;
}

.grid-row-cell.username {
    font-family: 'Carter One', cursive;
    font-weight: 500;
    font-size: 1.6rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* centering content not item: https://stackoverflow.com/questions/45536537/centering-in-css-grid */
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 0rem;
}

.grid-row-cell.tipp {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    padding: 1px;
}

.grid-row-cell.tipp > span {
    display: flex;
    align-items: center;
    font-family: 'Carter One', cursive;
    font-weight: 600;
    font-size: 1.6rem;
    white-space: nowrap;
    overflow: hidden;
    background: #38003c;
    color: #fff;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
}

.grid-row-cell.score {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1px;

    background: no-repeat center center / contain url(/assets/trikots/trikot-rainbow.svg);
}
.grid-row-cell.score span {
    font-size: 2rem;
    line-height: 1.5rem;
    font-weight: 900;
}
.grid-row-cell.score small {
    font-size: 0.8rem;
    font-weight: 500;
}

.grid-row-cell.timestamp {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 0.25rem;
    overflow: hidden;
}

/* Reste alte tipp tabelle */
.fixture:not(.disabled):hover {
    background-color: rgba(0, 0, 0, 0.075);
    background: #e90052;
    color: #fff;
    cursor: arrow;
}

.fixture .match-link {
    text-align: center;
    padding: 0;
}
.fixture:not(.disabled):hover .match-link a {
    color: white;
}
.fixture .match-link:hover a {
    background: #38003c;
}
.fixture .match-link a {
    display: block;
    color: #000;
    line-height: 2.5rem;
    padding: 0.75rem;
}

.square-flag {
    width: 55px;

    background: url(/assets/country-flags/svg/ar.svg);
    background-size: cover;
    background-position: 50%;
}
</style>
