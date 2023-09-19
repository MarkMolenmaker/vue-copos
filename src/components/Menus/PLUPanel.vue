<template>
  <section v-if="this.products.length === this.plus.length">
    <div class="row" :style="{ height: 100 / rows + '%' }" v-for="row in buttonGrid" :key="row">
      <div class="button" v-for="product in row" :key="product" :style="{ width: (100 / rowSize) + '%'}">
        <img v-if="product.images" :src="product.images[0].effectiveUrl" alt="">
        <a class="light-blue" @click="action()">
          {{ product.name }}
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import {fetchProductBySku} from "@/util/actions/fetchProductFromAPI";

export default {
  name: "PLUPanel",
  props: {
    rows: { type: String, required: true },
    rowSize: { type: String, required: true },
    plus: { type: Array, required: true },
  },
  data () {
    return {
      products: []
    }
  },
  mounted() {
    // Fetch all individual products by sku
    for (let i = 0; i < this.plus.length; i++) {
      fetchProductBySku(this.plus[i].sku).then(res => {
        this.products.push(res)
      })
    }
    console.log(this.products)
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
    buttonGrid () {
      const grid = []
      for (let row = 0; row < Number(this.rows); row++) {
        grid.push([])
        for (let pos = 0; pos < Number(this.rowSize); pos++) {
          grid[row][pos] = this.products[row * this.rowSize + pos]
        }
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
    img
      position: absolute
      height: 100%
      width: 100%
      z-index: 1
      object-fit: contain
    a
      font-size: 1rem
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