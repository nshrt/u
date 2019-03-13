<template>
  <div id="formUrl">
    <b-form>
      <label class="sr-only" for="inlineFormInputUrl">Url</label>
      <b-input
        v-show="!linkShow"
        class="mb-2 mr-sm-2 mb-sm-0"
        id="inlineFormInputUrl"
        placeholder="https://nshrt.github.io/short/"
        v-model="oldUrl"
      />
      <b-alert
        @dismiss-count-down="5"
        style="margin:3px; padding:6px;"
        :show="erro"
        variant="danger"
      >
        <strong>Invalid URL.</strong>
      </b-alert>

      <b-input hidden="true"/>
      <br>
      <b-button v-show="!linkShow" @click="addUrl" size="lg" variant="primary">Short It !</b-button>
      <br>

      <b-alert dismissible variant="success" @dismiss-count-down="5">
        <strong>Sucess !</strong> Click on link to copy..
      </b-alert>

      <b-alert style="margin:15px;" v-show="linkShow" variant="primary" show>
        <a id="urlText" href="newUrl" @click.stop.prevent="copyUrl" class="alert-link">{{newUrl }}</a>
      </b-alert>

      <b-tooltip show target="urlText" placement="top">
        <strong>Click to copy</strong>
      </b-tooltip>
      <input type="hidden" id="copyUrlInput" v-model="newUrl">
    </b-form>
  </div>
</template>

<script>
import { shortRef } from "../database/firebase";
import Footer from "./Footer";

function uuidv4() {
  return "xxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default {
  data() {
    return {
      oldUrl: "",
      newUrl: "https://" + window.location.hostname + "/#/" + uuidv4(),
      linkShow: false,
      erro: false,
      short: {}
    };
  },
  methods: {
    addUrl() {
      try {
        if (validURL(this.oldUrl)) {
          shortRef
            .push({
              short: { oldUrl: this.oldUrl, newUrl: this.newUrl }
            })
            .then(_ => {
              this.linkShow = true;
              this.erro = false;
              this.oldUrl = "";
            });
        } else {
          this.erro = true;
          this.oldUrl = "";
          console.log("Invalid URL!");
        }
      } catch (err) {
        alert(err);
      }
    },
    copyUrl() {
      let testingCodeToCopy = document.querySelector("#copyUrlInput");
      testingCodeToCopy.setAttribute("type", "text"); // 不是 hidden 才能複製
      testingCodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        console.log("Testing code was copied " + msg);
      } catch (err) {
        console.log("Oops, unable to copy");
      }

      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    }
  },
  components: {
    Footer
  }
};
function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}
</script>


<style>
#formUrl {
  display: inline-block;
  min-width: 350px;
}
#inlineFormInputUrl {
  width: 450px;
}
.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #1e1e1e;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-primary {
  color: #ffffff;
  background-color: rgba(0, 123, 255, 0.76);
  border-color: #bdd5ef;
}
</style>
