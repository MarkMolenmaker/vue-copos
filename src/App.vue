<template>
  <div v-if="!session.active" class="overlay">
      <div class="container input">
          <span class="title">Voer het ladenummer in</span>
          <div class="line">
              <input type="text" v-model="input"><span class="light-blue color-black">Annuleren</span><span class="gray">OK</span>
          </div>
      </div>
      <NumpadPanel />
  </div>
  <main class="default-main">
      <TransactionDetailsPanel />
      <router-view v-if="session" />
  </main>
  <footer>
      <div><span>{{ session.state }}</span></div>
      <div>
          <span v-if="session.pay_desk">Lade: {{ session.pay_desk.number }}</span>
          <span>CO2805HV003FOvirtual (WEB)</span>
          <span v-if="session.user">{{ session.user.code }}</span>
          <span>{{ datetime }}</span>
          <span>(v.0.0.1.20230401.001)</span>
      </div>
  </footer>
</template>

<script>
import {mapGetters} from "vuex";
import TransactionDetailsPanel from "@/components/TransactionDetails/TransactionDetailsPanel.vue";
import NumpadButton from "@/components/Numpad/NumpadButton.vue";
import NumpadPanel from "@/components/Numpad/NumpadPanel.vue";

export default {
    components: {NumpadPanel, NumpadButton, TransactionDetailsPanel },
    data () { return { datetime: "", input: "" }},
    created () { setInterval(this.currentDateTime, 1000); this.currentDateTime() },
    methods: {
        currentDateTime () { this.datetime = new Date().toLocaleString('nl') }
    },
    computed: { ...mapGetters([ 'session' ]) },
    mounted() {
        this.emitter.on('numpad-button-pressed', options => {
            if (options.type === 'INPUT') this.input += options.value
            else if (options.type === 'ACTION')
                switch (options.value) {
                    case 'KEY':
                        break
                    case 'BCK':
                        this.input = this.input.substring(0, this.input.length - 1)
                        break
                    case 'C':
                        this.input = ""
                        break
                    case 'ENTER':
                        console.log(this.input)
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
      div.line
        display: grid
        align-items: center
        gap: .5rem
        grid-template-columns: 8fr 1fr 1fr
        *
          display: flex
          justify-content: center
          align-items: center
        span
          height: 3rem
        span:hover
          cursor: pointer
        input
          height: 2.5rem
</style>
