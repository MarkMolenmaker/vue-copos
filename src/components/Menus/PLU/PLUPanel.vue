<template>
  <section>
    <div class="row" :style="{ height: 100 / (Number(rows) + 1) + '%' }"
         v-for="row in buttonGrid" :key="row">
      <div class="button" v-for="product in row" :key="product" :style="{ width: (100 / rowSize) + '%'}">
        <a v-if="product" class="light-blue" @click="action('ADD_PRODUCT', product)">
          <img v-if="product.images" :src="product.images[0].effectiveUrl" alt="">
          <span>{{ product.name }}</span>
        </a>
        <a v-else class="empty"></a>
      </div>
    </div>
    <div class="row" :style="{ height: 100 / (Number(rows) + 1) + '%' }">
      <div class="button" :style="{ width: (100 / rowSize) + '%'}">
        <a class="gray" @click="action('MAIN_MENU')">Terug</a>
      </div>
      <div class="button" :style="{ width: (100 / rowSize) + '%'}"><a class="empty"></a></div>
      <div v-if="this.page > 0" class="button" :style="{ width: (100 / rowSize) + '%'}">
        <a class="gray" @click="action('PREVIOUS_PAGE')">
          <img class="overlay" src="../../../assets/icons/secondary_button_arrowleft.png" alt="">
        </a>
      </div>
      <div v-else class="button" :style="{ width: (100 / rowSize) + '%'}"><a class="empty"></a></div>
      <div v-if="(this.page + 1) * 20 < this.plus.length" class="button" :style="{ width: (100 / rowSize) + '%'}">
        <a class="gray" @click="action('NEXT_PAGE')">
          <img class="overlay" src="../../../assets/icons/secondary_button_arrowright.png" alt="">
        </a>
      </div>
      <div v-else class="button" :style="{ width: (100 / rowSize) + '%'}"><a class="empty"></a></div>
    </div>
  </section>
</template>

<script>
import {fetchProductBySku} from "@/util/actions/fetchProductFromAPI";
import {Product} from "@/util/classes/Product";

export default {
  name: "PLUPanel",
  props: {
    rows: { type: String, required: true },
    rowSize: { type: String, required: true },
    plus: { type: Array, required: true },
  },
  data () {
    return {
      products: [],
      page: Number(this.$route.params.page) || 0
    }
  },
  mounted() {
    this.populateGrid()
  },
  methods: {
    action (link, product=null) {
      switch (link) {
        case 'PREVIOUS_MENU':
          this.$router.go(-1)
          break
        case 'MAIN_MENU':
          this.$store.dispatch('routerHistory/clear')
          this.$router.push('/')
          break
        case 'ADD_PRODUCT':
          this.$store.dispatch('checkout/addEntry', {
            type: 'product',
            product: new Product(product.sku, product.name, product.listPrice.value),
            quantity: 1
          })
          break
        case 'NEXT_PAGE':
          this.page++
          this.$router.replace({ name: this.$route.name, params: { page: this.page } })
          this.products = []
          this.populateGrid()
          break
        case 'PREVIOUS_PAGE':
          this.page--
          this.$router.replace({ name: this.$route.name, params: { page: this.page } })
          this.products = []
          this.populateGrid()
          break
        default:
          break
      }
    },
    populateGrid() {
      // Calc the grid size
      const size = Number(this.rows) * Number(this.rowSize)

      // Fetch 20 products by sku
      for (let i = 0; i < size; i++) {
        const index = this.page * size + i
        if (index >= this.plus.length) this.products.push(null)
        else fetchProductBySku(this.plus[index].sku).then(res => {
          this.products.push(res)
        })
      }
      console.log(this.page)
      console.log(this.products)
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
    },
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
    height: 100%
  .button
    height: 100%
    width: 100%
    padding: .1rem
    a
      font-size: 1rem
      display: flex
      flex-direction: column
      color: white
      text-decoration: none
      text-align: center
      justify-content: center
      align-items: center
      height: 100%
      max-height: 100%
      width: 100%
      max-width: 100%
      img
        display: block
        position: relative
        width: 100%
        height: 100%
        max-width: 75px
        max-height: 75px
        object-fit: contain
      .overlay
        filter: invert(100%)
      span
        color: white
        //noinspection CssInvalidPropertyValue
        text-wrap: nowrap
        text-overflow: ellipsis
        overflow: hidden
        width: 100%
    .integrated-numpad-wrapper
      display: flex
      justify-content: flex-start
      align-items: flex-start
  a:hover:not(.empty):not(.integrated-numpad-wrapper)
    cursor: pointer
</style>