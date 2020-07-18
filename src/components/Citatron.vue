<template>
    <div class="jumbotron">
        <blockquote class="blockquote text-center">
            <p class="lead">
                <i class="fa fa-quote-left" aria-hidden="true"></i>
                {{ quote.quote }}
                <i class="fa fa-quote-right" aria-hidden="true"></i>
            </p>
            <footer class="blockquote-footer">
                {{ quote.author }} <cite v-if="quote.context" title="Source Title">({{ quote.context }})</cite>
            </footer>
        </blockquote>
        <!--
            <hr class="my-2">
            <div class="d-flex align-items-center justify-content-between">
            <button type="button" class="btn btn-sm btn-outline-dark"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>    
            <i class="fa button fa-chevron-right" aria-hidden="true"></i>  
            </div>-->
    </div>
</template>
<script>
export default {
    data() {
        return {
            quote: {
                quote: 'Ich mache nie Voraussagen und werde das auch niemals tun.',
                author: 'Paul Gascoigne',
                context: null,
                expl: null,
            },
        }
    },
}
</script>
<style lang="css">
.jumbotron {
    position: relative;
    top: 20%;
    opacity: 0.85;
    border-color: RGB(50, 50, 50);
    padding: 1rem;
}
.fa.button {
    padding: 5px;
    border: 1px solid transparent;
    border-radius: 3px;
}

.fa.button:hover {
    border-color: grey;
}
.blockquote p {
    margin-bottom: 0;
}
</style>
