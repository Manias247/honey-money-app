<template>
  <header>
    <div class="heading">
      <h1 class="title">{{ mainHeading }}</h1>

    </div>
    <img :src="thumbNail" alt="Profile Photo" class="thumbnail" />
    
    <div class="hamburger">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>


  </header>
</template>

<script>
export default {
  name: "HeaderBar",
  props: {
    thumbNail: String
  },
  data() {
    return {
      mainHeading: "Welcome to the Honey Money Tracker"
    }
  },
  methods: {

  },
};
</script>

<style>
header {
  width: 100%;
  padding: 30px;
  top: 0;
  background-color: rgb(49, 67, 125);
  color: aliceblue;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-family: 'Gloria Hallelujah', cursive;
  text-shadow: 2px 2px 2px #000000;
}

.thumbnail {
  border-radius: 100%;
  width: 100px;
  height: 100px;

}
</style>