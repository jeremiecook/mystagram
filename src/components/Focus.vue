<template>
  <div class="focus">
    <figure>
      <div>
        <g-image :src="photo.node.src" width="500" height="500" />
      </div>
      <figcaption>
        <div class="informations">
          <div class="location">{{ photo.node.title }}</div>
          <div class="date">{{ photo.node.date | date }}</div>
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
$breakpoint: 600px;

.focus {
  position: relative;
  //background: blue;
  //border: 1px solid Red;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  // To fix drag on images
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
}

figure {
  display: flex;
  position: relative;
  box-shadow: 0 2px 4px rgba(#000, 0.1);

  // &:after {
  //   content: "";
  //   display: block;
  //   position: absolute;
  //   left: 2%;
  //   right: 2%;
  //   bottom: 0;
  //   height: 2em;
  //   box-shadow: 0 2px 5px rgba(#000, 0.4);
  //   z-index: -1;
  // }

  @media (max-width: $breakpoint) {
    flex-direction: column;
  }
}

img {
  width: auto;
  max-width: 100%;
  max-height: 80vh;
}

figcaption {
  background: #fff;
  width: 200px;
  letter-spacing: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: $breakpoint) {
    width: 100%;
  }
}

.informations {
  margin: 1em;
}

.location {
  font-weight: bold;
  font-size: 1.1em;
  line-height: 1.5;
  font-weight: 700;
}

.exif {
  margin-top: 2em;

  ul {
    padding: 0;
  }
  strong {
    font-weight: 600;
    display: inline-block;
    width: 6em;
  }

  font-size: 0.8em;
  line-height: 1.5;
  //font-weight: bold;
  //color: rgba(#4865D9, .8);

  .model {
    font-size: 1.1em;
    font-weight: 600;
  }

  .lens {
    margin-bottom: 0.4em;
    font-style: italic;
    font-weight: 400;
  }

  li {
    list-style: none;
    font-size: 0.8rem;
  }
}

.date {
  font-size: 0.9em;
}
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
  },
};
</script>