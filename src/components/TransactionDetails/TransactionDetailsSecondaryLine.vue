<template>
    <div class="line" :class="classObject" >
        <span>{{ first }}</span>
        <span>{{ second }}</span>
        <span>{{ third }}</span>
    </div>
</template>

<script>
export default {
    name: "TransactionDetailsSecondaryLine",
    props: {
        first: { type: String, required: false, default: '' },
        second: { type: String, required: false, default: '' },
        third: { type: String, required: false, default: '' },
        normal: Boolean, bold: Boolean, largeBold: Boolean
    },
    computed: { classObject () { return { 'normal': this.normal, 'bold': this.bold, 'large-bold': this.largeBold } } }
}
</script>

<style lang="sass" scoped>
.line
  display: grid
  grid-template-columns: 3rem 1fr max-content

.normal span
  font-size: 1.05rem
  font-weight: normal

.bold span
  font-size: 1.15rem
  font-weight: bold

.large-bold span
  font-weight: bold
  font-size: 1.35rem

span
    margin: 0 .5rem
</style>