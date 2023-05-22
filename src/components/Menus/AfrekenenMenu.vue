<template>
    <MenuPanel rows="8" row-size="5" :buttons="buttons" integrated-numpad />
</template>

<script>
import MenuPanel from "@/components/Menus/MenuPanel.vue";
import { Button } from "@/util/Button";
import {mapGetters} from "vuex";

export default {
    name: "AfrekenenMenu",
    computed: {...mapGetters(['session'])},
    mounted() {
        this.emitter.on('integrated-numpad-button-pressed', ({ type, value }) => this.handleInputReceived(type, value))
        if (this.session.status.type !== 'SALE_PAYMENT')
            this.$store.dispatch("continueSession")
    },
    data() {
        return {
            buttons: [ // 0-7 : 0-4
                new Button('Supervisor menu', 'red', '/supervisor_menu', 1, 2, 1),
                new Button('TGTG Magicbox', 'transparent', '/tgtg_magicbox', 1, 3, 1),
                new Button('TGTG Broodbox', 'transparent', '/tgtg_broodbox', 1, 4, 1),

                new Button('Zegelboekjes diversen', 'purple', '/zegelboekjes_diversen', 2, 0, 1),
                new Button('Mobiele PIN', 'dark-green', '/mobiele_pin', 2, 3, 1),
                new Button('Verkoop op rekening', 'dark-green', '/verkoop_op_rekening', 2, 4, 1),

                new Button('Opzoeken klant', 'dark-green', '/opzoeken_klant', 3, 0, 1),
                new Button('Extra pinnen', 'orange', '/extra_pinnen', 3, 1, 1),
                new Button('Emballage retour', 'orange', '/emballage_retour', 3, 2, 1),
                new Button('Cadeaukaart', 'orange', '/cadeaukaart', 3, 3, 1),
                new Button('Waardebon', 'orange', '/waardebon', 3, 4, 1),

                new Button('5 Euro', 'transparent', '/pay_5_euros', 4, 0, 1),
                new Button('10 Euro', 'transparent', '/pay_10_euros', 4, 1, 1),
                new Button('20 Euro', 'transparent', '/pay_20_euros', 4, 2, 1),
                new Button('50 Euro', 'transparent', '/pay_50_euros', 4, 3, 1),
                new Button('100 Euro', 'transparent', '/pay_100_euros', 4, 4, 1),

                new Button('Contant', 'orange', '/pay_cash', 5, 3, 2),
                new Button('Pin', 'orange', '/pay_pin', 7, 3, 2),
            ]
        }
    },
    methods: {
        handleInputReceived(type, value) {
            if (this.session.status.type !== 'SALE_PAYMENT') return
            if (type === 'INPUT') this.session.input += value
            else if (type === 'ACTION')
                switch (value) {
                    case '*':
                        this.session.input += "[*]"
                        break
                    case 'BCK':
                        this.session.input = this.session.input.substring(0, this.session.input.length - 1)
                        break
                    case ',':
                        this.session.input += ","
                        break
                    case 'ENTER':
                        this.$store.dispatch('makePayment', { type: "Contant", value: this.session.input })
                        this.session.input = ""
                        break;
                }
        }
    },
    components: {MenuPanel}
}
</script>

<style scoped>

</style>