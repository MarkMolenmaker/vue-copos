<template>
    <div class="container numpad">
        <div class="row">
            <IntegratedNumpadButton num="7" /><IntegratedNumpadButton num="8" /><IntegratedNumpadButton num="9" /><IntegratedNumpadButton num="*" />
        </div>
        <div class="row">
            <IntegratedNumpadButton num="4" /><IntegratedNumpadButton num="5" /><IntegratedNumpadButton num="6" /><IntegratedNumpadButton num="BCK" />
        </div>
        <div class="row">
            <IntegratedNumpadButton num="1" /><IntegratedNumpadButton num="2" /><IntegratedNumpadButton num="3" /><IntegratedNumpadButton num="ENTER" double />
        </div>
        <div class="row">
            <IntegratedNumpadButton num="0" /><IntegratedNumpadButton num="00" /><IntegratedNumpadButton num="," />
        </div>
    </div>
</template>

<script>
import IntegratedNumpadButton from "@/components/Numpad/Integrated/IntegratedNumpadButton.vue";

export default {
    name: "IntegratedNumpadPanel",
    components: {IntegratedNumpadButton}

}
</script>

<style lang="sass" scoped>
.container.numpad
    width: 100%
    height: calc(75% + .1rem)
    grid-template-rows: 25% 25% 25% 25%
    padding: 0
    z-index: 1
    .row
        display: grid
        height: 100%
        grid-template-columns: 25% 25% 25% 25%
</style>