<template>
  <div class="container">
    <div class="icon">
      <img src="/src/assets/icons/secondary_button_warning.png" alt="">
    </div>
    <div class="content">
      <span>{{ message }}</span>
    </div>
    <div class="button" @click="this.$store.dispatch('alert/closeAlert')">OK</div>
  </div>
</template>

<script>
export default {
  name: "InfoAlert",
  props: { message: String }
}
</script>

<style lang="sass" scoped>
.container
  z-index: 200
  display: grid
  grid-template-areas: "icon message" ". button"
  grid-template-columns: fit-content(100%) auto
  grid-template-rows: auto fit-content(100%)
  min-height: 12rem
  min-width: 20rem
  max-width: 25rem
  background-color: var(--color-background)
  border: solid 1px var(--color-border)
  padding: 3rem .75rem 1rem .75rem
  column-gap: 1rem
  row-gap: .3rem
.icon
  grid-area: icon
  display: flex
  justify-content: center
  align-items: center
  img
    width: 5rem
    height: auto
    filter: invert(87%) sepia(94%) saturate(852%) hue-rotate(17deg) brightness(101%) contrast(82%)
.content
  grid-area: message
  display: flex
  flex-direction: column
  justify-content: center
  span
    font-size: 1rem
    text-align: left
    font-weight: bold
.button
  grid-area: button
  background-color: var(--color-light-blue)
  margin: 0 0 0 auto
  padding: .3rem 2rem
  &:hover
    cursor: pointer
</style>