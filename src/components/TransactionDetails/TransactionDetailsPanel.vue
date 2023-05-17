<template>
    <section class="information">
        <div class="line title"><span>{{ checkout.title }}</span></div>
        <div class="line description" v-if="checkoutTotalQuantity > 0">
            <span>Aantal</span>
            <span>Omschrijving</span>
            <span>Prijs</span>
            <span class="right">Waarde</span>
        </div>
        <div v-else />
        <div class="container primary" :class="{training: trainingMode }">
            <a v-for="entry in checkout.inventory">
                <div class="line product-line">
                    <span>{{ entry.quantity }}</span>
                    <span>{{ entry.product.name }}</span>
                    <span>{{
                            (Math.round(entry.product.price * 100) / 100).toFixed(2).replace('.', ',')
                        }}</span>
                    <span class="right">{{
                            (Math.round(entry.quantity * entry.product.price * 100) / 100).toFixed(2).replace('.', ',')
                        }}</span>
                </div>
            </a>
            <a v-if="this.session.status.type === 'SALE_PAYMENT'"><div class="line product-line large-line">
                <span>{{ checkoutTotalQuantity }}</span>
                <span>Totaal</span>
                <span></span>
                <span class="right">{{ formattedTotalPrice }}</span>
            </div></a>
        </div>
        <TransactionDetailsSecondary />
        <form class="line" @submit.prevent="this.emitter.emit('integrated-numpad-button-pressed', { type: 'ACTION', value: 'ENTER'})"><span>Invoer</span><input type="text" v-model="this.session.input" :disabled="!session.active" /></form>
    </section>
</template>

<script>
import {mapGetters} from "vuex";
import TransactionDetailsSecondary from "@/components/TransactionDetails/TransactionDetailsSecondary.vue";

export default {
    name: "TransactionDetailsPanel",
    components: {TransactionDetailsSecondary},
    emits: ['integrated-numpad-button-pressed'],
    computed: {
        ...mapGetters([
            'checkout', 'session', 'checkoutTotalQuantity', 'checkoutTotalPrice', 'trainingMode'
        ]),
        formattedTotalPrice () {
            return (Math.round(this.checkoutTotalPrice * 100) / 100).toFixed(2).replace('.', ',')
        }
    }
}
</script>

<style lang="sass" scoped>
section.information
    display: grid
    gap: 2px
    grid-template-rows: 5fr auto 70fr 20fr 5fr
    div.container
        background: white
        color: black
        border: solid 1px var(--color-background-dark)
    div.container.training
        background: var(--color-green)
    .line
        border: solid 1px white
        display: flex
        font-size: 1.15rem
        align-items: center
        .right
            text-align: right
    .line.product-line
        display: grid
        grid-template-columns: 2fr 10fr 2fr 2fr
        border-color: transparent
        border-bottom-color: var(--color-gray)
    .line.large-line
        font-size: 1.25rem
    .line.description
        display: grid
        grid-template-columns: 2fr 10fr 2fr 2fr
        border: none
    form
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