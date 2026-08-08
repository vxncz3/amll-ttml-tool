import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
	type ColorStop,
	generateLutFromStops,
	generatePalette,
	getGrayscaleColor,
	getpurpleColor,
	getIcypurpleColor,
} from "$/modules/spectrogram/utils/colors";

export const spectrogramGainAtom = atomWithStorage(
	"settings_spectrogramGain",
	3.0,
);
export const spectrogramZoomAtom = atomWithStorage(
	"settings_spectrogramZoom",
	200,
);
export const spectrogramHeightAtom = atomWithStorage(
	"settings_spectrogramHeight",
	256,
);
export const spectrogramScrollLeftAtom = atom(0);
export const spectrogramContainerWidthAtom = atom(0);
export const showBeatLinesAtom = atomWithStorage(
	"settings_showBeatLinesOnSpectrogram",
	false,
);

const icypurplePalette = {
	id: "icy_purple",
	name: "Icy purple",
	data: generatePalette(getIcypurpleColor),
};

const grayscalePalette = {
	id: "grayscale",
	name: "Gray Scale",
	data: generatePalette(getGrayscaleColor),
};

const aegisubpurplePalette = {
	id: "aegisub_purple",
	name: "purple",
	data: generatePalette(getpurpleColor),
};

export const predefinedPalettes = [
	icypurplePalette,
	aegisubpurplePalette,
	grayscalePalette,
];

export const selectedPaletteIdAtom = atomWithStorage<string>(
	"settings_selectedPaletteId",
	"icy_purple",
);

export const customPaletteStopsAtom = atomWithStorage<ColorStop[]>(
	"settings_customPaletteStops",
	[
		{ id: crypto.randomUUID(), pos: 0.0, color: "#000000" },
		{ id: crypto.randomUUID(), pos: 0.5, color: "#ff0000" },
		{ id: crypto.randomUUID(), pos: 1.0, color: "#ffff00" },
	],
);

export const currentPaletteAtom = atom((get) => {
	const selectedId = get(selectedPaletteIdAtom);

	if (selectedId === "custom") {
		const stops = get(customPaletteStopsAtom);

		const paletteId =
			"custom_" +
			stops.map((s) => `${s.pos.toFixed(2)}-${s.color.substring(1)}`).join("-");

		const paletteData = generateLutFromStops(stops);

		return { id: paletteId, name: "custom", data: paletteData };
	}

	const predefined = predefinedPalettes.find((p) => p.id === selectedId);
	if (predefined) {
		return predefined;
	}

	return icypurplePalette;
});

export const spectrogramHoverPxAtom = atom(0);

export const spectrogramHoverTimeMsAtom = atom((get) => {
	const hoverPx = get(spectrogramHoverPxAtom);
	const scrollLeft = get(spectrogramScrollLeftAtom);
	const zoom = get(spectrogramZoomAtom);
	const containerWidth = get(spectrogramContainerWidthAtom);

	if (zoom <= 0) return 0;

	const clampedMouseX = Math.max(0, Math.min(hoverPx, containerWidth));
	const hoverX = scrollLeft + clampedMouseX;
	const hoverTimeS = hoverX / zoom;

	return hoverTimeS * 1000;
});
