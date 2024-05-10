<script lang="ts" setup>
import { reactive, computed, ref } from 'vue';

import { Appearance } from '@Shared/types';

import { CustomSection, useUpdater } from '../../composable/useUpdater';
import { useAppearance } from '../../composable/useAppearance';

import SectionBuilder from './SectionBuilder.vue';
import UiButton from '../ui/UiButton.vue';

const { appearance } = useAppearance();
const sex = computed(() => appearance.value.sex);

const sectionIndex = ref(0);

const values = reactive<Partial<Appearance>>({
    headOverlays: appearance.value.headOverlays,
});

const { updateValueByProperty } = useUpdater(values);

const withColor = {
    4: { name: 'Makeup', max: 74 },
    5: { name: 'Blusher', max: 32 },
    8: { name: 'Lipstick', max: 9 },
};

const sections: Array<Array<CustomSection>> = [
    [
        {
            name: 'Blemishes',
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 0, name: 'value' },
        },
        {
            name: 'Visibility',
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 0, name: 'opacity' },
        },
    ],
    [
        {
            name: 'Aging',
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 3, name: 'value' },
        },
        {
            name: 'Visibility',
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 3, name: 'opacity' },
        },
    ],
    [
        {
            name: 'Damage',
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 6, name: 'value' },
        },
        {
            name: 'Visibility',
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 6, name: 'opacity' },
        },
    ],
    [
        {
            name: 'Sun Damage',
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 7, name: 'value' },
        },
        {
            name: 'Visibility',
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 7, name: 'opacity' },
        },
    ],
    [
        {
            name: 'Freckles',
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 9, name: 'value' },
        },
        {
            name: 'Visibility',
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 9, name: 'opacity' },
        },
    ],
    [
        {
            name: 'Lipstick',
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 8, name: 'value' },
        },
        {
            name: 'Visibility',
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 8, name: 'opacity' },
        },
        {
            name: 'Color',
            property: 'headOverlays',
            isColor: true,
            propertyInfo: { id: 8, name: 'color1' },
        },
    ],
    [
        {
            name: 'Makeup',
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 4, name: 'value' },
        },
        {
            name: 'Visibility',
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 4, name: 'opacity' },
        },
        {
            name: 'Color',
            property: 'headOverlays',
            isColor: true,
            propertyInfo: { id: 4, name: 'color1' },
        },
    ],
    [
        {
            name: 'Blusher',
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 5, name: 'value' },
        },
        {
            name: 'Visibility',
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 5, name: 'opacity' },
        },
        {
            name: 'Color',
            property: 'headOverlays',
            isColor: true,
            propertyInfo: { id: 5, name: 'color1' },
        },
    ],
];

const SectionNames = ['Blemish', 'Aging', 'Damage', 'Sun Damage', 'Freckles', 'Lipstick', 'Makeup', 'Blusher'];

function handleUpdate(type: 'increment' | 'decrement', section: CustomSection) {
    if (section.propertyInfo.name.includes('color')) {
        return;
    }

    updateValueByProperty(type, section);
}
</script>

<template>
    <div class="flex w-full max-w-[328px] flex-col gap-3">
        <div class="grid grid-cols-2 flex-wrap gap-3">
            <UiButton
                v-for="(sectionName, index) in SectionNames"
                height="h-10"
                @click="sectionIndex = index"
                :selected="sectionIndex == index"
                class="flex w-full"
            >
                {{ sectionName }}
            </UiButton>
        </div>
        <SectionBuilder
            v-for="(section, index) in sections[sectionIndex]"
            :key="index"
            :section="section"
            v-model="values"
            @update-value="handleUpdate"
        />
    </div>
</template>
