<template>
  <div class="blocks-line">
    <div class="blocks-line__header">
      <span class="blocks-line__title">{{ title }}</span>
      <router-link v-if="link" class="blocks-line__link" :to="link">Показать все</router-link>
    </div>
    <div class="blocks-line__blocks">
      <div class="blocks-line__block"
           v-for="item in items.slice(0, maxItemsCount)"
           :key="item.id">
        <UserBlock v-if="isUsers" :user="item"/>
        <CollectionBlock v-else :collection="item"/>
      </div>
      <div class="blocks-line__block"
           v-for="i in missingBlocksCount"
           :key="i">
        <EmptyBlock/>
      </div>
    </div>
  </div>
</template>

<script>
import UserBlock from "@/components/UserBlock";
import CollectionBlock from "@/components/CollectionBlock";
import EmptyBlock from "@/components/EmptyBlock";
import {computed} from "vue";

export default {
  components: {EmptyBlock, CollectionBlock, UserBlock},
  props: {
    title: String,
    link: String,
    isUsers: {
      type: Boolean,
      default: true
    },
    items: Array
  },
  setup(props) {
    const maxItemsCount = 9;

    const missingBlocksCount = computed(() => {
      let count = maxItemsCount - (props.items.slice(0, maxItemsCount).length % maxItemsCount)
      return count === maxItemsCount ? 0 : count
    })

    return {
      missingBlocksCount,
      maxItemsCount
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/styles/vars";

.blocks-line {
  padding-right: 18px;

  &__header {

  }

  &__title {
    font-size: 22px;
    color: $color-text-light;
    font-weight: 700;
    letter-spacing: 0.8px;
  }

  &__link {
    float: right;
    text-transform: uppercase;
    font-weight: 700;
  }

  &__blocks {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin: 0 -7px;
  }

  &__block {
    padding: 15px 7px;

    &:nth-child(11) {
      display: none;
    }

    &:nth-child(10) {
      display: none;
    }
  }

}

@media screen and (max-width: 2420px) {
  .blocks-line {
    &__block {
      &:nth-child(9) {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 2230px) {
  .blocks-line {
    &__block {
      &:nth-child(8) {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 2040px) {
  .blocks-line {
    &__block {
      &:nth-child(7) {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 1850px) {
  .blocks-line {
    &__block {
      &:nth-child(6) {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 1650px) {
  .blocks-line {
    &__block {
      &:nth-child(5) {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 1460px) {
  .blocks-line {
    &__block {
      &:nth-child(4) {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 1260px) {
  .blocks-line {
    &__block {
      &:nth-child(3) {
        display: none;
      }
    }
  }
}
</style>
