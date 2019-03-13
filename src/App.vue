<template>
  <div id="app">
    <div>
      <loading
        :active.sync="isLoading"
        :is-full-page="fullPage"
        :height="height"
        :width="width"
        :color="color"
        :loader="loader"
        :background-color="bgColor"
      ></loading>
      <b-navbar id="navbar" toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Short your url</b-navbar-brand>
      </b-navbar>
    </div>

    <img id="logo" src="./assets/logo.png">
    <br>
    <h4>
      <b-badge id="badge-secondary" style="margin: 12px;">Short your URLS for free!</b-badge>
    </h4>
    <router-view v-show="!isLoading"/>
    <br>
    <Footer/>
  </div>
</template>

<script>
import Footer from "./components/Footer";
import router from "./router/index.js";
import { shortRef } from "./database/firebase";
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "App",
  data() {
    return {
      isLoading: false,
      fullPage: false,
      loader: "bars",
      color: "#007bff",
      bgColor: "#ffffff",
      height: 38,
      width: 38
    };
  },
  components: { Footer, Loading },
  methods: {},
  mounted() {
    getUrl(this, window.location.hash);
  }
};
function getUrl(app, url) {
  var code = new String(url).split("/")[new String(url).split("/").length - 1];
  try {
    if (new String(code).length == 5) {
      app.isLoading = true;
      searchForCode(code);
    } else {
      if (new String(code).length != 0) {
        console.log("Redirect to index...");
        router.push("/");
      }
    }
  } catch (error) {
    console.log(error);
  }
}
function searchForCode(code) {
  console.log("Search Code: " + code);
  var origin = shortRef.orderByChild("short").on("value", function(snapshot) {
    snapshot.forEach(element => {
      element.forEach(srt => {
        if (srt.val().newUrl == code) {
          console.log("FIND! " + srt.val().newUrl);
          console.log("Old >" + srt.val().oldUrl);
          window.location.href = srt.val().oldUrl;
        }
      });
    });
  });
  router.push("/");
  console.log("Url not found !");
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#logo {
  margin-top: 60px;
}
#navbar {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#badge-secondary {
  color: #2b7d97;
  background-color: #3b9aff00;
}
</style>
