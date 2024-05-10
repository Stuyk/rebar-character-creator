<script lang="ts" setup>
import { reactive } from 'vue';

import { Appearance } from '@Shared/types';
import { StructureNames } from '@Shared/data/structureNames';

import { useAppearance } from '../../composable/useAppearance';
import { CustomSection, useUpdater } from '../../composable/useUpdater';

import SectionBuilder from './SectionBuilder.vue';

const { appearance } = useAppearance();

const values = reactive<Partial<Appearance>>({
    structure: appearance.value.structure,
});

const { updateValueByIndex } = useUpdater(values);

const sections: Array<CustomSection> = StructureNames.map((x) => {
    return { name: x, property: 'structure', increment: 0.1, min: -1.0, max: 1.0, isIndexed: true };
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
