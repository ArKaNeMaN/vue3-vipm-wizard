<script setup lang="ts">
import NavRow from "./components/Navigation/NavRow.vue";
import NavRowItem from "./components/Navigation/NavRowItem.vue";
</script>

<template>
    <div class="w-full min-h-full">
        <div id="app-header" class="container m-auto h-48 flex items-center">
            <h1 class="text-7xl font-extralight sm:text-left text-center w-full">VipM Wizard</h1>
        </div>
        <div id="app-navbar" class="bg-neutral-100 sm:h-16">
            <nav class="container m-auto sm:flex">
                <nav-row class="sm:flex-grow">
                    <a class="p-2 h-16 sm:inline-block hidden flex-shrink-0" href="https://githib.com/arkaneman" target="_blank">
                        <img src="/a-logo.jpg" alt="a-logo" class="rounded-md h-full"/>
                    </a>
                    <nav-row-item href="/">Home</nav-row-item>
                    <nav-row-item href="/exts">Extensions</nav-row-item>
                    <nav-row-item a
                        target="_blank"
                        href="https://github.com/ArKaNeMaN/amxx-VipModular-pub"
                    >VipM Repository</nav-row-item>
                    <nav-row-item a
                        target="_blank"
                        href="https://github.com/ArKaNeMaN/vue3-vipm-wizard"
                    >Wizard Repository</nav-row-item>
                    <nav-row-item
                        target="_blank"
                        href="#"
                    >Guide</nav-row-item>
                </nav-row>
            </nav>
        </div>
        <div id="app-body" class="container m-auto">
            <div class="py-4 px-4">
                <router-view/>
            </div>
        </div>
    </div>
</template>
