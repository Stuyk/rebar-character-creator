import * as alt from 'alt-server';

import { useRebar } from '@Server/index.js';
import { Character } from '@Shared/types/character.js';

import { CharacterCreatorEvents } from '../shared/characterCreatorEvents.js';
import { Appearance } from '../../../main/shared/types/appearance.js';

import { invokeCreate, invokeSkipCreate } from './api.js';

import { useTranslate } from '@Shared/translate.js';

import '../translate/index.js';

const { t } = useTranslate('en');
const sessionKey = 'can-change-appearance';
const Rebar = useRebar();
const api = Rebar.useApi();

export async function showAppearanceMenu(player: alt.Player) {
    player.setMeta(sessionKey, true);
    player.emit(CharacterCreatorEvents.toClient.toggleControls, false);
    player.visible = false;
    Rebar.player.useNative(player).invoke('displayRadar', false);
    Rebar.player.useWebview(player).show('CharacterCreator', 'page');
}

async function saveAppearance(player: alt.Player, appearance: Appearance) {
    if (!player.getMeta(sessionKey)) {
        player.kick(t('character.creator.unable.to.save'));
        return;
    }

    const characterDoc = Rebar.document.character.useCharacter(player);
    if (!characterDoc) {
        player.kick(t('character.creator.unable.to.save'));
        return;
    }

    Rebar.player.useWebview(player).hide('CharacterCreator');
    Rebar.player.useNative(player).invoke('displayRadar', true);
    player.deleteMeta(sessionKey);
    await characterDoc.set('appearance', appearance);
    Rebar.player.usePlayerAppearance(player).update();
    Rebar.player.useClothing(player).update();
    player.emit(CharacterCreatorEvents.toClient.toggleControls, true);
    player.visible = true;
    invokeCreate(player);
}

function handleCharacterSelect(player: alt.Player, document: Character) {
    if (document.appearance) {
        invokeSkipCreate(player);
        return;
    }

    showAppearanceMenu(player);
}

async function init() {
    await alt.Utils.waitFor(() => api.isReady('character-select-api'), 30000);
    api.get('character-select-api').onSelect(handleCharacterSelect);
    alt.onClient(CharacterCreatorEvents.toServer.saveAppearance, saveAppearance);
}

init();
