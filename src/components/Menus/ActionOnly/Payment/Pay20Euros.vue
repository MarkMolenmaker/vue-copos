<template>

</template>

<script>
export default {
    name: "Pay20Euros",
    mounted() {
        this.$store.dispatch("makePayment", {type: "Contant", value: "20"})
        this.$router.go(-1)
    }
}
</script>

<style scoped>

</style>