<template>
    <section class="information">
        <div class="line title"><span>{{ session.title }}</span></div>
        <div class="container primary"></div>
        <TransactionDetailsSecondary />
        <div class="line input"><span>Invoer</span><input type="text" ></div>
    </section>
</template>

<script>
import {mapGetters} from "vuex";
import TransactionDetailsSecondary from "@/components/TransactionDetails/TransactionDetailsSecondary.vue";

export default {
    name: "TransactionDetailsPanel",
    components: {TransactionDetailsSecondary},
    computed: {
        ...mapGetters([
            'session'
        ])
    }
}
</script>

<style lang="sass" scoped>
section.information
    display: grid
    gap: 2px
    grid-template-rows: 5fr 70fr 20fr 5fr
    div.container
        background: white
        color: black
        border: solid 1px var(--color-background-dark)
    div.line
        border: solid 1px white
        display: flex
        font-size: 1.15rem
        align-items: center
    div.line.input
        span
            font-weight: normal
        input
            height: 90%
            width: 100%
            margin-right: .5rem

    span
        margin: 0 .5rem
        font-weight: bold
</style>