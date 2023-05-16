<script setup lang="ts">
import TableSimpleHeader from "./TableSimpleHeader.vue";
import TableLayout from "./TableLayout.vue";
import TableTextRow from "./TableTextRow.vue";
import {ParamsList} from "../../vipm/types.ts";

defineProps<{
    params?: ParamsList,
}>();
</script>

<template>
    <table-layout>
        <table-simple-header :ths="['Name', 'Type', 'Required', 'Default']"/>
        <tbody v-if="params?.length">
        <tr v-for="param in params" :key="param.name">
            <td><span
                :class="`${param.desc ? 'underline decoration-dashed underline-offset-2 cursor-help' : ''}`"
                v-tippy="param.desc"
            >{{ param.name }}</span></td>
            <td>{{ param.type }}</td>
            <td>{{ param.required ? 'Yes' : 'No' }}</td>
            <td>{{ param.default ?? '-' }}</td>
        </tr>
        <table-text-row class="font-semibold">Total: {{ params.length }}</table-text-row>
        </tbody>
        <table-text-row v-else class="italic text-center">*Empty*</table-text-row>
    </table-layout>
</template>
