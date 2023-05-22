<template>
  <div class="compartment">
    <div class="content" :style="{ backgroundImage: this.coin }"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CoinCompartment",
  props: { content: { type: String, required: true } },
  computed: {
    ...mapGetters({ coins: "vault/coins" }),
    coin() { return `url("src/assets/icons/valuta/${this.content}_cluster.png")` }
  }
}
</script>

<style lang="sass" scoped>
.compartment
  .content
    width: 100%
    height: 100%
    background-image: url("/src/assets/icons/loading.gif")
    background-repeat: no-repeat
    background-size: contain
</style>