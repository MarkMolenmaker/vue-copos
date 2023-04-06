<template>
    <div class="container">
        <div class="lines">
            <TransactionDetailsSecondaryLine :first="amount.size" second="Totaal" :third="amount.total" bold />
            <TransactionDetailsSecondaryLine second="Betaald" :third="amount.payed" normal />
            <TransactionDetailsSecondaryLine second="Terug" :third="amount.change" large-bold />
        </div>
        <div class="controls">
            <TransactionDetailsSecondaryButton icon="warning" overlay />
            <TransactionDetailsSecondaryButton icon="arrowup" overlay />
            <TransactionDetailsSecondaryButton icon="numpad" background />
            <TransactionDetailsSecondaryButton icon="arrowdown" overlay />
        </div>
    </div>
</template>

<script>
import TransactionDetailsSecondaryLine from "@/components/TransactionDetails/TransactionDetailsSecondaryLine.vue";
import TransactionDetailsSecondaryButton from "@/components/TransactionDetails/TransactionDetailsSecondaryButton.vue";

export default {
    name: "TransactionDetailsSecondary",
    components: {TransactionDetailsSecondaryButton, TransactionDetailsSecondaryLine},
    computed: {
        amount () {
            const size = 0
            const total = 0
            const payed = 0
            const change = 0

            return {
                total: total !== 0 ? (Math.round(total * 100) / 100).toFixed(2)
                    .replace('.', ',') : '',
                payed: payed !== 0 ? (Math.round(payed * 100) / 100).toFixed(2)
                    .replace('.', ',') : '',
                change: change !== 0 ? (Math.round(change * 100) / 100).toFixed(2)
                    .replace('.', ',') : '',
                size: size !== 0 ? size : '' }
        }
    }
}
</script>

<style lang="sass" scoped>
div.container
  display: grid
  grid-template-columns: 1fr fit-content(100%)

  .lines
    display: flex
    flex-direction: column
    justify-content: space-evenly
    margin: .5rem

  .controls
    display: grid
    grid-template-columns: 1fr 1fr
    gap: .25rem
    margin: .5rem
</style>