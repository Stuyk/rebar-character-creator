import { ref } from 'vue';
import { useEvents } from '../../../../../webview/composables/useEvents.js';
import { CharacterCreatorEvents } from '../../shared/characterCreatorEvents.js';

type RGB = { r: number; g: number; b: number };
type NativeData = { colors: RGB[]; colorsSecondary: RGB[]; overlays: number[] };

const events = useEvents();
let nativeData = ref<NativeData>();

function setNativeData(data: NativeData) {
    nativeData.value = data;
}

export function useNativeData() {
    events.on(CharacterCreatorEvents.toClient.getNativeData, setNativeData);
    events.emitClient(CharacterCreatorEvents.toClient.getNativeData);

    return {
        nativeData,
    };
}
