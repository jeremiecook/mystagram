<template>
  <div class="slider visible">
    <hooper
      ref="carousel"
      :settings="sliderOptions"
      @afterSlide="onMove"
      :initialSlide="1"
    >
      <slide
        v-for="photo in photosSlider"
        :key="photo.node.id"
        :index="photo.node.id"
      >
        <focus :photo="photo" />
      </slide>
      <navigation slot="hooper-addons"></navigation>
    </hooper>
  </div>
</template>

<style lang="scss">
.slider {
  opacity: 0;
  transition: all 0.5s ease;
  transition-delay: 0.5s;
  z-index: -1;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  //background: #222;
  background: #ececec;

  &.visible {
    transition: all 0.5s ease;
    transition-delay: 0;
    opacity: 1;
    z-index: 10;
  }
}

.hooper {
  margin: 2em 0;
  height: 80vh;
}

.hooper-navigation button {
  background: #fff;
  margin: 0 -5em;
  transition: 0.5s ease all;

  .visible & {
    margin: 0;
    transition-delay: 1s;
  }
}

.actions {
  text-align: center;
  opacity: 0;
  transition: 1s ease all;

  .visible & {
    opacity: 1;
    transition-delay: 1s;
  }
}

.close {
  color: #111;
  display: inline-block;
  padding: 0.7em 1em;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
  border-radius: 100px;
  z-index: 11;
  margin: 0 auto;
  text-decoration: none;
  overflow: hidden;

  &:hover {
    //background: $color-primary;
    color: #fff;
  }

  &:before {
    // Background
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #fafafa;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
  }

  &:after {
    content: "";
    display: block;
    width: 110%;
    height: 110%;
    background: var(--color-primary);
    position: absolute;
    left: 0;
    top: -200%;
    transform: skew(0, -15deg);
    //transform: rotate(-10deg);
    transition: all 0.3s ease;

    z-index: -1;
  }

  &:hover {
    &:after {
      transform: skew(0);
      top: 0%;
      left: 0;
    }
  }
}
</style>

<script>
import { Hooper, Slide, Navigation } from "hooper";
import "hooper/dist/hooper.css";
import Focus from "~/components/Focus.vue";

export default {
  props: {
    photos: Object,
    start: {
      default: 0,
      type: Number,
    },
  },
  data() {
    return {
      index: this.start,
      preload: 1, // number of photo preload before and after the current one
      sliderOptions: {
        wheelControl: false,
        transition: 300,
        //infiniteScroll: true,
        // initialSlide: this.start,
      },
    };
  },
  computed: {
    photosSlider: function () {
      //console.log("photosSlider");
      //console.log(this.photos.edges.slice(this.index - 1, this.index + 2));
      return this.photos.edges.slice(this.index - 1, this.index + 2);
    },
  },
  components: {
    Hooper,
    Slide,
    Focus,
    Navigation,
  },

  methods: {
    onMove: function (event) {
      if (1 == event.currentSlide) return;
      console.log(this.$refs.carousel);
      this.$refs.carousel.transition = 0;
      this.index += event.currentSlide - 1;
      this.$refs.carousel.slideTo(1);
      this.$refs.carousel.transition = 300;
      // if (process.isClient) {
      //   history.pushState(
      //     {},
      //     this.photos.edges[this.index].node.title,
      //     this.photos.edges[this.index].node.path
      //   );
      // }
    },
  },
};
</script>