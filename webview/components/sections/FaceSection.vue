<script lang="ts" setup>
import { reactive, computed } from 'vue';

import { Appearance } from '@Shared/types';

import { useUpdater } from '../../composable/useUpdater';
import { useAppearance } from '../../composable/useAppearance';

import FeminineIcon from '../icons/FeminineIcon.vue';
import MasculineIcon from '../icons/MasculineIcon.vue';

import UiButton from '../ui/UiButton.vue';
import SectionBuilder from './SectionBuilder.vue';

import { useTranslate } from '@Shared/translate';

type CustomSection = { name: string; property: keyof Appearance; min: number; max: number; increment: number };

const { t } = useTranslate('en');
const { appearance, setField } = useAppearance();
const sex = computed(() => appearance.value.sex);

let values = reactive<Partial<Appearance>>({
    faceFather: appearance.value.faceFather,
    faceMother: appearance.value.faceMother,
    skinFather: appearance.value.skinFather,
    skinMother: appearance.value.skinMother,
    faceMix: appearance.value.faceMix,
    skinMix: appearance.value.skinMix,
    eyes: appearance.value.eyes,
});

const { updateValue } = useUpdater(values);

const sections: Array<CustomSection> = [
    { name: t('character.creator.face.father'), property: 'faceFather', min: 0, max: 45, increment: 1 },
    { name: t('character.creator.face.mother'), property: 'faceMother', min: 0, max: 45, increment: 1 },
    { name: t('character.creator.skin.father'), property: 'skinFather', min: 0, max: 45, increment: 1 },
    { name: t('character.creator.skin.mother'), property: 'skinMother', min: 0, max: 45, increment: 1 },
    { name: t('character.creator.face.mix'), property: 'faceMix', min: 0, max: 1, increment: 0.1 },
    { name: t('character.creator.skin.mix'), property: 'skinMix', min: 0, max: 1, increment: 0.1 },
    { name: t('character.creator.eyes'), property: 'eyes', min: 0, max: 31, increment: 1 },
];
</script>

<template>
    <div class="flex w-full max-w-[328px] flex-col gap-3">
        <span class="font-cap font-semibold uppercase">{{ t('character.creator.body.type') }}</span>
        <!-- Model Selection -->
        <UiButton height="h-10" @click="setField('sex', 0)" :selected="sex == 0">
            <FeminineIcon class="mt-[2px] text-3xl" />
        </UiButton>
        <UiButton height="h-10" @click="setField('sex', 1)" :selected="sex == 1">
            <MasculineIcon class="mt-[2px] text-3xl" />
        </UiButton>

        <!-- Face Appearance -->
        <SectionBuilder
            v-for="(section, index) in sections"
            :key="index"
            v-model="values"
            :section="section"
            @update-value="updateValue"
        />
    </div>
</template>
