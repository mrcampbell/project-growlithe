/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 */
export default (array: any[]): any[] => {

	var currentIndex = array.length;
	var temporaryValue: any, randomIndex: number;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};