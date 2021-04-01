<template>
  <div class="layout">
    <header>
      <div class="container">
        <logo :text="$static.metadata.siteName"></logo>
        <nav class="nav">
          <ul class="menu">
            <li><g-link class="nav__link" to="/about/">A propos</g-link></li>
          </ul>
        </nav>
      </div>
    </header>
    <slot />
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
export default {
  components: {
    Logo,
  },
};
</script>


<static-query>
query {
	metadata {
		siteName
	}
}
</static-query>

<style lang="scss">
</style>
