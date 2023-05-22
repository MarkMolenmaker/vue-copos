<template>

</template>

<script>
export default {
    name: "Pay50Euros",
    mounted() {
        this.$store.dispatch("checkout/makePayment", {type: "Contant", value: "50"})
        this.$router.go(-1)
    }
}
</script>

<style scoped>

</style>