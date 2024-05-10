import { ref, toRaw } from 'vue';
import { Appearance, AppearanceInfo } from '../../../../main/shared/types/appearance.js';
import { DefaultAppearance } from '../../shared/defaultAppearance.js';
import { useEvents } from '../../../../../webview/composables/useEvents.js';
import { CharacterCreatorEvents } from '../../shared/characterCreatorEvents.js';
import { computed } from 'vue';

const events = useEvents();
const appearance = ref<Appearance>(DefaultAppearance);

export function useAppearance() {
    function update() {
        events.emitClient(CharacterCreatorEvents.toClient.updateAppearance, toRaw<Appearance>(appearance.value));
    }

    function setField<K extends keyof Appearance>(key: K, value: Appearance[K]) {
        appearance.value[key] = value;
        update();
    }

    function setHeadOverlay(id: number, key: keyof AppearanceInfo, value: number) {
        const index = appearance.value.headOverlays.findIndex((x) => x.id == id);
        if (index <= -1) {
            return;
        }

        appearance.value.headOverlays[index][key] = value;
        update();
    }

    return {
        appearance,
        setField,
        setHeadOverlay,
        update,
        sex: computed(() => {
            return appearance.value.sex;
        }),
    };
}
