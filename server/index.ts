import * as alt from 'alt-server';

import { useRebar } from '@Server/index.js';
import { Character } from '@Shared/types/character.js';

import { CharacterCreatorEvents } from '../shared/characterCreatorEvents.js';

const sessionKey = 'can-change-appearance';
const Rebar = useRebar();
const api = Rebar.useApi();

export async function showAppearanceMenu(player: alt.Player) {
    player.setMeta(sessionKey, true);
    player.emit(CharacterCreatorEvents.toClient.toggleControls, false);
    Rebar.player.useWebview(player).show('CharacterCreator', 'page');
}

function handleCharacterSelect(player: alt.Player, document: Character) {
    // Has appearance, ignore sending to appearance editor
    if (document.appearance) {
        return;
    }

    showAppearanceMenu(player);
}

async function init() {
    await alt.Utils.waitFor(() => api.isReady('character-select-api'), 30000);
    api.get('character-select-api').onSelect(handleCharacterSelect);
}

init();
