<template>

</template>

<script>
export default {
    name: "Pay5Euros",
    mounted() {
        this.$store.dispatch("makePayment", {type: "Contant", value: "5"})
        this.$router.go(-1)
    }
}
</script>

<style scoped>

</style>