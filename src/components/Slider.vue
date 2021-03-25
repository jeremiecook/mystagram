<template>
  <splide
    :options="sliderOptions"
    @splide:move="onMove"
    @splide:moved="onMoved"
  >
    <splide-slide v-for="photo in $page.photos.edges">
      <slide :photo="photo" @splide:start="start" />
    </splide-slide>
  </splide>
</template>

<style lang="scss" scoped>
</style>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Slide from "~/components/Slide.vue";

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
      sliderOptions: {
        focus: "center",
        perPage: 2,
        fixedWidth: "80%",
        gap: "5%",
        pagination: false,
        type: "loop",
        lazyLoad: "nearby",
        start: this.start,
      },
    };
  },
  components: {
    Splide,
    SplideSlide,
    Slide,
  },
  methods: {
    onMove: function (splide, nextIndex) {
      history.pushState(
        {},
        this.photos.edges[nextIndex].node.title,
        this.photos.edges[nextIndex].node.path
      );
    },
  },
};
</script>