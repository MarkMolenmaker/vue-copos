<template>
    <section class="information">
        <div class="line title"><span>{{ checkout.title }}</span></div>
        <div class="container primary">
            <a v-for="entry in checkout.inventory">
                <div class="line">
                    <span class="quantity">{{ entry.quantity }}</span>
                    <span class="name">{{ entry.product.name }}</span>
                    <span class="price">{{ entry.quantity * entry.product.price }}</span>
                </div>
            </a>
        </div>
        <TransactionDetailsSecondary />
        <form class="line" @submit.prevent="handleInputReceived('ACTION', 'ENTER')"><span>Invoer</span><input type="text" v-model="input" :disabled="!session.active" /></form>
    </section>
</template>

<script>
import {mapGetters} from "vuex";
import TransactionDetailsSecondary from "@/components/TransactionDetails/TransactionDetailsSecondary.vue";
import {fetchProductBySku, Product} from "@/util";

export default {
    name: "TransactionDetailsPanel",
    data () { return { input: "" } },
    methods: {
        async scanProduct(ean, amount = 1) {
            const online = await fetchProductBySku(ean)
            if (!online) return // @TODO: show popup: ongeldig/onbekend artikel
            this.$store.commit('addProductToCheckout', {
                product: new Product(online.sku, online.name, online.listPrice.value),
                quantity: amount
            })
        },
        handleInputReceived (type, value) {
            if (type === 'INPUT') this.input += value
            else if (type === 'ACTION')
                switch (value) {
                    case '*':
                        this.input += "[*]"
                        break
                    case 'BCK':
                        this.input = this.input.substring(0, this.input.length - 1)
                        break
                    case ',':
                        this.input += ","
                        break
                    case 'ENTER':
                        const multiply_match = this.input.match(/(^\d+)\[\*\]$/) // 1[*]
                        const multiply_with_ean_match = this.input.match(/(^\d+)\[\*\](\d+)$/) // 1[*]871203929

                        if (this.input === "")
                            this.$store.commit('duplicateLastAddedProduct', 1)  // Duplicate the product x amount of times
                        else if (multiply_match)
                            this.$store.commit('duplicateLastAddedProduct', multiply_match[1])  // Duplicate the product x amount of times
                        else if (multiply_with_ean_match)
                            this.scanProduct(multiply_with_ean_match[2], Number(multiply_with_ean_match[1]))
                        else
                            this.scanProduct(this.input)

                        this.input = ""
                        break;
                }
        }
    },
    components: {TransactionDetailsSecondary},
    computed: {
        ...mapGetters([
            'checkout', 'session'
        ])
    },
    mounted() {
        this.emitter.on('integrated-numpad-button-pressed', ({ type, value }) => this.handleInputReceived(type, value))
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
    .line
        border: solid 1px white
        display: flex
        font-size: 1.15rem
        align-items: center
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