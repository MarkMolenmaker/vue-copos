<template>
    <MenuPanel rows="8" row-size="5" :buttons="buttons" />
</template>

<script>
import MenuPanel from "@/components/Menus/MenuPanel.vue";
import { Button } from "@/util/Button";

export default {
    name: "DefaultMenu",
    data () {
        return {
            buttons: [ // 0-7 : 0-4
                new Button('Afmelden', 'gray', '/afmelden', 0, 2, 1),

                new Button('Supervisor menu', 'red', '/supervisor_menu', 1, 2, 1),
                new Button('Non scan menu', 'blue', '/non_scan_menu', 1, 3, 1),
                new Button('Kassa PLU\'s', 'green', '/kassa_plus', 1, 4, 1),

                new Button('Opzoeken kassabon', 'red', '/opzoeken_kassabon', 2, 4, 1),

                new Button('Saldo cadeaukaart', 'orange', '/saldo_cadeaukaart', 3, 2, 1),
                new Button('Kopie bon', 'blue', '/kopie_bon', 3, 4, 1),

                new Button('Prijs opvraag', 'dark-green', '/prijs_opvraag', 4, 0, 1),
                new Button('Opzoeken klant', 'dark-green', '/opzoeken_klant', 4, 1, 1),
                new Button('Zelfscan', 'dark-green', '/zelfscan', 4, 2, 1),

                new Button('Afrekenen', 'orange', '/afrekenen', 7, 3, 2),
            ]
        }
    },
    components: {MenuPanel}
}
</script>

<style scoped>

</style>