<template>
  <Layout>
    <div :class="{ ready: ready }">
      <focus :photo="$page.photo" />
      <div class="actions">
        <a class="close" href="/">Toutes les photos</a>
      </div>
    </div>
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

.actions {
  text-align: center;
  opacity: 0;
  transition: 1s ease all;

  .ready & {
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
import Focus from "~/components/Focus.vue";
import Layout from "~/layouts/Fullscreen.vue";
export default {
  metaInfo: {
    //title: "Log",
  },
  data() {
    return {
      ready: false,
    };
  },
  onImgLoad() {
    console.log("Loaded!");
    this.ready = true;
  },
  mounted() {
    document.body.classList.add("fullscreen");
  },
  destroyed() {
    document.body.classList.remove("fullscreen");
  },

  components: { Focus, Layout },
};
</script>