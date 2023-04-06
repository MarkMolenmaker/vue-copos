<template>
    <div class="container numpad">
        <div class="row s4">
            <NumpadButton num="7" /><NumpadButton num="8" /><NumpadButton num="9" /><NumpadButton num="KEY" />
        </div>
        <div class="row s4">
            <NumpadButton num="4" /><NumpadButton num="5" /><NumpadButton num="6" /><NumpadButton num="BCK" />
        </div>
        <div class="row s4">
            <NumpadButton num="1" /><NumpadButton num="2" /><NumpadButton num="3" /><NumpadButton num="C" />
        </div>
        <div class="row s2">
            <NumpadButton num="0" /><NumpadButton num="ENTER" />
        </div>
    </div>
</template>

<script>
import NumpadButton from "@/components/Numpad/NumpadButton.vue";

export default {
    name: "NumpadPanel",
    components: {NumpadButton}

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