<template>
    <div class="success-wrapper">
        <div class="info">

        </div>
        <div class="form">
            <Form :title="title" :subtitle="subtitle"/>
        </div>
    </div>
</template>

<script>
import Form from "../components/Form.vue"

export default {
    name: 'Success',
    data() {
        return {
            title: 'Run into any issues?',
            subtitle: 'Tell us in the form below'
        }
    },
    components: {
        Form,
    }
}
</script>

<style lang='scss' scoped>

.success-wrapper {
    display: flex;
    flex-direction: row;
    min-height: calc(100vh);
    padding-top: 80px;
    width: 100%;

    .info {
        flex-basis: 50%;
    }

    .form {
        flex-basis: 50%;
        padding: 0 10% 0 10px;
        margin-top: 50px;
    }
}
</style>