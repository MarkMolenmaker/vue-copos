<template>

</template>

<script>
export default {
    name: "Pay100Euros",
    mounted() {
        this.$store.dispatch("checkout/makePayment", {type: "Contant", value: "100"})
        this.$router.go(-1)
    }
}
</script>

<style scoped>

</style>