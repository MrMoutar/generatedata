import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const rowNum = data.rowNum;
	const { loopCount, values } = data.rowState;
	const numValues = values.length;

	let value = '';
	if (numValues === 1) {
		value = values[0];
	} else {
		let itemIndex = Math.floor((rowNum-1) / loopCount);
		if (itemIndex > numValues - 1) {
			itemIndex = (itemIndex % numValues);
		}
		value = values[itemIndex];
	}

	return {
		display: value
	};
};

let utilsLoaded = false;

const onmessage = (e: any) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	postMessage(generate(e.data));
};

export {};
