<template>
  <MenuPanel rows="8" row-size="5" :buttons="buttons" integrated-numpad />
</template>

<script>
import MenuPanel from "@/components/Menus/MenuPanel.vue";
import { Button } from "@/util/classes/Button";
import {mapGetters} from "vuex";
import {mapFields} from "vuex-map-fields";

export default {
  name: "AfrekenenMenu",
  components: { MenuPanel },
  computed: {
    ...mapGetters({ status: 'session/status' }),
    ...mapFields('checkout', ['input'])
  },
  mounted() {
      this.emitter.on('integrated-numpad-button-pressed', ({ type, value }) => this.handleInputReceived(type, value))
      if (this.status.type !== 'SALE_PAYMENT' && this.status.type !== 'SALE_POST_PAYMENT')
          this.$store.dispatch("session/continue")
  },
  data() {
    return {
      buttons: [ // 0-7 : 0-4
        new Button('Supervisor menu', 'red', '/supervisor_menu', 1, 2, 1),
        new Button('TGTG Magicbox', 'transparent', '/tgtg_magicbox', 1, 3, 1),
        new Button('TGTG Broodbox', 'transparent', '/tgtg_broodbox', 1, 4, 1),

        new Button('Zegelboekjes diversen', 'purple', '/zegelboekjes_diversen', 2, 0, 1),
        new Button('Mobiele PIN', 'dark-green', '/mobiele_pin', 2, 3, 1),
        new Button('Verkoop op rekening', 'dark-green', '/verkoop_op_rekening', 2, 4, 1),

        new Button('Opzoeken klant', 'dark-green', '/opzoeken_klant', 3, 0, 1),
        new Button('Extra pinnen', 'orange', '/extra_pinnen', 3, 1, 1),
        new Button('Emballage retour', 'orange', '/emballage_retour', 3, 2, 1),
        new Button('Cadeaukaart', 'orange', '/cadeaukaart', 3, 3, 1),
        new Button('Waardebon', 'orange', '/waardebon', 3, 4, 1),

        new Button('5 Euro', 'transparent', '/pay_5_euros', 4, 0, 1),
        new Button('10 Euro', 'transparent', '/pay_10_euros', 4, 1, 1),
        new Button('20 Euro', 'transparent', '/pay_20_euros', 4, 2, 1),
        new Button('50 Euro', 'transparent', '/pay_50_euros', 4, 3, 1),
        new Button('100 Euro', 'transparent', '/pay_100_euros', 4, 4, 1),

        new Button('Contant', 'orange', '/pay_cash', 5, 3, 2),
        new Button('Pin', 'orange', '/pay_pin', 7, 3, 2),
      ]
    }
  },
  methods: {
    handleInputReceived(type, value) {
      if (this.status.type !== 'SALE_PAYMENT') return
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
            this.$store.dispatch('checkout/makePayment', { type: "Contant", value: this.input.replace(',', '.') })
            this.input = ""
            break;
        }
    }
  }
}
</script>

<style scoped>

</style>