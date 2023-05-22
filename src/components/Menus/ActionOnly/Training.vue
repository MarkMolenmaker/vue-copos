<template>

</template>

<script>
export default {
    name: "Training",
    mounted() {
        this.$store.dispatch("session/toggleTrainingMode")
        this.$router.go(-2) // Go back to the previous page
                            // (2 pages back, because 1 page back is the supervisor page itself,
                            // and we want to go back to the page before that)
    }
}
</script>

<style scoped>

</style>