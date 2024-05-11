<script lang="ts" setup>
import { ref, toRaw } from 'vue';
import { useEvents } from '../../../../../../webview/composables/useEvents';
import { CharacterCreatorEvents } from '../../../shared/characterCreatorEvents';
import { useAppearance } from '../../composable/useAppearance';
import UiButton from '../ui/UiButton.vue';
import { useTranslate } from '@Shared/translate';

const { t } = useTranslate('en');

const emits = defineEmits<{ (e: 'onProcessing'): void }>();
const { appearance } = useAppearance();
const events = useEvents();
const processing = ref(false);

function processRequest() {
    if (processing.value) {
        return;
    }

    events.emitServer(CharacterCreatorEvents.toServer.saveAppearance, toRaw(appearance.value));
    processing.value = true;
    emits('onProcessing');
}
</script>

<template>
    <div class="flex w-full max-w-[328px] flex-col gap-3">
        <UiButton height="h-10" @click="processRequest" v-if="!processing">
            {{ t('character.creator.save') }}
        </UiButton>
        <span class="font-cap animate-pulse pt-1 font-semibold uppercase" v-else>
            {{ t('character.creator.processing') }}
        </span>
    </div>
</template>
