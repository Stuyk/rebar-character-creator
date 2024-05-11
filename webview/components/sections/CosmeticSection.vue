<script lang="ts" setup>
import { reactive, computed, ref } from 'vue';

import { Appearance } from '@Shared/types';

import { CustomSection, useUpdater } from '../../composable/useUpdater';
import { useAppearance } from '../../composable/useAppearance';
import { useTranslate } from '@Shared/translate';

import SectionBuilder from './SectionBuilder.vue';
import UiButton from '../ui/UiButton.vue';

const { appearance } = useAppearance();
const { t } = useTranslate('en');

const sectionIndex = ref(0);

let values = reactive<Partial<Appearance>>({
    headOverlays: appearance.value.headOverlays,
});

const { updateValueByProperty } = useUpdater(values);

const sections: Array<Array<CustomSection>> = [
    [
        {
            name: t('character.creator.blemishes'),
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 0, name: 'value' },
        },
        {
            name: t('character.creator.visibility'),
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 0, name: 'opacity' },
        },
    ],
    [
        {
            name: t('character.creator.aging'),
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 3, name: 'value' },
        },
        {
            name: t('character.creator.visibility'),
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 3, name: 'opacity' },
        },
    ],
    [
        {
            name: t('character.creator.damage'),
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 6, name: 'value' },
        },
        {
            name: t('character.creator.visibility'),
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 6, name: 'opacity' },
        },
    ],
    [
        {
            name: t('character.creator.sun.damage'),
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 7, name: 'value' },
        },
        {
            name: t('character.creator.visibility'),
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 7, name: 'opacity' },
        },
    ],
    [
        {
            name: t('character.creator.freckles'),
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 9, name: 'value' },
        },
        {
            name: t('character.creator.visibility'),
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 9, name: 'opacity' },
        },
    ],
    [
        {
            name: t('character.creator.lipstick'),
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 8, name: 'value' },
        },
        {
            name: t('character.creator.visibility'),
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 8, name: 'opacity' },
        },
        {
            name: t('character.creator.color'),
            property: 'headOverlays',
            isColor: true,
            propertyInfo: { id: 8, name: 'color1' },
        },
    ],
    [
        {
            name: t('character.creator.makeup'),
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 4, name: 'value' },
        },
        {
            name: t('character.creator.visibility'),
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 4, name: 'opacity' },
        },
        {
            name: t('character.creator.color'),
            property: 'headOverlays',
            isColor: true,
            propertyInfo: { id: 4, name: 'color1' },
        },
    ],
    [
        {
            name: t('character.creator.blusher'),
            property: 'headOverlays',
            min: 0,
            max: 23,
            increment: 1,
            propertyInfo: { id: 5, name: 'value' },
        },
        {
            name: t('character.creator.visibility'),
            property: 'headOverlays',
            min: 0,
            max: 1,
            increment: 0.1,
            propertyInfo: { id: 5, name: 'opacity' },
        },
        {
            name: t('character.creator.color'),
            property: 'headOverlays',
            isColor: true,
            propertyInfo: { id: 5, name: 'color1' },
        },
    ],
];

const SectionNames = [
    t('character.creator.blemish'),
    t('character.creator.aging'),
    t('character.creator.damage'),
    t('character.creator.sun.damage'),
    t('character.creator.freckles'),
    t('character.creator.lipstick'),
    t('character.creator.makeup'),
    t('character.creator.blusher'),
];

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
