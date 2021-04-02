// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const exifr = require("exifr");

module.exports = function(api) {
  api.loadSource(async ({ addCollection, getCollection }) => {
    const exif = addCollection("EXIF");
    exif.addReference("photo", "Photo");
    const photos = getCollection("Photo").data();

    await Promise.all(
      photos.map(async (photo) => {
        const exifs = await exifr.parse(photo.src);
        //console.log(photo.src);
        //console.log(exifs);
        exif.addNode({
          ...exifs,
          id: photo.id,
          photo: photo.id,
        });
      })
    );
  });

  // api.onCreateNode(async (options) => {
  //   // if (options.internal.typeName !== "Photo") {
  //   //   return null;
  //   // }
  //   // // modify the options directly
  //   // options.model = await exifr.parse(
  //   //   "/content/2015/Indonesie/mount-bromo-1.jpg"
  //   // );
  //   //options.title = "Hello";
  //   //return { ...options };
  // });
};

//import exifr from "exifr";
// if (process.isServer) {
//   console.log("hello");
//   exifr
//     .parse("/content/photos/2017/Cap-Vert/DSCF2684.jpg")
//     .then((output) => console.log("Camera:", output.Make, output.Model));
// }
