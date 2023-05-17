<template>

</template>

<script>
export default {
    name: "PayCash",
    mounted() {
        this.$store.dispatch("continueSession")
        this.$router.push('/')
    }
}
</script>

<style scoped>

</style>