<template>
  <div class="logo">
    <g-link class="title" to="/">
      <span aria-hidden="true" v-for="letter in letters">{{ letter }}</span>
    </g-link>
  </div>
</template>

<style lang="scss" scoped>
$height: 3px;

.logo {
  span {
    display: inline-block;
    animation-duration: 2.5s;
    transform: tranlateY(0);

    //animation-iteration-count: infinite;
    //animation-direction: alternate;
  }

  &:hover {
    @for $i from 1 through 20 {
      span:nth-child(#{$i}) {
        animation-name: wave;
        animation-delay: (1s + 45ms * $i);
      }
    }
  }
}

@keyframes wave {
  5% {
    transform: translateY(-$height);
  }
  15% {
    transform: translateY($height/2);
  }
  20% {
    transform: translateY(0);
  }
  to {
    transform: translateY(0);
  }
}
</style>

<script>
export default {
  props: ["text"],
  computed: {
    // Replace spaces by &nbsp; chars and split the text
    letters: function () {
      return this.text ? this.text.replace(/ /g, "\u00a0").split("") : "";
    },
  },
};
</script>