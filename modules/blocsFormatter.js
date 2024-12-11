import uniqid from "uniqid"

/** Create an empty text bloc */
const createTextBloc = (noteData, blocType) => {
    console.log("Bloc created yo")
    const newBloc = {
        id: uniqid(),
        position: noteData.blocs.length,
        type: blocType, 
        value: "",
        langage: null,
    }
    return newBloc
}

module.exports = { createTextBloc }