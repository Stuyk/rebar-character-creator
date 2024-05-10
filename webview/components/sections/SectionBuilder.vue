<script lang="ts" setup>
import { computed } from 'vue';

import { Appearance } from '@Shared/types';
import { HairColors } from '@Shared/data/hairColors';

import { CustomSection } from '../../composable/useUpdater';

import LeftIcon from '../icons/LeftIcon.vue';
import RightIcon from '../icons/RightIcon.vue';

import InputBox from './InputBox.vue';
import UiIconButton from '../ui/UiIconButton.vue';
import { MakeupColors } from '../../../../../main/shared/data/makeupColors';

const model = defineModel<Partial<Appearance>>();
const props = defineProps<{ section: CustomSection; index?: number }>();
const emits = defineEmits<(e: 'updateValue', key: 'increment' | 'decrement', section: CustomSection) => void>();

function getColorStyle(color: string) {
    return `background-color: ${color};`;
}

function updateColor(index: number) {
    const propName = String(props.section.property);

    if (props.section.isColor && !props.section.propertyInfo) {
        model.value[propName] = index;
        return;
    }

    if (!props.section.propertyInfo || !Array.isArray(model.value[propName])) {
        return;
    }

    const overlayIndex = model.value[propName].findIndex((x) => x.id == props.section.propertyInfo.id);
    if (overlayIndex <= -1) {
        return;
    }

    model.value[propName][overlayIndex][props.section.propertyInfo.name] = index;
}

function isColorSelected(index: number) {
    const propName = String(props.section.property);
    if (!props.section.propertyInfo) {
        return model.value[propName] == index;
    }

    const overlayIndex = model.value[propName].findIndex((x) => x.id == props.section.propertyInfo.id);
    if (overlayIndex <= -1) {
        return false;
    }

    return model.value[propName][overlayIndex][props.section.propertyInfo.name] === index;
}

const propertyIndex = computed(() => {
    const propName = String(props.section.property);
    return model.value[propName].findIndex((x) => x.id == props.section.propertyInfo.id);
});

const isIndexed = computed(() => typeof props.index !== 'undefined');
</script>

<template>
    <span class="font-semibold uppercase">{{ props.section.name }}</span>
    <div class="flex flex-row gap-3">
        <div class="flex max-w-[328px] flex-wrap justify-between gap-3" v-if="props.section.isColor">
            <button
                v-for="(color, index) in props.section.propertyInfo ? MakeupColors : HairColors"
                :style="getColorStyle(color)"
                :class="isColorSelected(index) ? ['border-neutral-200', 'border-4', 'animate-bounce'] : []"
                class="size-7 rounded-lg border-2 border-neutral-900 hover:border-neutral-200 active:scale-95"
                @click="updateColor(index)"
            >
                &nbsp;
            </button>
        </div>
        <template v-else>
            <UiIconButton size="size-10" @click="emits('updateValue', 'decrement', props.section)">
                <LeftIcon class="mt-[2px] text-3xl" />
            </UiIconButton>
            <InputBox
                v-if="!isIndexed && !props.section.propertyInfo"
                v-model="model[String(props.section.property)]"
                :min="props.section.min"
                :max="props.section.max"
            />
            <div
                v-else-if="isIndexed && !props.section.propertyInfo"
                class="flex h-10 w-full cursor-not-allowed select-none items-center justify-center rounded-lg border-2 border-neutral-50 border-opacity-20 bg-opacity-80 font-bold outline-none"
            >
                {{ model[String(props.section.property)][props.index] }}
            </div>
            <div
                v-else-if="!isIndexed && props.section.propertyInfo"
                class="flex h-10 w-full cursor-not-allowed select-none items-center justify-center rounded-lg border-2 border-neutral-50 border-opacity-20 bg-opacity-80 font-bold outline-none"
            >
                {{ model[String(props.section.property)][propertyIndex][props.section.propertyInfo.name] }}
            </div>

            <UiIconButton size="size-10" @click="emits('updateValue', 'increment', props.section)">
                <RightIcon class="mt-[2px] text-3xl" />
            </UiIconButton>
        </template>
    </div>
</template>
