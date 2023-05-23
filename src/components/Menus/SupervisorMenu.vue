<template>
  <MenuPanel rows="8" row-size="5" :buttons="buttons" />
</template>

<script>
import MenuPanel from "@/components/Menus/MenuPanel.vue";
import { Button } from "@/util/classes/Button";

export default {
  name: "SupervisorMenu",
  components: { MenuPanel },
  data () {
    return {
      buttons: [ // 0-7 : 0-4
        new Button('Terug', 'gray', 'PREVIOUS_MENU', 0, 4, 1),

        new Button('Non scan menu', 'blue', '/non_scan_menu', 1, 3, 1),
        new Button('Kassa PLU\'s', 'green', '/kassa_plus', 1, 4, 1),

        new Button('Betalen rekening', 'orange', '/betalen_rekening', 2, 0, 1),
        new Button('Retour zegels', 'purple', '/retour_zegels', 2, 1, 1),
        new Button('Kopen zegels', 'purple', '/kopen_zegels', 2, 2, 1),
        new Button('Volume regelen', 'green', '/volume_regelen', 2, 4, 1),

        new Button('Training', 'red', '/training', 3, 1, 2),
        new Button('Lade open', 'orange', '/lade_open', 3, 3, 1),
        new Button('Lade naar kluis', 'orange', '/lade_naar_kluis', 3, 4, 1),

        new Button('Klantenorder', 'green', '/klantenorder', 4, 1, 2),
        new Button('Klantenorder via klantenkaart', 'green', '/klantenorder_via_klantenkaart', 4, 3, 2),

        new Button('Kas in', 'green', '/kas_in', 5, 1, 1),
        new Button('Kas uit', 'green', '/kas_uit', 5, 2, 1),
        new Button('Bon uit wacht', 'green', '/bon_uit_wacht', 5, 3, 2),

        new Button('Retour artikel', 'orange', '/retour_artikel', 6, 0, 1),
        new Button('Retourmodus handmatig', 'orange', '/retourmodus_handmatig', 6, 1, 2),
        new Button('Retourmodus kassabon', 'orange', '/retourmodus_kassabon', 6, 3, 2),
      ]
    }
  }
}
</script>

<style scoped>

</style>