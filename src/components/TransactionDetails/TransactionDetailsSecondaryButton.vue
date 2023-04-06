<template>
    <div :class="classObject" >
      <img :src="image" :alt="icon" />
    </div>
</template>

<script>
export default {
    name: "TransactionDetailsSecondaryButton",
    props: {
        icon: { type: String, required: true },
        overlay: Boolean, background: Boolean
    },
    computed: {
        image () { return 'src/assets/icons/secondary_button_' + this.icon + '.png' },
        classObject () { return { background: this.background, overlay: this.overlay } }
    }
}
</script>

<style lang="sass" scoped>
div
  display: flex
  justify-content: center
  align-items: center
  width: 4rem

  .background
    background: #68a3da

  .overlay
    filter: invert(64%) sepia(76%) saturate(478%) hue-rotate(181deg) brightness(86%) contrast(99%)

  img
    width: 4rem


</style>