<template>
  <PLUPanel v-if="plus" rows="5" row-size="4" :plus="plus" /> <!-- Rows and row size is the amount of image-buttons, an additional controls row is always added. -->
</template>

<script>
import PLUPanel from "@/components/Menus/PLU/PLUPanel.vue";
import {collectBreadProductsList} from "@/util/actions/fetchProductFromAPI";

export default {
  name: "KassaPLUsBroodjesMenu",
  components: {PLUPanel},
  data () {
    return {
      plus: null
    }
  },
  mounted() {
    collectBreadProductsList().then(res => {
      this.plus = res
    })
  }
}
</script>

<style scoped>

</style>