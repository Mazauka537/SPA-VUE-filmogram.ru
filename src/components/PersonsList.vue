<template>
  <template v-for="person in persons">
    <span class="person">
      {{ person.name ?? person.enName }}
      <img :src="person.photo" alt="photo">
    </span>
    <br>
  </template>
</template>

<script>
export default {
  props: {
    persons: Array
  }
}
</script>

<style scoped lang="scss">

.person {
  position: relative;
  cursor: default;

  &:hover {
    text-decoration: underline;

    img {
      display: inline;
    }
  }

  img {
    position: absolute;
    display: none;
    height: 180px;
    left: 50%;
    top: 0;
    transform: translate(-50%, -100%);
  }
}

</style>
