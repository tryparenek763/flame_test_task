<template>
    <div class="person">
        <header class="person__header">Person</header>

        <hr>

        <div class="person__info">
            <h2 class="person__name">{{ personInfo?.name || '-' }}</h2>

            <div class="person__item">
                Рост:
                <span class="person__item-value">
                    {{ personInfo?.height || '-' }}
                </span>
            </div>
            <div class="person__item">
                Вес:
                <span class="person__item-value">
                    {{ personInfo?.mass || '-' }}
                </span>
            </div>
            <div
                v-if="personInfo?.hair_color !== 'none'"
                class="person__item"
            >
                Цвет волос:
                <span class="person__item-value">
                    {{ personInfo?.hair_color }}
                </span>
            </div>
            <div class="person__item">
                Цвет кожи:
                <span class="person__item-value">
                    {{ personInfo?.skin_color || '-' }}
                </span>
            </div>
            <div class="person__item">
                Цвет глаз:
                <span class="person__item-value">
                    {{ personInfo?.eye_color || '-' }}
                </span>
            </div>
            <div class="person__item">
                Год рождения:
                <span class="person__item-value">
                    {{ personInfo?.birth_year || '-' }}
                </span>
            </div>
            <div class="person__item">
                Пол:
                <span class="person__item-value">
                    {{ personInfo?.gender || '-' }}
                </span>
            </div>
            <div
                v-if="personInfo?.homeworld"
                class="person__item"
            >
                Родина:
                <span class="person__item-value">
                    <a :href="personInfo.homeworld">{{ personInfo.homeworld }}</a>
                </span>
            </div>
            <div
                v-if="personInfo?.films.length"
                class="person__list-item"
            >
                Список фильмов:
                <span
                    v-for="film, in personInfo.films"
                    :key="film"
                    class="person__item-value"
                >
                    <a :href="film">{{ film }}</a>
                </span>
            </div>
            <div
                v-if="personInfo?.species.length"
                class="person__list-item"
            >
                Вид:
                <span
                    v-for="item, in personInfo.species"
                    :key="item"
                    class="person__item-value"
                >
                    <a :href="item">{{ item }}</a>
                </span>
            </div>
            <div
                v-if="personInfo?.vehicles.length"
                class="person__list-item"
            >
                Транспорт:
                <span
                    v-for="vehicle, in personInfo.vehicles"
                    :key="vehicle"
                    class="person__item-value"
                >
                    <a :href="vehicle">{{ vehicle }}</a>
                </span>
            </div>
            <div
                v-if="personInfo?.starships.length"
                class="person__list-item"
            >
                Космические корабли:
                <span
                    v-for="starship, in personInfo.starships"
                    :key="starship"
                    class="person__item-value"
                >
                    <a :href="starship">{{ starship }}</a>
                </span>
            </div>
            <div
                v-if="personInfo?.created"
                class="person__item"
            >
                Создан:
                <span class="person__item-value">
                    {{ new Date(personInfo.created).toLocaleString('ru') }}
                </span>
            </div>
            <div
                v-if="personInfo?.edited"
                class="person__item"
            >
                Редактирован:
                <span class="person__item-value">
                    {{ new Date(personInfo.edited).toLocaleString('ru') }}
                </span>
            </div>
            <div class="person__item">
                Ссылка:
                <span class="person__item-value">
                    {{ personInfo?.url || '-' }}
                </span>
            </div>
        </div>

        <custom-button
            v-if="!isIncludePerson"
            @click="addPerson()"
        >
            Добавить
        </custom-button>
    </div>
</template>

<script lang="ts" setup>
import { getPersonById } from '@/api/people'
import { People } from '@/shared/types'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { CustomButton } from '@/components'
import { useStore } from 'vuex'
import { PeopleListBriefWithId } from '@/types'
import { ADD_FAVORITE_PERSON } from '@/store/mutations'

const route = useRoute()
const store = useStore()

const favoritesPeople = computed(() => store.state.common.favoritesPeople)

const personId = ref(route.params.id as string)

const isIncludePerson = computed<boolean>(() => !!favoritesPeople.value?.find((person: PeopleListBriefWithId) => person.id === personId.value))

const personInfo = ref<People | null>(null)

const getPersonInfo = async (): Promise<void> => {
  const result = await getPersonById(personId.value)

  personInfo.value = result
}

const addPerson = () => {
  const personBrief = {
    id: personId.value,
    name: personInfo.value?.name,
    height: personInfo.value?.height,
    hair_color: personInfo.value?.hair_color,
    mass: personInfo.value?.mass
  }

  store.commit(ADD_FAVORITE_PERSON, personBrief)
}

getPersonInfo()

</script>

<style lang="scss" scoped>
.person {
    margin-top: 32px;
    margin-left: 32px;
    font-size: 20px;

    &__info {
        width: 800px;
    }

    &__header {
        font-size: 32px;
        color: #828282;
        margin-bottom: 24px;
    }

    &__name {
        font-size: 28px;
        color: #333333;
    }

    &__list-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
        padding: 8px;
    }

    &__item {
        margin-bottom: 16px;
        padding: 8px;

        &-value {
            font-weight: 600;
            margin-left: 4px;
            color:#828282;
        }
    }
    a {
        color:#828282;
        text-decoration: none;
    }
}
</style>
