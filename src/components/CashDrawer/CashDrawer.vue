<template>
  <div class="cash-drawer" v-if="isOpen">
    <div class="upper-section">
      <div class="double-row">
        <NoteCompartment content="ct5000" />
        <NoteCompartment content="ct2000" />
      </div>
      <div class="triple-column">
        <div class="compartment" />
        <div class="compartment" />
        <div class="compartment" />
      </div>
      <div class="double-row">
        <div class="compartment" />
        <div class="compartment" />
      </div>
    </div>
    <div class="lower-section">
      <div class="double-column bills--coins-section">
        <div class="double-row">
          <NoteCompartment content="ct1000" />
          <NoteCompartment content="ct500" />
        </div>
        <div class="double-column">
          <CoinCompartment content="ct200" />
          <CoinCompartment content="ct100" />
        </div>
      </div>
      <div class="double-row coins--under-section">
        <div class="quadruple-column">
          <CoinCompartment content="ct50" />
          <CoinCompartment content="ct20" />
          <CoinCompartment content="ct10" />
          <CoinCompartment content="ct5" />
        </div>
        <div class="compartment" />
      </div>
    </div>
  </div>
  <div class="cash-drawer" v-else />
</template>

<script>
import CoinCompartment from "@/components/CashDrawer/CoinCompartment.vue";
import NoteCompartment from "@/components/CashDrawer/NoteCompartment.vue";
import {mapGetters} from "vuex";

export default {
  name: "CashDrawer",
  components: { NoteCompartment, CoinCompartment },
  computed: { ...mapGetters({ isOpen: 'vault/isOpen' }) },
}
</script>

<style lang="sass" scoped>
.cash-drawer
  margin: 1rem 0
  background-color: var(--color-light-black)
  border: .15rem solid var(--color-black)
  height: 20rem
  display: grid
  grid-template-rows: 1fr 1fr
  *
    display: grid
  .compartment
    border: .15rem solid var(--color-black)

  .upper-section
    grid-template-columns: 3fr 2fr 3fr
  .lower-section
    grid-template-columns: 5fr 4fr

  .double-column
    grid-template-columns: 1fr 1fr
  .double-row
    grid-template-rows: 1fr 1fr
  .triple-column
    grid-template-columns: 1fr 1fr 1fr
  .quadruple-column
    grid-template-columns: 1fr 1fr 1fr 1fr

  .bills--coins-section
    grid-template-columns: 3fr 2fr
  .coins--under-section
    grid-template-rows: 9fr 1fr
</style>