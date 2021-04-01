<template>
  <div class="gallery">
    <g-link
      :to="photo.node.path"
      v-for="photo in photos.edges"
      :key="photo.node.id"
    >
      <figure>
        <div class="parallax">
          <g-image :src="photo.node.thumbnail" />
        </div>
        <figcaption>
          <div class="informations">
            <div class="location">{{ photo.node.title }}</div>
            <div class="date">{{ photo.node.date | date }}</div>
          </div>
        </figcaption>
      </figure>
    </g-link>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
export default {
  props: ["photos"],
  mounted() {
    if (process.isClient) {
      var simpleParallax = require("simple-parallax-js");
      var images = document.querySelectorAll(".gallery img");
      new simpleParallax(images, {
        orientation: "down",
        scale: 1.3,
        delay: 0.1,
        customWrapper: ".parallax",
      });
    }
  },
  methods: {
    onClick: function (event, photo) {
      event.preventDefault();
      this.Events.$emit("showPhoto", photo.node.id);
    },
  },
};
</script>