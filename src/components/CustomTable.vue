<template>
    <div class="table">
        <table>
            <thead class="table__thead mb-s">
                <tr class="table__tr">
                    <th
                        v-for="item in columns"
                        :key="item.id"
                        :style="{ 'width': item.width }"
                        class="table__th"
                    >
                        {{ item.label }}
                    </th>
                </tr>
            </thead>

            <tbody
                v-if="tableData.length"
                class="table__body"
            >
                <tr
                    v-for="item in tableData"
                    :key="item.id"
                    class="table__tr"
                >
                    <td
                        v-for="column in columns"
                        :key="column.key"
                        class="table__td"
                        :style="{ 'width': column.width }"
                    >
                        <div
                            class="table__body-item"
                        >
                            {{ item[column.key] }}
                        </div>
                    </td>
                </tr>
            </tbody>

            <tbody
                v-else
                class="table__body"
            >
                Нет данных
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>

interface Props {
    columns: any,
    tableData: any
}

// eslint-disable-next-line no-undef
defineProps<Props>()

</script>

<style lang="scss" scoped>
.table {
    color: #333333;
    width: 100%;
    vertical-align: middle;
    text-align: left;
    border-collapse: collapse;
    table-layout: fixed;

    &__body-item {
        padding: 16px 24px;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
    }

    &__th {
        color: #828282;
        font-size: inherit;
        line-height: inherit;
        font-weight: inherit;
        padding: 16px 24px;
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

    &__tr {
        display: block;
    }
}
</style>
