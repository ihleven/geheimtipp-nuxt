<template>
    <div v-if="readonly" class="flex">
        <div class="tipp-l"></div>
        <div class="tipp-m">
            <div v-if="tipp" :class="{ score0: tipp.punkte == 0, score1: tipp.punkte == 1, score2: tipp.punkte == 2 }">
                {{ tipp.ergebnis }}
            </div>
        </div>
        <div v-if="tipp" class="tipp-r">
            <small class="bg-trikot-gelb">{{ tipp.punkte }}</small>
            <small :hidden="!auszahlung">{{ tipp.auszahlung | number }}</small>
        </div>
    </div>

    <form v-else form="ngForm" @submit="onSubmit(form)">
        <div class="grid-container">
            <div class="top"></div>
            <div class="left"></div>
            <input
                v-model="tipp.ergebnis"
                type="text"
                class="center"
                placeholder="-:-"
                required
                maxlength="5"
                autocomplete="off"
                name="result"
                pattern="[0-9].*[0-9]"
            />

            <button class="right button" :disabled="form.pristine || form.invalid">
                <i
                    class="fa fa-spinner"
                    :class="{ 'fa-send': form.dirty && !status, 'fa-spinner fa-spin': status == 'submitted', 'fa-spinner fa-spin': status == 'loading' }"
                ></i>
            </button>

            <div class="bottom">
                <div v-if="form.dirty && form.invalid" class="alert alert-info" role="alert">
                    Bitte ein valides Ergebnis (vorne und hinter jeweils eine Zahl) eingeben.
                </div>
                <div v-if="form.dirty && form.valid" class="alert alert-info" role="alert">
                    Tipp kann gespeichert werden
                </div>
                <div v-if="submitted" class="alert alert-info" role="alert"><i class="fa fa-spinner fa-spin"></i> Tipp wird gespeichert</div>
                <div v-if="status == 'success'" class="alert alert-info" role="alert"><i class="fa fa-check"></i> Tipp wurde gespeichert</div>
                <div v-f="status == 'error'" class="alert alert-danger" role="alert">
                    <i class="fa fa-warning"></i> Tipp konnte nicht gespeichert werden. <br />
                    Fehler: {{ error }}
                </div>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    // vor deadline:
    // status:   empty => changed => saving => saved oder error => changed
    // disabled: true      false      false     true       false    false
    // icon:     none      upload     spinner   check      warning  upload

    // button soll:
    // - enabled sein, wenn es was zu submitten gibt => dirty
    // - disabled im loading state
    // - disabled wenn submission erfolgreich und es nichts zu speichern gibt
    props: {
        matchId: { type: Number, required: true },
        tipp: {
            type: Object,
            default() {
                return { ergebnis: '-:-' }
            },
        },
        deadline: { type: Date, required: true },
        readonly: {
            type: Boolean,
            default() {
                return false
            },
        },
        klassements: {
            type: Array,
            default() {
                return []
            },
        },
    },
    data() {
        return {
            form: null,
            // result: string;
            deadlineExpired: true,
            punkte: false,
            auszahlung: false,

            status: '',
            error: '',
        }
    },
    computed: {
        odds_id() {
            return this.matchId
        },
    },

    // constructor(private api: GeheimtippService) { }

    mounted() {
        this.checkDeadline()
        // this.deadlineExpired = false;
        this.setKlassements()
        // this.result = this.tipp ? this.tipp.ergebnis : '';
        if (!this.tipp) {
            this.tipp = { ergebnis: null }
        }
    },
    methods: {
        onSubmit(form) {
            this.status = 'submitted'
            if (form.valid) {
                this.status = 'loading'
                this.api.setOddsTipp(this.odds_id, form.form.value.result).subscribe(
                    (odds) => {
                        this.status = 'success'
                        form.form.reset(form.form.value)
                        this.tipp = odds.tipp
                        setTimeout(() => {
                            this.status = null
                        }, 3000)
                    },
                    (error) => {
                        this.status = 'error'
                        form.form.reset(form.form.value)
                        if (error.status === 499) {
                            this.error = `Deadline_abgelaufen`
                        }
                    }
                )
            }
        },

        checkDeadline() {
            if (this.deadline) {
                const deadline = new Date(this.deadline)
                this.deadlineExpired = deadline < new Date()
            }
            console.log(1, this.deadline, this.readonly)
            if (this.readonly === undefined) {
                this.readonly = this.deadlineExpired
            }
            console.log(2, this.deadline, this.readonly)
        },

        setKlassements() {
            if (this.klassements) {
                if (this.klassements.includes('punkte')) this.punkte = true
                if (this.klassements.includes('auszahlung')) this.auszahlung = true
            }
        },
    },
}
</script>

<style>
[hidden] {
    display: none !important;
}
.ergebnis {
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

.score {
    border-right: 3px solid transparent;
    padding: 0 2px;
    color: grey;
    font-weight: normal;
}
.score0 {
    border-right: 3px solid transparent;
    padding: 0 2px;
    color: #aaa;
}
.score1 {
    border-right: 1px solid blue;
    padding: 0 4px;
    color: #333;
}
.score2 {
    border-right: 3px double #00f;
    padding: 0 2px;
    font-weight: bold;
    color: #33a;
}

/* Tipps bei abgelaufener Deadline */
.flex {
    flex: 0 0 5rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center; /* stretch */
}
.tipp-l {
    flex: 0 0 1rem;
    background-color: #1898a8;
}
.tipp-m {
    flex: 0 0 auto;
    background-color: #abc;
    width: auto;
    align-self: center;
    text-align: center;
    background: transparent;
    font-size: 1.2rem;
    font-weight: 400;
    color: #bbb;
    margin: 0rem;
}
.result {
    flex: 0 0 3rem;
    width: 3rem;
    align-self: center;
    text-align: center;
    background: transparent;
    font-size: 1.2rem;
    font-weight: 400;
    color: #bbb;
    margin: 0rem;
    line-height: 2.25rem;
    text-align: right;
}
.tipp-r {
    flex: 0 0 1rem;
    border-bottom: 0.25px dotted grey;
    padding-left: 2px;
}
.tipp-r small {
    font-size: 50%;
    display: block;
}

.grid-container {
    display: grid;
    grid-gap: 0.25rem 0;
    grid-template-rows: 0.125rem 2.25rem 0.125rem;
    grid-template-columns: 0rem 3rem 0rem;
    justify-content: center;
    align-content: center;
    border: 0px solid red;
}
.top {
    grid-column: 1 / 4;
    background: transparent;
    justify-self: center;
    position: relative;
    top: -20px;
    white-space: nowrap;
}
.left {
    grid-column: 1 / 2;
    align-self: center;

    background: transparent;
}
.center {
    grid-column: 2 / 3;
    border: 0;
    border-radius: 0;
    padding: 0;
    text-align: center;
    font-size: 1.2rem;
    line-height: 2.25rem;
}
input.center {
    background: #38003c;
    font-weight: 400;
    color: #fff;
}

.right {
    grid-column: 3 / 4;
    background: transparent;
    text-align: left;
}
.button {
    border: 0;
    background-color: #ccc;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
}
.button[disabled] {
    visibility: hidden;
}
.bottom {
    grid-column: 1 / 4;
    background: transparent;
    position: relative;
    justify-self: center;
    white-space: nowrap;
}
.alert {
    padding: 0 0.5rem;
    font-size: 0.75rem;
}
</style>
