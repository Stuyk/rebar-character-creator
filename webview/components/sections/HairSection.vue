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
import { useTranslate } from '@Shared/translate';

const { t } = useTranslate('en');

const { appearance } = useAppearance();
const tabIndex = ref<number>(0);
const sex = computed(() => appearance.value.sex);

let values = reactive<Partial<Appearance>>({
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
            name: t('character.creator.hair'),
            property: 'hair',
            min: 0,
            max: appearance.value.sex == 1 ? 76 : 80,
            increment: 1,
        },
        {
            name: t('character.creator.hair.color'),
            property: 'hairColor1',
            isColor: true,
        },
        {
            name: t('character.creator.hair.highlight'),
            property: 'hairColor2',
            isColor: true,
        },
    ],
    [
        {
            name: t('character.creator.eyebrows'),
            property: 'eyebrows',
            min: 0,
            max: 34,
            increment: 1,
        },
        {
            name: t('character.creator.visibility'),
            property: 'eyebrowsOpacity',
            min: 0,
            max: 1,
            increment: 0.1,
        },
        {
            name: t('character.creator.eyebrows.color'),
            property: 'eyebrowsColor1',
            isColor: true,
        },
    ],
    [
        {
            name: t('character.creator.facial.hair'),
            property: 'facialHair',
            min: 0,
            max: 28,
            increment: 1,
        },
        {
            name: t('character.creator.visibility'),
            property: 'facialHairOpacity',
            min: 0,
            max: 1,
            increment: 0.1,
        },
        {
            name: t('character.creator.facial.color'),
            property: 'facialHairColor1',
            isColor: true,
        },
    ],
];
</script>

<template>
    <div class="flex w-full max-w-[328px] flex-col gap-3">
        <span class="font-semibold uppercase">{{ t('character.creator.category') }}</span>
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
