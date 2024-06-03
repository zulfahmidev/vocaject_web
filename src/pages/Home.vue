<template>
    <div>
        Redirect to base...
    </div>
</template>

<script>
export default {
    mounted() {
        this.$router.push({name: 'profile'})
    },
}
</script>