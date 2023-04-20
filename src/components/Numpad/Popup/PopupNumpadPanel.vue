<template>
    <div class="container numpad">
        <div class="row s4">
            <PopupNumpadButton num="7" /><PopupNumpadButton num="8" /><PopupNumpadButton num="9" /><PopupNumpadButton num="KEY" />
        </div>
        <div class="row s4">
            <PopupNumpadButton num="4" /><PopupNumpadButton num="5" /><PopupNumpadButton num="6" /><PopupNumpadButton num="BCK" />
        </div>
        <div class="row s4">
            <PopupNumpadButton num="1" /><PopupNumpadButton num="2" /><PopupNumpadButton num="3" /><PopupNumpadButton num="C" />
        </div>
        <div class="row s2">
            <PopupNumpadButton num="0" /><PopupNumpadButton num="ENTER" />
        </div>
    </div>
</template>

<script>
import PopupNumpadButton from "@/components/Numpad/Popup/PopupNumpadButton.vue";

export default {
    name: "PopupNumpadPanel",
    components: {PopupNumpadButton}

}
</script>

<style lang="sass" scoped>
.container.numpad
  padding: .35rem
  .row
    display: grid
  .row.s4
    grid-template-columns: 1fr 1fr 1fr 1fr
  .row.s2
    grid-template-columns: 1fr 1fr
</style>