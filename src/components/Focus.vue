<template>
  <div class="focus">
    <figure>
      <img :src="photo.src.src" @load="ready" />

      <figcaption>
        <div class="informations">
          <div class="location">{{ photo.title }}</div>
          <div class="date">{{ photo.date | date }}</div>
        </div>
        <!--
        <div class="exif">
          <ul>
            <li class="model">model make</li>
            <li class="lens">LensModel</li>
            <li><strong>Focale</strong>focale mm</li>
            <li><strong>Vitesse</strong> exposuretime s</li>
            <li><strong>Ouverture</strong> f/ fnumber</li>
            <li><strong>ISO</strong> ISOSpeedRatings</li>
          </ul>
        </div>
        -->
      </figcaption>
    </figure>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
// import exifr from "exifr";
// console.log("hello");
// exifr
//   .parse(
//     "/assets/static/content/photos/2017/Cap-Vert/DSCF2684.jpg?width=500&height=500&fit=cover&key=1a26919"
//   )
//   .then((output) => console.log("Camera:", output.Make, output.Model));

export default {
  props: ["photo"],
  computed: {
    info: function () {},
    visible: function () {},
  },
  methods: {
    ready() {
      console.log("loaded");
      document.body.classList.add("ready");
    },
  },
  mounted() {
    document.body.classList.remove("ready");
  },
};
</script>