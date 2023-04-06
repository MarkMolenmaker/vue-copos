<template>

</template>

<script>
export default {
    name: "Afmelden",
    mounted() {
        this.$store.dispatch("logout")
        this.$router.push('/')
    }
}
</script>

<style scoped>

</style>