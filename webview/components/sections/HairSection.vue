<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';

import { Appearance } from '@Shared/types';

import { useAppearance } from '../../composable/useAppearance';
import { CustomSection, useUpdater } from '../../composable/useUpdater';

import HairIcon from '../icons/HairIcon.vue';
import EyebrowIcon from '../icons/EyebrowIcon.vue';
import FacialHairIcon from '../icons/FacialHairIcon.vue';

import UiIconButton from '../ui/UiIconButton.vue';
import SectionBuilder from './SectionBuilder.vue';

const { appearance } = useAppearance();
const tabIndex = ref<number>(0);
const sex = computed(() => appearance.value.sex);

const values = reactive<Partial<Appearance>>({
    hair: appearance.value.hair,
    hairColor1: appearance.value.hairColor1,
    hairColor2: appearance.value.hairColor2,
    eyebrows: appearance.value.eyebrows,
    eyebrowsColor1: appearance.value.eyebrowsColor1,
    eyebrowsOpacity: appearance.value.eyebrowsOpacity,
    facialHair: appearance.value.facialHair,
    facialHairColor1: appearance.value.facialHairColor1,
    facialHairOpacity: appearance.value.facialHairOpacity,
});

const { updateValue } = useUpdater(values);

const sections: Array<Array<CustomSection>> = [
    [
        {
            name: 'Hair',
            property: 'hair',
            min: 0,
            max: 45,
            increment: 1,
        },
        {
            name: 'Hair Color',
            property: 'hairColor1',
            isColor: true,
        },
        {
            name: 'Hair Highlight',
            property: 'hairColor2',
            isColor: true,
        },
    ],
    [
        {
            name: 'Eyebrows',
            property: 'eyebrows',
            min: 0,
            max: 34,
            increment: 1,
        },
        {
            name: 'Eyebrow Visibility',
            property: 'eyebrowsOpacity',
            min: 0,
            max: 1,
            increment: 0.1,
        },
        {
            name: 'Eyebrow Color',
            property: 'eyebrowsColor1',
            isColor: true,
        },
    ],
    [
        {
            name: 'Facial Hair',
            property: 'facialHair',
            min: 0,
            max: 28,
            increment: 1,
        },
        {
            name: 'Facial Hair Visibility',
            property: 'facialHairOpacity',
            min: 0,
            max: 1,
            increment: 0.1,
        },
        {
            name: 'Facial Hair Color',
            property: 'facialHairColor1',
            isColor: true,
        },
    ],
];
</script>

<template>
    <div class="flex w-full flex-col gap-3">
        <span class="font-semibold uppercase">Category</span>
        <div class="flex flex-row gap-3">
            <UiIconButton size="size-10" @click="tabIndex = 0" :selected="tabIndex == 0">
                <HairIcon class="text-2xl" />
            </UiIconButton>
            <UiIconButton size="size-10" @click="tabIndex = 1" :selected="tabIndex == 1">
                <EyebrowIcon class="text-2xl" />
            </UiIconButton>
            <UiIconButton size="size-10" @click="tabIndex = 2" :selected="tabIndex == 2" v-if="sex == 1">
                <FacialHairIcon class="text-2xl" />
            </UiIconButton>
        </div>
        <SectionBuilder
            v-for="(section, index) in sections[tabIndex]"
            :key="index"
            v-model="values"
            :section="section"
            @update-value="updateValue"
        />
    </div>
</template>
