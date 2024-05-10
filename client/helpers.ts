import * as native from 'natives';

type RGB = { r: number; g: number; b: number };

function getOverlays() {
    const overlayMaximums: number[] = [];

    for (let i = 0; i < 13; i++) {
        overlayMaximums.push(native.getPedHeadOverlayNum(i));
    }

    return overlayMaximums;
}

function getPrimaryColorList() {
    const colors: RGB[] = [];

    const hairColorCount = native.getNumPedHairTints();
    for (let i = 0; i < hairColorCount; i++) {
        const [_, r, g, b] = native.getPedHairTintColor(i);
        colors.push({ r, g, b });
    }

    return colors;
}

function getSecondaryColorList() {
    const colors: RGB[] = [];

    const tintCount = native.getNumPedMakeupTints();
    for (let i = 0; i < tintCount; i++) {
        const [_, r, g, b] = native.getPedMakeupTintColor(i);
        colors.push({ r, g, b });
    }

    return colors;
}

export function getCreationData() {
    const colors = getPrimaryColorList();
    const colorsSecondary = getSecondaryColorList();
    const overlays = getOverlays();

    return {
        colors,
        colorsSecondary,
        overlays,
    };
}
