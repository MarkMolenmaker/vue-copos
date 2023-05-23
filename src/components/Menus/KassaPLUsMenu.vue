<template>
  <MenuPanel rows="8" row-size="5" :buttons="buttons" />
</template>

<script>
import MenuPanel from "@/components/Menus/MenuPanel.vue";
import { Button } from "@/util/classes/Button";

export default {
  name: "KassaPLUsMenu",
  components: {MenuPanel},
  data () {
    return {
      buttons: [ // 0-7 : 0-4
        new Button('Afmelden', 'gray', '/afmelden', 0, 2, 1),
        new Button('Terug', 'gray', 'PREVIOUS_MENU', 0, 4, 1),

        new Button('Supervisor Menu', 'red', '/supervisor_menu', 1, 2, 1),
        new Button('Non scan menu', 'blue', '/non_scan_menu', 1, 3, 1),

        new Button('Broodjes', 'green', '/broodjes', 2, 1, 2),
        new Button('Stuks fruit', 'green', '/stuks_fruit', 2, 3, 2),

        new Button('Stuks groente', 'green', '/stuks_groente', 3, 1, 2),
        new Button('Wegen appels & peren', 'green', '/wegen_appels_en_peren', 3, 3, 2),

        new Button('Wegen fruit', 'green', '/wegen_fruit', 4, 1, 2),
        new Button('Wegen groente', 'green', '/wegen_groente', 4, 3, 2),

        new Button('Bier', 'light-blue', '/bier', 5, 1, 1),
        new Button('Telefoon kaarten', 'light-blue', '/telefoon_kaarten', 5, 2, 1),
        new Button('Service en diensten', 'light-blue', '/service_en_diensten', 5, 3, 1),
        new Button('Overig', 'light-blue', '/overig', 5, 4, 1),

        new Button('Lokale artikelen', 'light-blue', '/lokale_artikelen', 6, 1, 1),
        new Button('Lege kratten', 'light-blue', '/lege_kratten', 6, 2, 1),
        new Button('Reserve', 'light-blue', '/reserve', 6, 3, 1),
        new Button('Leeg', 'light-blue', '/leeg', 6, 4, 1),
      ]
    }
  }
}
</script>

<style scoped>

</style>