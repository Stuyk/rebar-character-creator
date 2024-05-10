<script lang="ts" setup>
import { reactive, computed } from 'vue';

import { Appearance } from '@Shared/types';

import { useUpdater } from '../../composable/useUpdater';
import { useAppearance } from '../../composable/useAppearance';

import FeminineIcon from '../icons/FeminineIcon.vue';
import MasculineIcon from '../icons/MasculineIcon.vue';

import UiButton from '../ui/UiButton.vue';
import SectionBuilder from './SectionBuilder.vue';

type CustomSection = { name: string; property: keyof Appearance; min: number; max: number; increment: number };

const { appearance, setField } = useAppearance();
const sex = computed(() => appearance.value.sex);

const values = reactive<Partial<Appearance>>({
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
    { name: 'Face Father', property: 'faceFather', min: 0, max: 45, increment: 1 },
    { name: 'Face Mother', property: 'faceMother', min: 0, max: 45, increment: 1 },
    { name: 'Skin Father', property: 'skinFather', min: 0, max: 45, increment: 1 },
    { name: 'Skin Mother', property: 'skinMother', min: 0, max: 45, increment: 1 },
    { name: 'Face Mix', property: 'faceMix', min: 0, max: 1, increment: 0.1 },
    { name: 'Skin Mix', property: 'skinMix', min: 0, max: 1, increment: 0.1 },
    { name: 'Eyes', property: 'eyes', min: 0, max: 31, increment: 1 },
];
</script>

<template>
    <div class="flex w-full max-w-[328px] flex-col gap-3">
        <span class="font-cap font-semibold uppercase">Body Type</span>
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
