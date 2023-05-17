<template>

</template>

<script>
export default {
    name: "PayPin",
    mounted() {
        this.$store.dispatch("continueSession")
        this.$router.push('/')
    }
}
</script>

<style scoped>

</style>