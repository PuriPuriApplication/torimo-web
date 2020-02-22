<template>
    <div class="login">
        <h2>Welcome Torimo</h2>
        <img src="/img/twitter.png" @click="submit" />
    </div>
</template>

<script>
export default {
    name: 'Login',
    methods: {
        submit() {
            alert('Hello World!!');
        }
    }
};
</script>
<style scoped>
img {
    width: 200px;
}
</style>
