console.log('V1 : Mon dico anglais')

/*

MON PROGRAMME : 

> Je veux pouvoir donner la définition d'un mot à mes utilisateurs

- 1. Récupérer le mot saisi par l'utilisateur
- 2. Envoyer le mot à l'API ( https://dictionaryapi.dev/ )
- 3. Récupérer le JSON (la donnée) en lien avec mon mot
- 4. Afficher les informations de mon mot sur ma page (HTML)
- 5. Ajouter un lecteur pour écouter la prononciation du mot

*/


// 1. Récupérer le mot 
const watchSubmit = () => {
    const form = document.querySelector("#form")
    form.addEventListener ("submit", (event) => {
        event.preventDefault()
        const data = new FormData(form)
        const wordToSearch = data.get("search")
        apiCall(wordToSearch)

    })
}


// 2. Envoyer mon mot à l'API
const apiCall = (word) => {
    fetch (`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => response.json ())
        .then((data) => {
            const informationNeeded = extractData (data[0])
            renderToHTML(informationNeeded)
        })
        .catch((error) => {
            alert("le mot demandé n'existe pas")
            console.error(error)
        })
    }

const extractData = (data) => {
    const word = data.word
            
    const phonetic = findProp (data.phonetics, "text")
    
    const pronoun = findProp (data.phonetics, "audio")
    
    const meanings = data.meanings

    return {
        word: word,
        phonetic: phonetic,
        pronoun: pronoun,
        meanings: meanings
    }
}


const findProp = (array, name) => {
    
    for (let i=0; i < array.length; i++){
        const currentObjet = array[i]
        const hasProp = currentObjet.hasOwnProperty(name)
        if (hasProp) return currentObjet [name]
        
    }
}

const renderToHTML = () => {

}
// lancement du programme
watchSubmit()