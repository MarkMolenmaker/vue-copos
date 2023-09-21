<template>
  <PLUPanel v-if="products" rows="5" row-size="4" :products="products" /> <!-- Rows and row size is the amount of image-buttons, an additional controls row is always added. -->
</template>

<script>
import PLUPanel from "@/components/Menus/PLU/PLUPanel.vue";
import {
  collectAppleAndPearProductsList,
  collectBreadProductsList, collectFruitPiecesProductsList,
  collectFruitWeightProductsList, collectVegetablePiecesProductsList, collectVegetableWeightProductsList
} from "@/util/actions/fetchProductFromAPI";

export default {
  name: "DynamicKassaPLUsMenu",
  components: { PLUPanel },
  props: { category: { type: String, required: true } },
  data () { return { products: null } },
  mounted() {
    // Based on the category prop, pick which products list is collected.
    if (this.category === 'BREAD')
      collectBreadProductsList().then(res => this.products = res)
    else if (this.category === 'APPLES_AND_PEARS')
      collectAppleAndPearProductsList().then(res => this.products = res)
    else if (this.category === 'FRUIT_PIECES')
      collectFruitPiecesProductsList().then(res => this.products = res)
    else if (this.category === 'FRUIT_WEIGHT')
      collectFruitWeightProductsList().then(res => this.products = res)
    else if (this.category === 'VEGETABLE_PIECES')
      collectVegetablePiecesProductsList().then(res => this.products = res)
    else if (this.category === 'VEGETABLE_WEIGHT')
      collectVegetableWeightProductsList().then(res => this.products = res)
  }
}
</script>

<style scoped>

</style>