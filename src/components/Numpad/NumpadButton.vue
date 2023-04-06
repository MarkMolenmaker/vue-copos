<template>
  <span @click="handleClick">{{ num }}</span>
</template>

<script>
export default {
    name: "NumpadButton",
    props: {
        num: { type: String, required: true }
    },
    methods: {
        handleClick() {
            const options = { type: 'ACTION', value: this.num }
            if (!isNaN(this.num) ) {
                options.type = 'INPUT'
                options.value = Number(this.num)
            }
            this.emitter.emit('numpad-button-pressed', options)
        }
    }, emits: [ 'keyPress' ]
}
</script>

<style lang="sass" scoped>
span
  display: flex
  justify-content: center
  align-items: center
  text-align: center
  padding: 1rem
  margin: .15rem
  color: black
  background: var(--color-light-blue)

  -webkit-user-select: none /* Safari */
  -ms-user-select: none /* IE 10 and IE 11 */
  user-select: none /* Standard syntax */
span:hover
  cursor: pointer
</style>