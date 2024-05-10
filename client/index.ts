import * as alt from 'alt-client';

import { useClonedPed } from '@Client/ped/clone.js';
import { useWebview } from '@Client/webview/index.js';
import { Appearance } from '@Shared/types/appearance.js';

import { DefaultClothes } from './clothing.js';

import { CharacterCreatorEvents } from '../shared/characterCreatorEvents.js';
import { DefaultAppearance } from '../shared/defaultAppearance.js';
import { getCreationData } from './helpers.js';

const pedClone = useClonedPed();
const webview = useWebview();

function updateAppearance(appearance: Appearance) {
    pedClone.ped.update(appearance, DefaultClothes[appearance.sex], {
        pos: alt.Player.local.pos,
        heading: 60,
    });
}

async function handleToggleControls(value: boolean) {
    alt.toggleGameControls(value);
    alt.setConfigFlag('DISABLE_IDLE_CAMERA', !value);

    if (value) {
        alt.off('disconnect', pedClone.ped.destroy);
        pedClone.ped.destroy();
        pedClone.camera.destroy();
    } else {
        alt.on('disconnect', pedClone.ped.destroy);
        pedClone.ped.update(DefaultAppearance, DefaultClothes[DefaultAppearance.sex], {
            pos: alt.Player.local.pos,
            heading: 60,
        });
        await pedClone.camera.create({ bone: 'IK_Head', fov: 20, zOffset: 0.7 });
    }
}

function updateNativeData() {
    webview.emit(CharacterCreatorEvents.toClient.getNativeData, getCreationData());
}

alt.onServer(CharacterCreatorEvents.toClient.toggleControls, handleToggleControls);
webview.on(CharacterCreatorEvents.toClient.updateAppearance, updateAppearance);
webview.on(CharacterCreatorEvents.toClient.getNativeData, updateNativeData);
