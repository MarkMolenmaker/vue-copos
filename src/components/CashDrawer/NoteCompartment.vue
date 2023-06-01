<template>
  <div class="compartment" >
    <div class="content" :style="{ backgroundImage: `url('${this.note}')` }"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "NoteCompartment",
  props: { content: { type: String, required: true } },
  computed: {
    ...mapGetters({ coins: "vault/notes" }),
    note () { return new URL(`/src/assets/icons/valuta/${this.content}_cluster.png`, import.meta.url).href },
    // note() { return `url("src/assets/icons/valuta/${this.content}_cluster.png")` }
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
    background-size: cover
</style>