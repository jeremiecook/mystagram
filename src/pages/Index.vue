<template>
  <Layout>
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
        date (format: "YYYY-MM-DD")
        path
      }
    }
  }
}
</page-query>

<script>
import Gallery from "~/components/Gallery.vue";

export default {
  metaInfo: {
    //title: "Mystagram",
  },
  components: {
    Gallery,
  },
  methods: {},
};
</script>

<style>
</style>
