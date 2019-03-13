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
    <router-view/>
    <br>
    <Footer/>
  </div>
</template>

<script>
import Footer from "./components/Footer";
import router from "./router/index.js";
import { shortRef } from "./database/firebase";

export default {
  name: "App",
  components: { Footer },
  mounted() {
    getUrl(window.location.hash);
  }
};
function getUrl(url) {
  var param = url;
  if (verifyParam(param)) {
    searchUrl(param);
  } else {
    router.push({ path: "/" });
  }
}
function verifyParam(param) {
  if (param.lenght == 5) {
    return true;
  } else {
    return false;
  }
}

function searchUrl(param) {
  console.log(param);
  var origin = shortRef.equalTo(param).on("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(data) {
      console.log(data.key);
    });
  });
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
  background-color: #4d88e4d1;
}
</style>
