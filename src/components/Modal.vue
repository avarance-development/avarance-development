<template>
  <div class="modal-overlay">
      <div class="modal-content">
        <p class="modal-message">{{  this.modalMessage  }}</p>
        <button class="btn" @click="closeModal">Close</button>
      </div>
  </div>
</template>

<script>
export default {
    name: "Modal",
    props: ["modalMessage"],
    methods: {
        closeModal() {
            this.$emit("close-modal");
        },
    },
}
</script>

<style lang="scss" scoped>
.modal-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 101;
    background-color: rgba($color: #000000, $alpha: 0.65);

    .modal-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        width: 300px;
        height: auto;
        padding: 40px 30px;
        background-color: #fff;

        .modal-message {
            text-align: center;
            padding-bottom: 20px;
        }

        .btn {
            align-self: center;
            width: 128px;
            height: 32px;
            border-radius: 8px;
            background-color: #fff;
            cursor: pointer;
        }
    }
}
</style>