<template>
    <section>
        <div class="row" :style="{ height: 100 / rows + '%' }" v-for="row in buttonGrid" :key="row">
            <div class="button" v-for="button in row" :key="button" :style="{ width: (100 / rowSize) * (button !== null ? button.size : 1) + '%'}">
                <router-link v-if="button !== null" :class="button.color" :to="button.link">
                    {{ button.title }}
                </router-link>
                <a v-else class="empty" />
            </div>
        </div>
    </section>
</template>

<script>
import {Button} from "@/util/Button";

export default {
    name: "MenuPanel",
    props: {
        rows: { type: String, required: true },
        rowSize: { type: String, required: true },
        buttons: { type: Array[Button], required: true }
    },
    computed: {
        buttonGrid () {
            const grid = []
            for (let row = 0; row < Number(this.rows); row++) {
                grid.push([])
                for (let pos = 0; pos < Number(this.rowSize); pos++)
                    grid[row][pos] = null
            }
            this.buttons.forEach(button => {
                grid[button.row][button.position + (grid[button.row].length - this.rowSize)] = button
                if (button.size > 1) {
                    grid[button.row].splice(button.position + (grid[button.row].length - this.rowSize) + 1, button.size - 1)
                }
            })
            return grid
        }
    }
}
</script>

<style lang="sass" scoped>
section
    height: 100%
    width: 100%
    .row
        display: flex
        justify-content: center
        align-items: center
        width: 100%
    .button
        height: 100%
        width: 100%
        padding: .1rem
        a
            font-size: 1.25rem
            display: flex
            color: white
            text-decoration: none
            text-align: center
            justify-content: center
            align-items: center
            height: 100%
            width: 100%

    a:hover:not(.empty)
        cursor: pointer
</style>