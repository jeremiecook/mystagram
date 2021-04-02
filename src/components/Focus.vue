<template>
  <div class="focus">
    <figure>
      <img :src="photo.src.src" @load="ready" />

      <figcaption>
        <div class="informations">
          <div class="location">{{ photo.title }}</div>
          <div class="date">{{ photo.date | date }}</div>
        </div>

        <div class="exif">
          <ul>
            <li class="model" v-if="photo.belongsTo.edges[0].node.Make">
              {{ photo.belongsTo.edges[0].node.Make }}
              {{ photo.belongsTo.edges[0].node.Model }}
            </li>
            <li class="lens" v-if="photo.belongsTo.edges[0].node.LensModel">
              {{ photo.belongsTo.edges[0].node.LensModel }}
            </li>
            <li v-if="photo.belongsTo.edges[0].node.FocalLength">
              <strong>Focale</strong
              >{{ photo.belongsTo.edges[0].node.FocalLength }}mm
            </li>
            <li v-if="photo.belongsTo.edges[0].node.ExposureTime">
              <strong>Vitesse</strong>1/{{
                1 / photo.belongsTo.edges[0].node.ExposureTime
              }}s
            </li>
            <li v-if="photo.belongsTo.edges[0].node.FNumber">
              <strong>Ouverture</strong> f/{{
                photo.belongsTo.edges[0].node.FNumber
              }}
            </li>
            <li v-if="photo.belongsTo.edges[0].node.ISO">
              <strong>ISO</strong>{{ photo.belongsTo.edges[0].node.ISO }}
            </li>
          </ul>
        </div>
      </figcaption>
    </figure>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
export default {
  props: ["photo"],
  computed: {
    info: function () {},
    visible: function () {},
  },
  methods: {
    ready() {
      console.log(this.photo);
      document.body.classList.add("ready");
    },
  },
  mounted() {
    document.body.classList.remove("ready");
  },
};
</script>