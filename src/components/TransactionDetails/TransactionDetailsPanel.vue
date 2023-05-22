<template>
    <section class="information" ref="informationSection">
        <div class="line title"><span>{{ checkout.title }}</span></div>
        <div class="line description" v-if="checkoutTotalQuantity > 0">
            <span>Aantal</span>
            <span>Omschrijving</span>
            <span>Prijs</span>
            <span class="right">Waarde</span>
        </div>
        <div v-else />
        <div class="container primary scroll" :class="{training: trainingMode }"
             :style="{ maxHeight: primaryContainerMaxHeight }" ref="primaryContainer">
            <a v-for="entry in checkout.inventory">
                <div v-if="entry.type === 'product'" class="line product-line">
                    <span>{{ entry.quantity }}</span>
                    <span>{{ entry.product.name }}</span>
                    <span>{{
                            (Math.round(entry.product.price * 100) / 100).toFixed(2).replace('.', ',')
                        }}</span>
                    <span class="right">{{ formatValue(entry.quantity * entry.product.price) }}</span>
                </div>
                <div v-else-if="entry.type === 'info-large'" class="line product-line large-line">
                    <span>{{ entry.quantity }}</span>
                    <span>{{ entry.message }}</span>
                    <span>{{ entry.price }}</span>
                    <span class="right">{{ formatValue(entry.value) }}</span>
                </div>
                <div v-else-if="entry.type === 'payment'" class="line product-line payment-line">
                    <span>{{ entry.quantity }}</span>
                    <span>{{ entry.message }}</span>
                    <span>{{ entry.price }}</span>
                    <span class="right">{{ formatValue(entry.value) }}</span>
                </div>
                <div v-else class="line product-line other-line">
                    <span>{{ entry.quantity }}</span>
                    <span>{{ entry.message }}</span>
                    <span>{{ entry.price }}</span>
                    <span class="right">{{ formatValue(entry.value) }}</span>
                </div>
            </a>
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
    data () { return { isMounted: false }},
    mounted() {
        this.isMounted = true
        this.watchInventorySize()
    },
    computed: {
        ...mapGetters([
            'checkout', 'session', 'checkoutTotalQuantity', 'checkoutTotalPrice', 'trainingMode'
        ]),
        formattedTotalPrice () {
            return (Math.round(this.checkoutTotalPrice * 100) / 100).toFixed(2).replace('.', ',')
        },
        primaryContainerMaxHeight () {
            if (!this.isMounted) return '0px'
            const element = this.$refs.informationSection
            return window.getComputedStyle(element, null).gridTemplateRows.split(' ')[2]
        }
    },
    methods: {
        formatValue (value) {
            return (Math.round(value * 100) / 100).toFixed(2).replace('.', ',')
        },
        watchInventorySize () {
            this.$store.watch(
                () => this.checkout.inventory.length,
                () => {
                    this.$nextTick(() => {
                        const element = this.$refs.primaryContainer
                        element.scrollTop = element.scrollHeight
                    })
                }
            )
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
    div.container.scroll
        max-height: 465px
        overflow-y: scroll
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
    .line.payment-line
        span
            font-weight: normal
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