<template>
    <div class="wrapper">
        <Form :title="title" :subtitle="subtitle"/>
    </div>
</template>

<script>
import Form from "../components/Form.vue"

export default {
    name: 'Contact',
    data() {
        return {
            title: "Send in your Feedback",
            subtitle: "We will get back to you as soon as posibble"
        }
    },
    components: {
        Form,
    }
}
</script>

<style lang='scss' scoped>

.wrapper {
    padding: 0 10%;
    padding-top: 80px;
    width: 100%;
    height: 100vh;
}
</style>