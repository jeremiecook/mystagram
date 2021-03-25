<template>
  <div class="gallery">
    <a href="#" v-for="photo in photos.edges">
      <figure>
        <g-image :src="photo.node.src" alt="" />
        <figcaption>
          <div class="informations">
            <div class="location">{{ photo.node.title }}</div>
            <div class="date">{{ photo.node.date }}</div>
          </div>
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
        </figcaption>
      </figure>
    </a>
  </div>
</template>

<style lang="scss">
</style>

<script>
export default {
  props: ["photos"],
};
</script>