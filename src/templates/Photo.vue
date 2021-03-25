<template>
  <Layout>
    <slider :photos="$page.photos" :start="start" />

    <div class="container">
      <gallery :photos="$page.photos" />
    </div>
  </Layout>
</template>

<page-query>
query($path: String) {
   photo: photo(path: $path) {
    id
   }
   
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
    title: "Log",
  },
  computed: {
    start: function () {
      return this.$page.photos.edges.findIndex(
        (photo) => photo.node.id == this.$page.photo.id
      );
    },
  },
  components: {
    Gallery,
    Slider,
  },
};
</script>