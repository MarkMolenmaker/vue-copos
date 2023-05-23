<template>
  <section>
    <div class="row" :style="{ height: 100 / rows + '%' }" v-for="row in buttonGrid" :key="row">
      <div class="button" v-for="button in row" :key="button" :style="{ width: (100 / rowSize) * (button !== null ? button.size : 1) + '%'}">
        <a v-if="
            button === null
            || (totalQuantity > 0 && button.link === '/afmelden')
        " class="empty" />
        <router-link v-else-if="button.link[0] === '/'" :class="button.color" :to="button.link">
            {{ button.title }}
        </router-link>
        <a v-else-if="integratedNumpad && button.link === 'INTEGRATED_NUMPAD'"
            class="integrated-numpad-wrapper">
          <IntegratedNumpadPanel />
        </a>
        <a v-else :class="button.color" @click="action(button.link)">
            {{ button.title }}
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import {Button} from "@/util/classes/Button"
import IntegratedNumpadPanel from "@/components/Numpad/Integrated/IntegratedNumpadPanel.vue";
import {mapGetters} from "vuex";

export default {
  name: "MenuPanel",
  components: {IntegratedNumpadPanel},
  props: {
    rows: { type: String, required: true },
    rowSize: { type: String, required: true },
    buttons: { type: Array[Button], required: true },
    integratedNumpad: { type: Boolean }
  },
  methods: {
    action (link) {
      switch (link) {
        case 'PREVIOUS_MENU':
          this.$router.go(-1)
          break
        case 'MAIN_MENU':
          this.$store.dispatch('routerHistory/clear')
          this.$router.push('/')
          break
        default:
          break
      }
    }
  },
  computed: {
    ...mapGetters({totalQuantity: 'checkout/totalQuantity'}),
    buttonGrid () {
      const grid = []
      for (let row = 0; row < Number(this.rows); row++) {
        grid.push([])
        for (let pos = 0; pos < Number(this.rowSize); pos++)
            grid[row][pos] = null
      }
      this.buttons.forEach(button => {
        grid[button.row][button.position + (grid[button.row].length - this.rowSize)] = button
        if (button.size > 1) {
          grid[button.row].splice(button.position + (grid[button.row].length - this.rowSize) + 1, button.size - 1)
        }
      })
      if (this.integratedNumpad) {
        grid[5][0] = new Button('', 'transparent', 'INTEGRATED_NUMPAD', null, null, 3)
        grid[5].splice(1, 2)
      }
      return grid
    }
  }
}
</script>

<style lang="sass" scoped>
section
  height: 100%
  width: 100%
  .row
    display: flex
    justify-content: center
    align-items: center
    width: 100%
  .button
    height: 100%
    width: 100%
    padding: .1rem
    a
      font-size: 1.25rem
      display: flex
      color: white
      text-decoration: none
      text-align: center
      justify-content: center
      align-items: center
      height: 100%
      width: 100%
    .integrated-numpad-wrapper
      display: flex
      justify-content: flex-start
      align-items: flex-start
  a:hover:not(.empty):not(.integrated-numpad-wrapper)
    cursor: pointer
</style>