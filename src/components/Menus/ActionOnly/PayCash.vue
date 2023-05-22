<template>

</template>

<script>
export default {
    name: "PayCash",
    mounted() {
        this.$store.dispatch("session/continue")
        this.$router.push('/')
    }
}
</script>

<style scoped>

</style>