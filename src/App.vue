<template>
  <div v-if="!session.active" class="overlay">
      <div class="container input">
          <span class="title">{{ session.status.description }}</span>
          <form class="line" @submit.prevent="handleInputReceived('ACTION', 'ENTER')">
              <input class="input" :type="session.status.type !== 'ENTER_PASSWORD' ? 'text' : 'password'" v-model="input" v-focus >
              <input class="button light-blue color-black" type="button" value="Annuleren" @click="this.$store.dispatch('logout')" />
              <input class="button light-gray" type="submit" value="OK" />
          </form>
      </div>
      <PopupNumpadPanel />
  </div>
  <main class="default-main">
      <TransactionDetailsPanel />
      <router-view v-if="session.active" />
  </main>
  <footer>
      <div><span>{{ session.status.title }}</span></div>
      <div>
          <span v-if="session.cash_register">Lade: {{ session.cash_register.number }}</span>
          <span>CO2805HV003FO-virtual (WEB)</span>
          <span v-if="session.user">{{ session.user.code }}</span>
          <span>{{ datetime }}</span>
          <span>(v.0.0.1.20230401.001)</span>
      </div>
  </footer>
</template>

<script>
import {mapGetters} from "vuex";
import TransactionDetailsPanel from "@/components/TransactionDetails/TransactionDetailsPanel.vue";
import PopupNumpadButton from "@/components/Numpad/Popup/PopupNumpadButton.vue";
import PopupNumpadPanel from "@/components/Numpad/Popup/PopupNumpadPanel.vue";
import {fetchRandomProduct, Product} from "@/util";

export default {
    components: {PopupNumpadPanel, PopupNumpadButton, TransactionDetailsPanel },
    data () { return { datetime: "", input: "" }},
    created () { setInterval(this.currentDateTime, 1000); this.currentDateTime() },
    methods: {
        currentDateTime () { this.datetime = new Date().toLocaleString('nl') },
        handleInputReceived (type, value) {
            if (type === 'INPUT') this.input += value
            else if (type === 'ACTION')
                switch (value) {
                    case 'KEY':
                        break
                    case 'BCK':
                        this.input = this.input.substring(0, this.input.length - 1)
                        break
                    case 'C':
                        this.input = ""
                        break
                    case 'ENTER':
                        if (this.$store.dispatch('continueSession',  this.input)) this.input = ""
                }
        }
    },
    computed: { ...mapGetters([ 'session' ]) },
    mounted() {
        this.emitter.on('popup-numpad-button-pressed', ({ type, value }) => this.handleInputReceived(type, value))
        // Handle the event of the spacebar being released
        window.addEventListener('keyup', async (e) => {
            if (!this.session.active) return
            if (e.code === 'Space') {
                const online = await fetchRandomProduct()
                if (!online) return // @TODO: show popup: ongeldig/onbekend artikel
                this.$store.commit('addProductToCheckout', {
                    product: new Product(online.sku, online.name, online.listPrice.value),
                    quantity: 1
                })
            }
        })
    }
}
</script>

<style lang="sass" scoped>
  main, footer
    border: solid white 1px

  main
    display: grid
    grid-template-columns: 50fr 50fr
    padding: .25rem

  footer
    display: flex
    justify-content: space-between
    align-items: center
    span
      margin: 0 .5rem
      font-weight: bold

  .overlay
    z-index: 100
    width: 100%
    height: 100%
    position: absolute
    background: rgba(255, 255, 255, 0.25)

    display: flex
    flex-direction: column
    justify-content: flex-end
    gap: 3rem
    align-items: center
    padding: 10vh 5vw

    .container
      border: solid white 1px
      background: var(--color-background-dark)

    .container.input
      padding: 1rem
      width: 100%
      span.title
        font-size: 1.75rem
      form.line
        display: grid
        align-items: center
        gap: .5rem
        grid-template-columns: 8fr 1fr 1fr
        input
          display: flex
          justify-content: center
          align-items: center
        input.button
          border: none
          border-radius: 0
          height: 3rem
        input.button:hover
          cursor: pointer
        input.input
          height: 2.5rem
          font-size: 1.5rem
</style>
