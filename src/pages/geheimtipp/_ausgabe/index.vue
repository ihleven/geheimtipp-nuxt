<template>
    <div class="container">
        <div class="section">
            <h3>
                Startseite Tippspiel Ausgabe {{ ausgabe.id }}
                <small class="text-muted">{{ ausgabe.label }}</small>
            </h3>

            <div class="lead">
                <h4><small>Hallo</small> {{ auth.account.username }}</h4>
            </div>
            <a v-if="!ausgabe.registration" routerLink="register">Bitte registrieren</a>
            <div v-if="ausgabe.registration" class="media">
                <img class="mr-3" :src="ausgabe.registration.avatar" alt="" />
                <div class="media-body">
                    <h5 class="mt-0">{{ ausgabe.registration.name }}</h5>
                    "{{ ausgabe.registration.motto }}"
                </div>
            </div>

            <p class="lead">
                <img class="img-fluid" src="~assets/Baustelle.jpg" />
            </p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        ausgabe: {
            type: Object,
            default() {
                return { account: {}, registration: {} }
            },
        },
    },
    data() {
        return { auth: { account: {} } }
    },
    mounted() {
        // this.route.parent.params.subscribe((param) => {
        //     this.ausgabe = this.route.parent.snapshot.data.ausgabe
        // })
        console.log('ausgabe', this.ausgabe)
    },
}
</script>
<style scoped>
.section {
    padding: 30px 0;
}
</style>
