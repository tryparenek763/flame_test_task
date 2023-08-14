<template>
    <div class="custom-table__wrapper">
        <div class="custom-table__header-wrapper">
            <table class="custom-table">
                <thead class="custom-table__head">
                    <tr class="custom-table__row">
                        <th
                            v-for="item in columns"
                            :key="item.key"
                            class="custom-table__th custom-table__td"
                        >
                            <div
                                class="custom-table__head-item"
                            >
                                <div class="custom-table__head-item-content">
                                    <slot
                                        :name="`header:${item.key}`"
                                        :header="item"
                                    >
                                        {{ item.label }}
                                    </slot>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody v-if="!tableData || !tableData.length">
                    <tr>
                        <td
                            class="custom-table__empty-text weight_medium"
                            :colspan="columns.length"
                        >
                            <slot name="empty-text">
                                {{ emptyText }}
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <table
            class="custom-table"
        >
            <tbody
                class="custom-table__body"
            >
                <tr
                    v-for="(item, index) in tableData"
                    :key="item"
                    class="custom-table__row"
                >
                    <td
                        v-for="column in columns"
                        :key="column.key"
                        class="custom-table__td"
                    >
                        <div
                            class="custom-table__body-item"
                        >
                            <slot
                                :name="`data:${column.key}`"
                                :item="item"
                                :row-index="index"
                            >
                                {{ item[column.key] }}
                            </slot>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import { Columns } from '@/types'

interface Props {
    columns: Columns[],
    tableData: Array<any>,
    emptyText?: string
}

// eslint-disable-next-line no-undef
withDefaults(defineProps<Props>(), {
  emptyText: 'Нет данных'
})

</script>

<style lang="scss" scoped>
.custom-table {
    color: #333333;
    width: 100%;
    vertical-align: middle;
    text-align: left;
    border-collapse: collapse;
    table-layout: fixed;

    &__wrapper {
        display: flex;
        flex-direction: column;
        min-height: 1px;
        flex-grow: 1;
        border: 1px solid #EDEDED;
        border-radius: 16px;
    }

    &__head {
        &-item {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            &-content {
                white-space: pre-wrap;
            }
        }
    }

    &__header-wrapper {
        margin-bottom: 12px;
    }

    &__th {
        color: #828282;
        font-size: inherit;
        line-height: inherit;
        font-weight: inherit;
        padding: 12px 9px;
        background: #F7F7F7;

        &:first-child {
            border-top-left-radius: 16px;
            border-bottom-left-radius: 16px;
            padding-left: 18px;
        }

        &:last-child {
            border-top-right-radius: 16px;
            border-bottom-right-radius: 16px;
        }
    }

    &__td {
        font-size: inherit;
        line-height: inherit;
        font-weight: inherit;
        padding: 16px 9px;
        transition: background-color 160ms ease;

        &:first-child {
            border-top-left-radius: 16px;
            border-bottom-left-radius: 16px;
            padding-left: 18px;
        }

        &:last-child {
            border-top-right-radius: 16px;
            border-bottom-right-radius: 16px;
        }
    }

    &__body {

        &-item {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
        }
    }

    &__empty-text {
        text-align: center;
        color: #828282;
        height: 200px;
        font-size: 16px;
        line-height: 24px;
    }
}
</style>
