<template>
    <MenuPanel rows="8" row-size="5" :buttons="buttons" />
</template>

<script>
import MenuPanel from "@/components/Menus/MenuPanel.vue";
import { Button } from "@/util/Button";

export default {
    name: "NotFoundMenu",
    data () {
        return {
            buttons: [ // 0-7 : 0-4
                new Button('Menu niet gevonden', 'red', '/', 3, 1, 3),
                new Button('Terug naar hoofdmenu', 'gray', '/',4, 1, 3)
            ]
        }
    },
    components: {MenuPanel}
}
</script>

<style scoped>

</style>