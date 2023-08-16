<template>
    <div>
        <button @click="backHome" class="back-button">Back to homepage</button>
    </div>
</template>
<script>
export default {
    name: "BackButton",
    components: {},
    data() {
        return {
        }
    },
    methods: {
        backHome() {
      this.$router.push("/");
    },
    }

}
</script>
<style>
.back-button{
  background-color: darkcyan;
  border-radius: 0%;
  width: 200px;
  height: 50px;

}
</style>
        