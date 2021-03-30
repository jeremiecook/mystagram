<template>
  <div class="layout">
    <slot />
  </div>
</template>

<script>
export default {};
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
