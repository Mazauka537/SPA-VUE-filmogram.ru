<template>
  <div class="my-select" @click="dropDownList">
    <div class="my-select__title">{{ title }}</div>
    <div ref="arrow" class="my-select__arrow">
      <svg width="100%" height="100%" viewBox="0 0 768 768">
        <path d="M274.5 531l147-147-147-147 45-45 192 192-192 192z"></path>
      </svg>
    </div>
    <input class="my-select__input" type="hidden" :value="modelValue">
    <div ref="list" class="my-select__list-wrapper">
      <ul class="my-select__list">
        <li class="my-select__item" v-for="item in items" @click="select(item.value)">{{ item.text }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: []
    },
    defaultText: String,
    modelValue: Number
  },
  computed: {
    title() {
      const item = this.items.find((item) => item.value === this.modelValue)
      return item ? item.text : this.defaultText
    }
  },
  methods: {
    select (value) {
      this.$emit('update:modelValue', value)
    },
    dropDownList () {
      const openedListClass = 'my-select__list-wrapper_opened'
      const openedArrowClass = 'my-select__arrow_opened'
      if (this.$refs.list.classList.contains(openedListClass)) {
        this.$refs.list.classList.remove(openedListClass)
        this.$refs.arrow.classList.remove(openedArrowClass)
      } else {
        this.$refs.list.classList.add(openedListClass)
        this.$refs.arrow.classList.add(openedArrowClass)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.my-select {
  position: relative;

  &__arrow {
    position: absolute;
    right: 5px;
    top: 5px;
    height: 30px;
    width: 30px;
    transform: rotate(90deg);
    transition: all 0.2s;

    &_opened {
      transform: rotate(-90deg);
    }

    svg {
      fill: $color-text;
    }
  }

  &__title {
    height: 40px;
    cursor: pointer;
    border: $border-main;
    padding: 8px 60px 8px 20px;
    text-align: left;
  }

  &__input {

  }

  &__list-wrapper {
    width: 100%;
    height: 0;
    overflow-y: hidden;
    transition: all 0.2s ease-in-out;

    &_opened {
      height: 200px;
    }
  }

  &__list {
    overflow-y: auto;
    height: 100%;
    text-align: left;
  }

  &__item {
    padding: 10px 20px;
    background: $color-bg;
    cursor: pointer;

    &:hover {
      background: $color-bg-hover;
    }
  }
}

</style>
