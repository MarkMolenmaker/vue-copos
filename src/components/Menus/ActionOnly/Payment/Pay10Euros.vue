<template>

</template>

<script>
export default {
    name: "Pay10Euros",
    mounted() {
        this.$store.dispatch("checkout/makePayment", {type: "Contant", value: "10"})
        this.$router.go(-1)
    }
}
</script>

<style scoped>

</style>