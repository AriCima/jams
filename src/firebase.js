export const collectDocIdAndData = doc => {
    return { id: doc.id, data: doc.data() }
}

// en los componentes puedo llamar.
// const x = response.docs.map(collectDocIdAndData)