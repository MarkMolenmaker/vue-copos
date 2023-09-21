<template>
  <PLUPanel v-if="products" rows="5" row-size="4" :products="products" /> <!-- Rows and row size is the amount of image-buttons, an additional controls row is always added. -->
</template>

<script>
import PLUPanel from "@/components/Menus/PLU/PLUPanel.vue";
import {collectAppleAndPearProductsList, collectBreadProductsList} from "@/util/actions/fetchProductFromAPI";

export default {
  name: "KassaPLUsAppelsPerenMenu",
  components: {PLUPanel},
  data () {
    return {
      products: null
    }
  },
  mounted() {
    collectAppleAndPearProductsList().then(res => {
      this.products = res
    })
  }
}
</script>

<style scoped>

</style>