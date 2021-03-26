<template>
  <div class="slider" :class="isVisible">
    <hooper ref="carousel" :settings="sliderOptions" @afterSlide="onMove">
      <slide v-for="photo in $page.photos.edges" :key="photo.node.id">
        <focus :photo="photo" />
      </slide>
      <navigation slot="hooper-addons"></navigation>
    </hooper>

    <div class="actions">
      <a class="close" @click="close" href="#">Toutes les photos</a>
    </div>
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
      default: -1,
      type: Number,
    },
  },
  data() {
    return {
      visible: false,
      sliderOptions: {
        infiniteScroll: true,
        wheelControl: false,
        initialSlide: this.start,
        transition: 300,
      },
    };
  },
  components: {
    Hooper,
    Slide,
    Focus,
    Navigation,
  },
  computed: {
    isVisible: function () {
      return this.visible ? "visible" : "";
    },
  },
  mounted() {
    var $this = this;
    // If a photo is provided, show the slider
    if (this.start >= 0) {
      this.visible = true;
    }
    // Click on a thumbnail
    this.Events.$on("showPhoto", function (photo) {
      $this.go($this.getIndex(photo));
    });
  },
  methods: {
    onMove: function (event) {
      history.pushState(
        {},
        this.photos.edges[event.currentSlide].node.title,
        this.photos.edges[event.currentSlide].node.path
      );
    },
    go: function (index) {
      this.visible = true;
      this.$refs.carousel.slideTo(index);
    },
    // Get index in slider from a photo id
    getIndex: function (id) {
      return this.photos.edges.findIndex((photo) => photo.node.id == id);
    },
    close: function (e) {
      e.preventDefault();
      this.visible = false;
      history.pushState({}, "", "/");
    },
  },
};
</script>