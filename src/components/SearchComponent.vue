<template>
    <div class="search">
        <input
            v-model="inputValue"
            @focus="onFocus"
            @blur="onBlur"
            class="search__input"
        />

        <div
          v-if="isFocused && searchPeoples.length"
          class="search__list"
        >
            <div
                v-for="person in searchPeoples"
                :key="person.name"
            >
                <router-link
                    class="search__link"
                    router-link :to="{ name: 'people-page', params: { id: getIdByUrl(person.url)}}"
                >
                    <div
                        class="search__list-item"
                    >
                        {{ person.name }}
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getPeople } from '@/api/people'
import { People } from '@/shared/types'
import { ref, computed, watch } from 'vue'
import { getIdByUrl } from '../shared/utils/getIdByUrl'

interface Props {
    modelValue?: string
}

interface Emit {
    (e:'update:modelValue', value?: string): void
}

// eslint-disable-next-line no-undef
const props = defineProps<Props>()
// eslint-disable-next-line no-undef
const emit = defineEmits<Emit>()

const searchPeoples = ref<People[]>([])

const isFocused = ref<boolean>(false)

const inputValue = computed({
  get () {
    return props.modelValue
  },

  set (value) {
    emit('update:modelValue', value)
  }
})

const getSeachedPeople = async (text?: string) => {
  const result = await getPeople(text)

  searchPeoples.value = result.results
}

const onFocus = () => {
  isFocused.value = true
}

const onBlur = () => {
  isFocused.value = false
}

watch(
  () => inputValue.value,
  () => {
    if (inputValue.value) {
      getSeachedPeople(inputValue.value)
    }
  }
)
</script>

<style lang="scss" scoped>
.search {
    position: relative;

    &__input {
        color: #333333;
        border: 1px solid rgb(235, 235, 235);
        border-radius: 10px;
        padding: 8px 6px;
    }

    &__list {
        position: absolute;
        width: 350px;
        max-height: 800px;
        top: 56px;
        z-index: 2;
        padding: 8px;
        border: 1px solid rgb(235, 235, 235);
        border-radius: 5px;
        background-color: #ffffff;

        &-item {
            margin: 12px 0px;
            padding: 12px;
            border-radius: 5px;
            cursor: pointer;

            &:hover {
                background-color: #F7F7F7;
            }
        }
    }
        &__link {
            color: #333333;
            text-decoration: none;
        }
}
</style>
