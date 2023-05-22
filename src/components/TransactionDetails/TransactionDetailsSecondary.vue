<template>
    <div class="container">
        <div class="lines">
            <TransactionDetailsSecondaryLine :first="String(totalQuantity)" second="Totaal" :third="formattedTotalPrice" bold />
            <TransactionDetailsSecondaryLine second="Betaald" :third="formattedTotalPayed" normal />
            <TransactionDetailsSecondaryLine second="Terug" :third="formattedTotalChange" large-bold />
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
import {mapGetters} from "vuex";

export default {
  name: "TransactionDetailsSecondary",
  components: { TransactionDetailsSecondaryButton, TransactionDetailsSecondaryLine },
  computed: {
    ...mapGetters({
      totalQuantity: 'checkout/totalQuantity',
      totalPrice: 'checkout/totalPrice',
      totalPayed: 'checkout/totalPayed',
      totalChange: 'checkout/totalChange',
    }),
    formattedTotalPrice () {
        return this.totalQuantity > 0 ? (Math.round(this.totalPrice * 100) / 100).toFixed(2)
            .replace('.', ',') + ' EUR' : ''
    },
    formattedTotalPayed () {
        return this.totalQuantity > 0 ? (Math.round(this.totalPayed * 100) / 100).toFixed(2)
            .replace('.', ',') + ' EUR' : ''
    },
    formattedTotalChange () {
        return this.totalQuantity > 0 ? (Math.round(this.totalChange * 100) / 100).toFixed(2)
            .replace('.', ',') + ' EUR' : ''
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