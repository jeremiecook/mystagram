<template>
  <Layout>
    <slider :photos="$page.photos" />

    <div class="container">
      <gallery :photos="$page.photos" />
    </div>
  </Layout>
</template>

<page-query>
query Photo {
   photos: allPhoto (sort:[{by: "date", order: DESC }, {by: "order", order: DESC}]) {
    edges {
      node {
        id
        title
        thumbnail: src (width: 500, height: 500, fit: cover)
        src (width: 1000)
        date (format: "YYYY-MM-DD")
        path
      }
    }
  }
}
</page-query>

<script>
import Gallery from "~/components/Gallery.vue";
import Slider from "~/components/Slider.vue";

export default {
  metaInfo: {
    title: "Mystagram",
  },
  components: {
    Gallery,
    Slider,
  },
  methods: {},
};
</script>

<style>
</style>
