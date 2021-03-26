<template>
  <div class="gallery">
    <a
      href="#"
      v-for="photo in photos.edges"
      :key="photo.node.id"
      @click="onClick($event, photo)"
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
          <div class="exif">
            <ul>
              <li class="model">model make</li>
              <li class="lens">LensModel</li>
              <li><strong>Focale</strong>f mm</li>
              <li><strong>Vitesse</strong>et s</li>
              <li><strong>Ouverture</strong>f/ fnumber</li>
              <li><strong>ISO</strong>iso</li>
            </ul>
          </div>
        </figcaption>
      </figure>
    </a>
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
  }

  .location {
    font-weight: bold;
    font-size: 1.1em;
    letter-spacing: 0.1em;
    line-height: 1.8;
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
}
</style>

<script>
import simpleParallax from "simple-parallax-js";

export default {
  props: ["photos"],
  mounted() {
    var images = document.querySelectorAll(".gallery img");
    new simpleParallax(images, {
      orientation: "down",
      scale: 1.3,
      delay: 0,
      customWrapper: ".parallax",
    });
  },
  methods: {
    onClick: function (event, photo) {
      event.preventDefault();
      this.Events.$emit("showPhoto", photo.node.id);
    },
  },
};
</script>