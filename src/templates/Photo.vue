<template>
  <Layout>
    <div :class="{ ready: ready }">
      <focus :photo="$page.photo" />
      <div class="navigation">
        <g-link :to="previous" class="previous"
          ><img src="/images/previous.svg" alt="Photo précédente"
        /></g-link>
        <g-link :to="next" class="next"
          ><img src="/images/next.svg" alt="Photo suivante"
        /></g-link>
      </div>
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
        path
      }
    }
  }
}
</page-query>

<style lang="scss">
.actions {
  text-align: center;
  opacity: 0;
  transition: 1s ease all;

  .ready & {
    opacity: 1;
    transition-delay: 1s;
  }
}

.navigation {
  a {
    position: absolute;
    display: block;
    top: calc(50vh - 2em);
    background: #fff;
    text-align: center;
    text-decoration: none;
    color: #000;
    font-size: 1.2em;
    transition: all 0.4s ease;
    transition-delay: 1s;
    box-shadow: 1px 1px 3px rgba(#000, 0.2);

    img {
      display: block;
      width: 0.8em;
      margin: 1.2em;
    }

    &.previous {
      left: -5em;
      .ready & {
        left: 0;
      }
    }

    &.next {
      right: -5em;
      .ready & {
        right: 0;
      }
    }
  }
}

.close {
  color: #111;
  display: inline-block;
  padding: 0.9em 1.2em;
  font-size: 0.8rem;
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
  metaInfo() {
    return {
      title: this.$page.photo.title,
    };
  },
  data() {
    return {
      ready: false,
    };
  },
  computed: {
    index: function () {
      return this.getIndex(this.$page.photo.id);
    },
    previous: function () {
      return this.$page.photos.edges[this.index - 1]
        ? this.$page.photos.edges[this.index - 1].node.path
        : this.$page.photos.edges[this.$page.photos.edges.length - 1].node.path;
    },
    next: function () {
      return this.$page.photos.edges[this.index + 1]
        ? this.$page.photos.edges[this.index + 1].node.path
        : this.$page.photos.edges[0].node.path;
    },
  },

  methods: {
    getIndex: function (id) {
      return this.$page.photos.edges.findIndex((photo) => photo.node.id == id);
    },
  },
  onImgLoad() {
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