<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Short your url</b-navbar-brand>
      </b-navbar>
    </div>

    <img id="logo" src="./assets/logo.png">
    <br>
    <h4>
      <b-badge style="margin: 12px;">Short your URLS for free!</b-badge>
    </h4>
    <router-view v-show="show"/>
    <br>
    <Footer/>
    <loading :show="show" :label="label" :overlay="overlay"></loading>
  </div>
</template>

<script>
import Footer from "./components/Footer";
import router from "./router/index.js";
import { shortRef } from "./database/firebase";
import loading from "vue-full-loading";

export default {
  name: "App",
  data() {
    return {
      show: false,
      label: "Loading...",
      timeOut: 2000,
      overlay: true
    };
  },
  components: { Footer, loading },
  methods: {
    showMe() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, this.timeOut);
    }
  },
  mounted() {
    getUrl(window.location.hash);
  }
};
function getUrl(url) {
  var code = new String(url).split("/")[new String(url).split("/").length - 1];
  try {
    if (new String(code).length == 5) {
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
.navbar {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.badge-secondary {
  color: #fff;
  background-color: #3b9aff;
}
</style>
