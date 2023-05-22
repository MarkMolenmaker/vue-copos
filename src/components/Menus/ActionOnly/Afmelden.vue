<template>

</template>

<script>
export default {
    name: "Afmelden",
    mounted() {
        this.$store.dispatch("session/logout")
        this.$router.push('/')
    }
}
</script>

<style scoped>

</style>