<template>
  <div v-if="!isActive" class="overlay">
      <div class="container input">
          <span class="title">{{ status.description }}</span>
          <form class="line" @submit.prevent="this.handleInputReceived('ACTION', 'ENTER')">
              <input class="input" :type="status.type !== 'ENTER_PASSWORD' ? 'text' : 'password'" v-model="input" v-focus >
              <input class="button light-blue color-black" type="button" value="Annuleren" @click="this.$store.dispatch('session/logout')" />
              <input class="button light-gray" type="submit" value="OK" />
          </form>
      </div>
      <PopupNumpadPanel />
  </div>
  <main class="default-main">
    <div v-if="activeAlert" class="alert-container">
      <InfoAlert v-if="alert.type === 'INFO'" :message="alert.message" />
      <BlockingAlert v-if="alert.type === 'BLOCKING'" :message="alert.message" />
      <!--    <ErrorAlert v-if="alert.type === 'ERROR'" :message="alert.message" />-->
      <!--    <WarningAlert v-if="alert.type === 'WARNING'" :message="alert.message" />-->
      <!--    <ConfirmAlert v-if="alert.type === 'CONFIRM'" :message="alert.message" />-->
      <div class="alert-overlay" />
    </div>
    <TransactionDetailsPanel class="transaction-container" />
    <router-view v-if="isActive" class="view-container" />
  </main>
  <footer>
      <div><span>{{ status.title }}</span></div>
      <div>
          <span v-if="register">Lade: {{ register.number }}</span>
          <span>CO2805HV003FO-virtual (WEB)</span>
          <span v-if="user">{{ user.code }}</span>
          <span>{{ datetime }}</span>
          <span>(v.0.0.1.20230522.001)</span>
      </div>
  </footer>
  <section class="cash-drawer--section">
    <CashDrawer />
    <div class="button" v-if="isOpen">
      <a @click="this.handleCloseAction()">Sluiten</a>
    </div>
  </section>
</template>

<script>
import {mapGetters} from "vuex";
import TransactionDetailsPanel from "@/components/TransactionDetails/TransactionDetailsPanel.vue";
import PopupNumpadButton from "@/components/Numpad/Popup/PopupNumpadButton.vue";
import PopupNumpadPanel from "@/components/Numpad/Popup/PopupNumpadPanel.vue";
import {Product} from "@/util/classes/Product";
import {fetchRandomProduct} from "@/util/actions/fetchProductFromAPI";
import CashDrawer from "@/components/CashDrawer/CashDrawer.vue";
import InfoAlert from "@/components/Alert/InfoAlert.vue";
import BlockingAlert from "@/components/Alert/BlockingAlert.vue";

export default {
  components: {BlockingAlert, InfoAlert, CashDrawer, PopupNumpadPanel, PopupNumpadButton, TransactionDetailsPanel },
  data () { return { datetime: "", input: "" } },
  created () { setInterval(this.currentDateTime, 1000); this.currentDateTime() },
  computed: {
    ...mapGetters({
      status: 'session/status',
      isActive: 'session/isActive',
      register: 'session/register',
      user: 'session/user',
      isOpen: 'vault/isOpen',
      activeAlert: 'alert/isActive',
      alert: 'alert/alert'
    })
  },
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
            if (this.$store.dispatch('session/continue',  this.input)) this.input = ""
        }
    },
    handleCloseAction () {
      this.$store.dispatch('vault/close')
      if (this.status.type === 'SALE_POST_PAYMENT')
        this.$store.dispatch('session/continue')
            .then(() => this.$router.push('/'))
    }
  },
  mounted() {
    this.emitter.on('popup-numpad-button-pressed', ({ type, value }) => this.handleInputReceived(type, value))

    // Handle the event of the insert key being released
    window.addEventListener('keyup', async (e) => {
      if (!this.isActive || this.status.type !== 'SALE_ASSEMBLY') return
      if (e.code === 'Insert') {
        const online = await fetchRandomProduct()
        if (!online) return // @TODO: show popup: ongeldig/onbekend artikel
        this.$store.dispatch('checkout/addEntry', {
          type: 'product',
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
  margin-top: 1rem
  display: grid
  grid-template-areas: "alert alert" "transaction view"
  grid-template-columns: 1fr 1fr
  padding: .25rem

  .alert-container
    grid-area: alert
    display: flex
    justify-content: center
    align-items: center
    position: absolute
    width: 100%
    height: 100%

.alert-overlay
  z-index: 101
  width: 100%
  height: 100%
  position: absolute
  background: rgba(255, 255, 255, 0.25)

  .transaction-container
    grid-area: transaction

  .view-container
    grid-area: view

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
    transform: translateY(-20rem)

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

.cash-drawer--section
  display: grid
  grid-template-columns: 100% 1fr
  .button
    width: 100%
    margin: 1rem 0 0 1rem
    padding: .1rem
    height: fit-content
    background-color: var(--color-red)
    a
      font-size: 1.25rem
      padding: 1rem 1.5rem
      display: flex
      color: white
      text-decoration: none
      text-align: center
      justify-content: center
      align-items: center
      height: 100%
      width: 100%
    a:hover
      cursor: pointer
</style>
