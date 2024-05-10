import { reactive, watch } from 'vue';
import { Appearance } from '@Shared/types/appearance.js';
import { useAppearance } from './useAppearance.js';

export type CustomSection = {
    name: string;
    property: keyof Appearance;
    min?: number;
    max?: number;
    index?: boolean;
    increment?: number;
    isColor?: boolean;
    propertyInfo?: {
        id: number;
        name: string;
        isColorSecondary?: boolean;
    };
};

const { appearance, update } = useAppearance();

function fixDecimals(value: number, decimalCount: number = 2) {
    return parseFloat(value.toFixed(decimalCount));
}

export function useUpdater(values: ReturnType<typeof reactive<Partial<Appearance>>>) {
    function updateValue(type: 'increment' | 'decrement', section: CustomSection) {
        const propName = String(section.property);

        if (type === 'increment') {
            if (values[propName] + section.increment > section.max) {
                return;
            }

            values[propName] = fixDecimals(values[propName] + section.increment, section.increment < 1 ? 2 : 0);
            return;
        }

        // decrement
        if (values[propName] - section.increment < section.min) {
            return;
        }

        values[propName] = fixDecimals(values[propName] - section.increment, section.increment < 1 ? 2 : 0);
    }

    function updateValueByIndex(type: 'increment' | 'decrement', section: CustomSection, index: number) {
        const propName = String(section.property);
        if (!Array.isArray(values[propName])) {
            console.warn(`${propName} is not updateable by index`);
            return;
        }

        if (type === 'increment') {
            if (values[propName][index] + section.increment > section.max) {
                return;
            }

            values[propName][index] = fixDecimals(
                values[propName][index] + section.increment,
                section.increment < 1 ? 2 : 0,
            );
            return;
        }

        // decrement
        if (values[propName][index] - section.increment < section.min) {
            return;
        }

        values[propName][index] = fixDecimals(
            values[propName][index] - section.increment,
            section.increment < 1 ? 2 : 0,
        );
    }

    function updateValueByProperty(type: 'increment' | 'decrement', section: CustomSection) {
        const propName = String(section.property);
        if (!Array.isArray(values[propName])) {
            console.warn(`${propName} is not updateable by index`);
            return;
        }

        const index = values[propName].findIndex((x) => x.id === section.propertyInfo.id);
        if (index <= -1) {
            return;
        }

        if (type === 'increment') {
            if (values[propName][index][section.propertyInfo.name] + section.increment > section.max) {
                return;
            }

            values[propName][index][section.propertyInfo.name] = fixDecimals(
                values[propName][index][section.propertyInfo.name] + section.increment,
                section.increment < 1 ? 2 : 0,
            );
            return;
        }

        // decrement
        if (values[propName][index][section.propertyInfo.name] - section.increment < section.min) {
            return;
        }

        values[propName][index][section.propertyInfo.name] = fixDecimals(
            values[propName][index][section.propertyInfo.name] - section.increment,
            section.increment < 1 ? 2 : 0,
        );
    }

    watch(values, () => {
        appearance.value = Object.assign(appearance.value, values);
        update();
    });

    return {
        updateValue,
        updateValueByIndex,
        updateValueByProperty,
    };
}
