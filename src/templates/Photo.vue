<template>
  <Layout>
    <focus :photo="$page.photo" />
  </Layout>
</template>

<page-query>
query($path: String) {
   photo: photo(path: $path) {
    id
    src (width: 1000)
    title
    date (format: "YYYY-MM-DD")
   }
   
   photos: allPhoto (sort:[{by: "date", order: DESC }, {by: "order", order: DESC}]) {
    edges {
      node {
        id
        title
        thumbnail: src (width: 500, height: 500, fit: cover)
        date (format: "YYYY-MM-DD")
        path
      }
    }
  }
}
</page-query>

<style lang="scss">
.focus {
  width: 100%;
  img {
    width: 100%;
  }
}
</style>

<script>
import Focus from "~/components/Focus.vue";
export default {
  metaInfo: {
    //title: "Log",
  },
  computed: {
    start: function () {
      return this.$page.photos.edges.findIndex(
        (photo) => photo.node.id == this.$page.photo.id
      );
    },
  },
  components: { Focus },
};
</script>