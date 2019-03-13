<template>
  <v-footer  id ="footer" height="auto" color="primary lighten-1">
    <v-layout justify-center row wrap>
      <v-btn v-for="link in links" :key="link" color="white" flat round>{{ link }}</v-btn>
      <v-flex primary lighten-2 py-3 text-xs-center white--text xs12>&copy;2019 —
        <strong>Short IT</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    links: ['Created by GH']
  })
};
</script>
<style>
#footer{
  margin-top: 22%;
}
.white--text {
  color: #125b7f !important;
  caret-color: #81c6ea !important;
}
</style>
