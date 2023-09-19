<template>
    <MenuPanel rows="8" row-size="5" :buttons="buttons" integrated-numpad />
</template>

<script>
import MenuPanel from "@/components/Menus/MenuPanel.vue";
import {Product} from "@/util/classes/Product";
import {fetchProductBySku} from "@/util/actions/fetchProductFromAPI";
import {mapGetters} from "vuex";
import {mapFields} from "vuex-map-fields";
import {Button} from "@/util/classes/Button";

export default {
  name: "DefaultMenu",
  components: { MenuPanel },
  computed: {
    ...mapGetters({ status: 'session/status' }),
    ...mapFields('checkout', ['input'])
  },
  mounted() {
    this.emitter.on('integrated-numpad-button-pressed',
      ({ type, value }) => this.handleInputReceived(type, value))
  },
  beforeUnmount() {
    this.emitter.off('integrated-numpad-button-pressed')
  },
  data () {
    return {
      buttons: [ // 0-7 : 0-4
        new Button('Afmelden', 'gray', '/afmelden', 0, 2, 1),

        new Button('Supervisor menu', 'red', '/supervisor_menu', 1, 2, 1),
        new Button('Non scan menu', 'blue', '/non_scan_menu', 1, 3, 1),
        new Button('Kassa PLU\'s', 'green', '/kassa_plus', 1, 4, 1),

        new Button('Opzoeken kassabon', 'red', '/opzoeken_kassabon', 2, 4, 1),

        new Button('Saldo cadeaukaart', 'orange', '/saldo_cadeaukaart', 3, 2, 1),
        new Button('Kopie bon', 'blue', '/kopie_bon', 3, 4, 1),

        new Button('Prijs opvraag', 'dark-green', '/prijs_opvraag', 4, 0, 1),
        new Button('Opzoeken klant', 'dark-green', '/opzoeken_klant', 4, 1, 1),
        new Button('Zelfscan', 'dark-green', '/zelfscan', 4, 2, 1),

        new Button('Afrekenen', 'orange', '/afrekenen', 7, 3, 2),
      ]
    }
  },
  methods: {
    async scanProduct(ean, amount = 1) {
      const online = await fetchProductBySku(ean)
      if (!online) return // @TODO: show popup: ongeldig/onbekend artikel
      this.$store.dispatch('checkout/addEntry', {
        type: 'product',
        product: new Product(online.sku, online.name, online.listPrice.value),
        quantity: amount
      })
    },
    handleInputReceived (type, value) {
      if (this.status.type !== 'SALE_ASSEMBLY') return
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
            const multiply_match = this.input.match(/(^\d+)\[\*]$/) // 1[*]
            const multiply_with_ean_match = this.input.match(/(^\d+)\[\*](\d+)$/) // 1[*]871203929

            if (this.input === "")
              this.$store.dispatch('checkout/duplicateLastAddedProduct', 1)  // Duplicate the product x amount of times
            else if (multiply_match)
              this.$store.dispatch('checkout/duplicateLastAddedProduct', multiply_match[1])  // Duplicate the product x amount of times
            else if (multiply_with_ean_match)
              this.scanProduct(multiply_with_ean_match[2], Number(multiply_with_ean_match[1]))
            else
              this.scanProduct(this.input)

            this.input = ""
            break;
        }
    }
  }
}
</script>

<style scoped>

</style>