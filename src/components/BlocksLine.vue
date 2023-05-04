<template>
  <div class="blocks-line" :class="{'blocks-line_short': isShort}">
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
    <router-link v-if="link" class="blocks-line__link-bottom" :to="link">Смотреть все</router-link>
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
    isShort: {
      type: Boolean,
      default: false
    },
    items: Array
  },
  setup(props) {
    const maxItemsCount = 11;

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

  &_short {

    .blocks-line__block {
      &:nth-child(11) {
        display: none;
      }

      &:nth-child(10) {
        display: none;
      }
    }
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

  &__link-bottom {
    display: none;
    color: $color-text-light;
    font-size: 13px;
  }

  &__blocks {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin: 0 -7px;
  }

  &__block {
    padding: 15px 7px;
  }

}

@media screen and (max-width: 2420px) {
  .blocks-line {
    &__block {
      &:nth-child(11) {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 2360px) {
  .blocks-line {
    &_short {
      .blocks-line__block {
        &:nth-child(9) {
          display: none;
        }
      }
    }
  }
}

@media screen and (max-width: 2230px) {
  .blocks-line {
    &__block {
      &:nth-child(10) {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 2150px) {
  .blocks-line {
    &_short {
      .blocks-line__block {
        &:nth-child(8) {
          display: none;
        }
      }
    }
  }
}

@media screen and (max-width: 2040px) {
  .blocks-line {
    &__block {
      &:nth-child(9) {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 1960px) {
  .blocks-line {
    &_short {
      .blocks-line__block {
        &:nth-child(7) {
          display: none;
        }
      }
    }
  }
}

@media screen and (max-width: 1850px) {
  .blocks-line {
    &__block {
      &:nth-child(8) {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 1770px) {
  .blocks-line {
    &_short {
      .blocks-line__block {
        &:nth-child(6) {
          display: none;
        }
      }
    }
  }
}

@media screen and (max-width: 1650px) {
  .blocks-line {
    &__block {
      &:nth-child(7) {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 1570px) {
  .blocks-line {
    &_short {
      .blocks-line__block {
        &:nth-child(5) {
          display: none;
        }
      }
    }
  }
}

@media screen and (max-width: 1280px) {
  .blocks-line {
    &_short {
      .blocks-line__block {
        &:nth-child(5) {
          display: block;
        }
      }
    }
  }
}

@media screen and (max-width: 1230px) {
  .blocks-line {
    &__block {
      &:nth-child(6) {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 1070px) {
  .blocks-line {

    &_short {
      .blocks-line__block {
        &:nth-child(5) {
          display: none;
        }
      }
    }

    &__block {
      &:nth-child(5) {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 870px) {
  .blocks-line {
    &__block {
      &:nth-child(4) {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 770px) {
  .blocks-line {
    &__block {
      &:nth-child(4) {
        display: block;
      }
    }
  }
}

@media screen and (max-width: 670px) {
  .blocks-line {
    &__block {
      &:nth-child(4) {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 560px) {
  .blocks-line {

    &__title {
      font-size: 16px;
    }

    &__link {
      display: none;
    }

    &__link-bottom {
      display: block;
    }

    &__blocks {
      display: block;
      margin: 0;
      padding-top: 10px;
    }

    &__block {
      padding: 0;
      margin-bottom: 15px;

      &:nth-child(4) {
        display: block;
      }

      &:nth-child(5) {
        display: block;
      }
    }
  }
}
</style>
