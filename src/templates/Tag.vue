<template>
  <Layout>
    <div class="container">
      <h1>
        Catégorie : <strong>{{ $page.tag.title }}</strong>
      </h1>
      <posts-list :posts="$page.posts" />
    </div>
  </Layout>
</template>

<page-query>

query($id: ID!) {

  tag: tag (id: $id) {
    id
    title
  }

  posts: allPost( filter: { tags: { contains: [$id]},  draft: { eq : false }}, sortBy: "date", order: DESC ) {
    edges {
      node {
        title
        excerpt
        cover
        date
        path
        tags {
          id
          title
          path
        }        
      }
    }
  }
}
</page-query>

<style lang="scss" scoped>
h1 {
  font-weight: 300;
  font-size: 1.6rem;
  border-bottom: 1px dotted #999;
  padding-bottom: 0.5em;
  margin-bottom: 1em;

  strong {
    font-weight: 600;
    color: var(--color-primary);
  }
}
</style>

<script>
import PostsList from "~/components/PostsList.vue";

export default {
  metaInfo: {
    title: "Log",
  },
  components: {
    PostsList,
  },
};
</script>