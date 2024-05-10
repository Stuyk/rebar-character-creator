<script lang="ts" setup>
import { watch } from 'vue';

const props = defineProps<{ min: number; max: number }>();
const model = defineModel<number>();

watch(model, (newValue) => {
    if (typeof newValue === 'undefined') {
        return;
    }

    if (newValue > props.max) {
        model.value = props.max;
        return;
    }

    if (newValue < props.min) {
        model.value = props.min;
        return;
    }
});
</script>

<template>
    <input
        type="number"
        inputmode="numeric"
        class="h-10 w-full rounded-lg border-2 border-neutral-50 border-opacity-20 bg-neutral-950 bg-opacity-80 text-center font-bold outline-none placeholder:text-neutral-500 focus:border-opacity-50"
        v-model="model"
        :min="props.min ?? 0"
        :max="props.max ?? 1"
    />
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    display: none;
}
</style>
