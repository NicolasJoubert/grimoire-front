/** Create an empty text bloc */
const createTextBloc = (noteData, blocType) => {
    const newBloc = {
        position: noteData.blocs.length,
        type: blocType, 
        value: "",
        langage: null,
    }
    return newBloc
}

module.exports = { createTextBloc }