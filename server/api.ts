import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';

type PlayerCharacterCallback = (player: alt.Player) => void;

const API_NAME = 'character-create-api';
const Rebar = useRebar();

const selectCallbacks: Array<PlayerCharacterCallback> = [];

export function invokeCreate(player: alt.Player) {
    for (let cb of selectCallbacks) {
        cb(player);
    }
}

function useApi() {
    function onCreate(callback: PlayerCharacterCallback) {
        selectCallbacks.push(callback);
    }

    return {
        onCreate,
    };
}

declare global {
    export interface ServerPlugin {
        [API_NAME]: ReturnType<typeof useApi>;
    }
}

Rebar.useApi().register(API_NAME, useApi());
