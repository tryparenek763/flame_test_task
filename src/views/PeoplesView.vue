<template>
    <div class="people">
        <header class="people__header">Peoples</header>

        <div class="people__table">
            <custom-table
                :tableData="peoples"
                :columns="columns"
            >
            <template #data:buttons="{ item }">
                <custom-button
                  @click="addPerson(item)"
                  :disabled="isDisabledSaveButton(item)"
                  class="add-button"
                >
                  Добавить
                </custom-button>

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
import { getPeople } from '../api/people'
import { ref, computed } from 'vue'
import { CustomTable, CustomButton } from '../components'
import { PeopleList, PeopleListBriefWithId } from '@/types'
import { getIdByUrl } from '../shared/utils/getIdByUrl'
import { useStore } from 'vuex'
import { ADD_FAVORITE_PERSON, REMOVE_FAVORITE_PERSON } from '@/store/mutations'
import { GET_FAVORITES_PEOPLE } from '@/store/actions'

const store = useStore()

const peoples = ref<PeopleListBriefWithId[]>([])

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
    label: 'Добавить/Удалить в/из избранных'
  }
]

const isDisabledSaveButton = (person: PeopleListBriefWithId): boolean => {
  // console.log(favoritesPeople.value?.findIndex((el: PeopleListBriefWithId) => el.id === person.id))
  return false
}

const getPeoples = async (): Promise<void> => {
  const result = await getPeople()

  peoples.value = result.results.map((el: PeopleList) => {
    return {
      id: getIdByUrl(el.url),
      name: el.name,
      height: el.height,
      hair_color: el.hair_color,
      mass: el.mass
    }
  })
}

const removePerson = (person: PeopleListBriefWithId): void => {
  store.commit(REMOVE_FAVORITE_PERSON, person)
}

const addPerson = (person: PeopleListBriefWithId): void => {
  store.commit(ADD_FAVORITE_PERSON, person)
}

getPeoples()

</script>

<style lang="scss" scoped>
.people {
    margin-top: 32px;
    margin-left: 32px;

    &__header {
        font-size: 32px;
        color: #828282;
        margin-bottom: 24px;
    }

    &__table {
        max-width: 1300px;

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
