<template>
  <div id="formUrl">
    <b-form>
      <label class="sr-only" for="inlineFormInputUrl">Url</label>
      <b-input
        class="mb-2 mr-sm-2 mb-sm-0"
        id="inlineFormInputUrl"
        placeholder="http://www.google.com"
      />
      <br/>
      <b-button variant="primary">Short It !</b-button>
    </b-form>
  </div>
</template>

<script>
export default {};
</script>


<style>
#formUrl {
  display: inline-block;
}
#inlineFormInputUrl{
    width: 450px;
}
</style>
