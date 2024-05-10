<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{ selected?: boolean; size: String }>();

const getClasses = computed(() => {
    if (!props.selected) {
        return [
            //
            'bg-white',
            'bg-opacity-20',
            'hover:bg-cyan-400',
            'hover:bg-gradient-to-r',
            'hover:from-indigo-500',
            props.size,
        ];
    }

    return [
        //
        'bg-cyan-400',
        'bg-gradient-to-r',
        'from-indigo-500',
        props.size,
    ];
});
</script>

<template>
    <div>
        <button
            class="flex items-center justify-center rounded-lg text-center font-medium text-white shadow-md active:scale-95"
            :class="getClasses"
        >
            <slot></slot>
        </button>
    </div>
</template>
