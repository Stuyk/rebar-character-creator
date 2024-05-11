<script lang="ts" setup>
import { reactive } from 'vue';

import { Appearance } from '@Shared/types';

import { useAppearance } from '../../composable/useAppearance';
import { CustomSection, useUpdater } from '../../composable/useUpdater';

import SectionBuilder from './SectionBuilder.vue';
import { useTranslate } from '@Shared/translate';

const { t } = useTranslate('en');
const { appearance } = useAppearance();

let values = reactive<Partial<Appearance>>({
    structure: appearance.value.structure,
});

const { updateValueByIndex } = useUpdater(values);

const StructureNames = [
    'character.creator.nose.width',
    'character.creator.nose.height',
    'character.creator.nose.length',
    'character.creator.nose.profile',
    'character.creator.nose.tip',
    'character.creator.nose.broke',
    'character.creator.brow.height',
    'character.creator.brow.depth',
    'character.creator.cheek.height',
    'character.creator.cheek.depth',
    'character.creator.cheek.puffed',
    'character.creator.eyes.size',
    'character.creator.lips.size',
    'character.creator.jaw.width',
    'character.creator.jaw.rounded',
    'character.creator.chin.height',
    'character.creator.chin.depth',
    'character.creator.chin.pointed',
    'character.creator.chin.dimple',
    'character.creator.neck.size',
];

const sections: Array<CustomSection> = StructureNames.map((x) => {
    return { name: t(x), property: 'structure', increment: 0.1, min: -1.0, max: 1.0, isIndexed: true };
});
</script>

<template>
    <div class="flex w-full flex-col gap-3">
        <SectionBuilder
            v-for="(section, index) in sections"
            v-model="values"
            :key="index"
            :section="section"
            :index="index"
            @update-value="(type, section) => updateValueByIndex(type, section, index)"
        />
    </div>
</template>
