// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import Vue from "vue";

import "normalize.css";
import "~/assets/style/styles.scss";

import DefaultLayout from "~/layouts/Default.vue";

import moment from "moment";
moment.updateLocale("fr", {});

export default function(Vue, { Events }) {
  // Event bus
  Vue.prototype.Events = new Vue();

  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);

  Vue.filter("date", function(value) {
    return moment(value).format("MMMM YYYY");
  });
}
