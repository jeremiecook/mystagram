<template>
  <Layout>
    <div class="container">
      <gallery :photos="$page.photos" />
    </div>
    <footer>
      <div class="container">
        Ces photos sont soumises à une licence
        <a href="https://creativecommons.org/licenses/by/4.0/deed.fr">
          Creative Commons BY
        </a>
      </div>
    </footer>
  </Layout>
</template>

<page-query>
query Photo {
   photos: allPhoto (sort:[{by: "date", order: DESC }, {by: "order", order: DESC}]) {
    edges {
      node {
        id
        title
        thumbnail: src (width: 350, height: 350, quality: 90, fit: cover)
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
    title: "Photos",
  },
  components: {
    Gallery,
  },
  methods: {},
};
</script>

<style>
</style>
