<script lang="ts" setup>
import { ref } from 'vue';

import FaceIcon from './components/icons/FaceIcon.vue';
import HairIcon from './components/icons/HairIcon.vue';
import NoseIcon from './components/icons/NoseIcon.vue';
import FinishIcon from './components/icons/FinishIcon.vue';
import CosmeticIcon from './components/icons/CosmeticIcon.vue';

import FaceSection from './components/sections/FaceSection.vue';
import HairSection from './components/sections/HairSection.vue';
import FinishSection from './components/sections/FinishSection.vue';
import CosmeticSection from './components/sections/CosmeticSection.vue';
import StructureSection from './components/sections/StructureSection.vue';

import UiIconButton from './components/ui/UiIconButton.vue';

import '../translate/index';

const tabIndex = ref<number>(0);
const tabButtons = [FaceIcon, HairIcon, NoseIcon, CosmeticIcon, FinishIcon];
const tabs = [FaceSection, HairSection, StructureSection, CosmeticSection, FinishSection];
const isProcessing = ref(false);

function handleProcessing() {
    isProcessing.value = true;
}
</script>

<template>
    <div class="flex h-screen w-screen overflow-hidden text-white">
        <div class="flex flex-col gap-3 p-3">
            <!-- Tabs Section -->
            <div
                class="left-6 top-6 flex h-20 flex-row gap-3 rounded-lg bg-neutral-950 bg-opacity-70 p-3 shadow-lg"
                v-if="!isProcessing"
            >
                <UiIconButton
                    v-for="(tab, index) in tabButtons"
                    @click="tabIndex = index"
                    :selected="tabIndex == index"
                    :key="index"
                    size="size-14"
                >
                    <component :is="tab" class="mt-1 text-3xl" />
                </UiIconButton>
            </div>
            <!-- Tab Section -->
            <div
                class="flex max-h-full flex-col gap-3 overflow-y-auto rounded-lg bg-neutral-950 bg-opacity-70 p-3 pb-4 shadow-lg"
            >
                <component :is="tabs[tabIndex]" @on-processing="handleProcessing" />
            </div>
        </div>
    </div>
</template>
