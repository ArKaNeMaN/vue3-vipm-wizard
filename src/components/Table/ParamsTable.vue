<script setup lang="ts">
import TableSimpleHeader from "./TableSimpleHeader.vue";
import TableLayout from "./TableLayout.vue";
import TableTextRow from "./TableTextRow.vue";
import {ParamsList} from "../../vipm/types.ts";

const props = defineProps<{
    params: ParamsList,
}>();
</script>

<template>
    <table-layout>
        <table-simple-header :ths="['Name', 'Type', 'Required', 'Default']"/>
        <tbody>
        <tr v-for="param in params" :key="param.name">
            <td>{{ param.name }}</td>
            <td>{{ param.type }}</td>
            <td>{{ param.required ? 'Yes' : 'No' }}</td>
            <td>{{ param.default ?? '-' }}</td>
        </tr>
        <table-text-row class="font-semibold">Total: {{ params.length }}</table-text-row>
        </tbody>
    </table-layout>
</template>
