<template>
  <MenuPanel rows="8" row-size="5" :buttons="buttons" />
</template>

<script>
import MenuPanel from "@/components/Menus/MenuPanel.vue";
import { Button } from "@/util/Button";

export default {
  name: "NotFoundMenu",
  components: {MenuPanel},
  data () {
    return {
      buttons: [ // 0-7 : 0-4
        new Button('Menu niet gevonden', 'red', 'MAIN_MENU', 3, 1, 3),
        new Button('Terug naar vorige menu', 'gray', 'PREVIOUS_MENU',4, 1, 3)
      ]
    }
  }
}
</script>

<style scoped>

</style>