<template>
  <span @click="handleClick" :class="{double: this.double}">{{ num }}</span>
</template>

<script>
export default {
    name: "IntegratedNumpadButton",
    props: {
        num: { type: String, required: true },
        double: { type: Boolean },
    },
    methods: {
        handleClick() {
            const options = { type: 'ACTION', value: this.num }
            if (this.num === '00') {
                options.type = 'INPUT'
                options.value = this.num
            }
            else if (!isNaN(this.num) ) {
                options.type = 'INPUT'
                options.value = Number(this.num)
            }
            this.emitter.emit('integrated-numpad-button-pressed', options)
        }
    }, emits: [ 'integrated-numpad-button-pressed' ]
}
</script>

<style lang="sass" scoped>
span
  display: flex
  justify-content: center
  align-items: center
  text-align: center
  color: black
  margin: .1rem
  background: var(--color-gray)

  -webkit-user-select: none /* Safari */
  -ms-user-select: none /* IE 10 and IE 11 */
  user-select: none /* Standard syntax */
.double
  height: calc(200% - .2rem)
  z-index: 2
span:hover
  cursor: pointer
</style>