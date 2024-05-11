# Character Creator for Rebar Framework

This plugin allows for players to customize their character after creating it.

Any character with `No Appearance` will be shown a dialogue to build an appearance.

This is strictly only for `appearance` and **not clothing**.

![GTA5_ExgWVBBkM4](https://github.com/Stuyk/rebar-character-creator/assets/21284100/fc345949-634e-451a-97ff-a74cff8855d5)

## Requires

You must have these plugins installed to use this plugin.

-   [Rebar Auth](https://github.com/Stuyk/rebar-auth)
-   [Rebar Character Select](https://github.com/Stuyk/rebar-character-select)

## Features

-   Face Blending
-   Hair Blending
-   Hair Overlays
-   Facial Hair
-   Eyebrows
-   Eyes
-   Face Structure / Micro Morphs
-   Head Overlays (Makeup, Lipstick, Sun Damage, Freckles, etc.)
-   Save on Finish

## API

If you need to listen for when a player has created a character appearance or skipped the appearance creator you can use the `character-creator-api`.

```ts
import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';

const Rebar = useRebar();
const api = Rebar.useApi();

function handleCharacterCreated(player: alt.Player) {
    // Do something with the player after they've created their appearance
    // You'll likely want to spawn them
}

function handleCharacterCreateSkip(player: alt.Player) {
    // Do something with players who already have an appearance
    // You'll likely want to spawn them
}

async function init() {
    // Wait for the API to be ready
    await alt.Utils.waitFor(() => api.isReady('character-creator-api'), 30000);

    // Get the API
    const charSelectApi = api.get('character-creator-api');

    // Hook in your event
    charSelectApi.onCreate(handleCharacterCreated);
    charSelectApi.onSkipCreate(handleCharacterCreateSkip);
}

init();
```

## Installation

From the main directory of your `Rebar` framework.

```
git clone https://github.com/Stuyk/rebar-character-creator src/plugins/character-creator
```

That's it.

If you wish to save the plugin in your own repository, go to the `src/plugins/character-creator` folder and delete the `.git` folder.
