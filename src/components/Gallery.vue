<template>
  <div class="gallery">
    <a
      href="#"
      v-for="photo in photos.edges"
      :key="photo.node.id"
      @click="onClick($event, photo)"
    >
      <figure>
        <div class="parallax">
          <g-image :src="photo.node.thumbnail" alt="" />
        </div>
        <figcaption>
          <div class="informations">
            <div class="location">{{ photo.node.title }}</div>
            <div class="date">{{ photo.node.date | date }}</div>
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
figure {
  position: relative;
  overflow: hidden;
  margin: 0;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
    background: #f2f2f2 url("/images/loading.svg") no-repeat center;
  }

  &:hover {
    figcaption {
      transition: 1s ease all;
      opacity: 1;
    }

    img {
      transition: 4s linear all;
      transform: scale(1);
    }
  }
}

figcaption {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(24, 50, 125, 0.5);
  transition: 0.8s ease all;
  opacity: 0;

  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  .informations {
  }

  .location {
    font-weight: bold;
    font-size: 1.1em;
    letter-spacing: 0.1em;
    line-height: 1.8;
  }

  .date {
    letter-spacing: 0.1em;
    font-size: 0.9em;
  }

  .exif {
    display: none;
  }
}

img {
  width: 100%;
  display: block;
  //display: none;
  transition: 0.2s ease all;
  transform: translateZ(-2px) scale(1.25);
  //filter: blur(0);
  position: absolute;
  width: 100%;
  height: 100%;
}

.parallax {
  position: absolute;
  width: 100%;
  height: 100%;
  will-change: transform;
}
</style>

<script>
export default {
  props: ["photos"],
  // created() {
  //   var $this = this;
  //   window.addEventListener("scroll", function () {
  //     $this.parallax();
  //   });
  // },
  methods: {
    onClick: function (event, photo) {
      event.preventDefault();
      this.Events.$emit("showPhoto", photo.node.id);
    },

    // inViewport: function (bounds) {
    //   return (
    //     bounds.bottom >= 0 &&
    //     bounds.top <=
    //       (window.innerHeight || document.documentElement.clientHeight)
    //   );
    // },
    // parallax: function () {
    //   var maxShift = 40;
    //   var $this = this;

    //   document
    //     .querySelectorAll(".gallery .parallax")
    //     .forEach(function (image, index) {
    //       var bounds = image.getBoundingClientRect();

    //       // Visible images only
    //       if (!$this.inViewport(bounds)) return;

    //       //console.log(bounds.top);
    //       //console.log(document.documentElement.clientHeight);
    //       var height = bounds.bottom - bounds.top;
    //       var positionRatio =
    //         bounds.top /
    //         ((window.innerHeight || document.documentElement.clientHeight) +
    //           height * 2);
    //       var shift = positionRatio * (maxShift * 2) - maxShift;
    //       image.style.top = -shift + "px";
    //     });
    // },
  },
};
</script>