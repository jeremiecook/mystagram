<template>
  <ClientOnly>
    <div class="slider" :class="show">
      <splide ref="focus" :options="sliderOptions" @splide:move="onMove">
        <splide-slide v-for="photo in $page.photos.edges" :key="photo.node.id">
          <slide :photo="photo" />
        </splide-slide>
      </splide>

      <div class="actions">
        <a class="close" v-on:click="close" href="#">Toutes les photos</a>
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="scss">
.slider {
  opacity: 0;
  transition: all 1s ease;
  z-index: -1;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #222;

  &.visible {
    opacity: 1;
    z-index: 10;
  }
}

.splide {
  margin: 2em 0;
}

.splide__list {
  height: 80vh;
}

.actions {
  text-align: center;
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
    background: #efefef;
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
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Slide from "~/components/Slide.vue";

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
        focus: "center",
        perPage: 2,
        fixedWidth: "90%",
        gap: "5%",
        pagination: false,
        type: "loop",
        lazyLoad: "nearby",
        start: this.start,
      },
    };
  },
  components: {
    // Splide: () =>
    //   import("@splidejs/vue-splide")
    //     .then((m) => m.Slide)
    //     .catch(),

    // SplideSlide: () =>
    //   import("@splidejs/vue-splide")
    //     .then((m) => m.SplideSlide)
    //     .catch(),
    Splide,
    SplideSlide,
    Slide,
  },
  computed: {
    show: function () {
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
    onMove: function (splide, nextIndex) {
      history.pushState(
        {},
        this.photos.edges[nextIndex].node.title,
        this.photos.edges[nextIndex].node.path
      );
    },
    go: function (index) {
      this.visible = true;
      this.$refs.focus.splide.options.speed = 1;
      this.$refs.focus.splide.go(index, false);
      this.$refs.focus.splide.options.speed = 400;
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