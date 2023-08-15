<template>
    <div class="favorite">
        <header class="favorite__header"> Favorites</header>

        <div class="favorite__table">
            <custom-table
                :tableData="favoritesPeople"
                :columns="columns"
            >
            <template #data:buttons="{ item }">
                <custom-button
                  @click="removePerson(item)"
                  type="remove"
                >
                  Удалить
                </custom-button>
            </template>

            </custom-table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { CustomTable, CustomButton } from '../components'
import { PeopleListBriefWithId } from '@/types'
import { useStore } from 'vuex'
import { REMOVE_FAVORITE_PERSON } from '@/store/mutations'

const store = useStore()

const favoritesPeople = computed(() => store.state.common.favoritesPeople)

const columns = [
  {
    key: 'name',
    label: 'Имя'
  },
  {
    key: 'height',
    label: 'Высота'
  },
  {
    key: 'mass',
    label: 'Вес'
  },
  {
    key: 'hair_color',
    label: 'Цвет волос'
  },
  {
    key: 'buttons',
    label: 'Удалить из избранных'
  }
]

const removePerson = (person: PeopleListBriefWithId): void => {
  store.commit(REMOVE_FAVORITE_PERSON, person)
}
</script>

<style lang="scss" scoped>
.favorite {
    margin-top: 32px;
    margin-left: 32px;

    &__header {
        font-size: 32px;
        color: #828282;
        margin-bottom: 24px;
    }

    &__table {
        max-width: 1000px;

        &-buttons {
          display: flex;
          justify-content: space-around;
        }
    }
    .add-button {
      margin-right: 16px
    }
}
</style>
