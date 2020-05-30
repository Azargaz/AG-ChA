const ankietaMultirowInsert = (rows, id_ankieta) => {
	rows = rows.map((row, index) => `(${id_ankieta}, $${index+1}, false)`);
	return rows.join();
};
exports.ankietaMultirowInsert = ankietaMultirowInsert;