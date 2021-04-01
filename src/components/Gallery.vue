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
figure {
  position: relative;
  //overflow: hidden;
  margin: 0;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
    background: #f2f2f2 url("/images/loading.svg") no-repeat center;
  }

  &:hover {
    figcaption {
      transition: 1s ease all;
      opacity: 1;
    }

    img {
      //transition: 4s linear all;
      transform: scale(1);
    }
  }
}

figcaption {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(24, 50, 125, 0.5);
  transition: 0.8s ease all;
  opacity: 0;

  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  .informations {
    margin: 0.8em;
  }

  .location {
    font-weight: bold;
    font-size: 1.1em;
    letter-spacing: 0.5px;
    line-height: 1.4;
    margin-bottom: 0.3em;
  }

  .date {
    letter-spacing: 0.1em;
    font-size: 0.9em;
  }

  .exif {
    display: none;
  }
}

img {
  // display: block;
  // transition: 0.2s ease all;
  // transform: scale(1);
  width: 100%;
  height: 100%;
}

.parallax {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

<script>
import simpleParallax from "simple-parallax-js";

export default {
  props: ["photos"],
  mounted() {
    if (process.isClient) {
      var images = document.querySelectorAll(".gallery img");
      new simpleParallax(images, {
        orientation: "down",
        scale: 1.3,
        delay: 0,
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