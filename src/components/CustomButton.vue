<template>
    <button
        :class="[
            `custom-button custom-button__${type}`
        ]"
        @click="onClick"
        :disabled="disabled"
    >

        <slot />
    </button>
</template>

<script lang="ts" setup>

interface Props {
    type?: string,
    disabled?: boolean
}

interface Emits {
    (e: 'click', value: unknown): void
}

// eslint-disable-next-line no-undef
withDefaults(defineProps<Props>(), {
  type: 'add',
  disabled: false
})

// eslint-disable-next-line no-undef
const emit = defineEmits<Emits>()

const onClick = (el: unknown) => {
  emit('click', el)
}

</script>

<style lang="scss" scoped>
.custom-button {
    position: relative;
    cursor: pointer;
    white-space: pre;
    padding: 8px 16px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;

    &:disabled {
        opacity: 0.5;
        cursor:not-allowed;
    }

    &__add {
        background-color: #47A76A;
        color: #FFFFFF;
        border: 1px solid #47A76A;

        &:hover {
            background-color: #209E4E;
            border: 1px solid #209E4E;
        }
    }

    &__remove {
        background-color: #FFFFFF;
        color: #47A76A;
        border: 1px solid #DADADA;

        &:hover {
            color: #209E4E;
            background-color: #F7F7F7;
            border: 1px solid #F7F7F7;
        }

    }
}
</style>
