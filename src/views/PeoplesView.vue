<template>
    <div class="people">
        <header class="people__header">People</header>

        <div class="people__table">
            <custom-table
                :tableData="peoples"
                :columns="columns"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getPeople } from '../api/people'
import { ref } from 'vue'
import { CustomTable } from '../components'

const peoples = ref<any>([])

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
    label: 'Добавить/Удалить из избранных'
  }
]

const getPeoples = async (): Promise<void> => {
  const result = await getPeople()

  peoples.value = result.results.map((el: any) => {
    return {
      name: el.name,
      height: el.height,
      hair_color: el.hair_color,
      mass: el.mass
    }
  })
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
        width: 800px;
    }
}
</style>
