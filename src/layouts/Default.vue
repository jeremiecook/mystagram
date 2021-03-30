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
    <transition name="fade">
      <slot />
    </transition>
    <footer>
      <div class="container">
        Ces photos sont soumises à une licence
        <a href="https://creativecommons.org/licenses/by/4.0/deed.fr">
          Creative Commons BY
        </a>
      </div>
    </footer>
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
