// 1. Récupérer le mot 
const watchSubmit = () => {
    const form = document.querySelector("#form")
    form.addEventListener ("submit", (event) => {
        event.preventDefault()
        const data = new FormData(form)
        const wordToSearch = data.get("search")
        apiCall(wordToSearch)
        form.reset ()
    })
}


// 2. Envoyer mon mot à l'API
const apiCall = (word) => {
    fetch (`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => response.json ())
        .then((data) => {
            const informationNeeded = extractData (data[0])
            renderToHTML(informationNeeded)
            console.log (data)
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

const renderToHTML = (data) => {
    const card = document.querySelector('.js-card')
    card.classList.remove('card--hidden')

    // Manipulation de textes avec la propriété textContent
    const title = document.querySelector(".js-card-title")
    title.textContent = data.word
    const phonetic = document.querySelector(".js-card-phonetic")
    phonetic.textContent = data.phonetic
    
    // Création d'élements HTML dynamiques
    const list = document.querySelector('.js-card-list')
    list.innerHTML = ""
    for(let i = 0; i < data.meanings.length; i++) {
        const meaning = data.meanings[i]
        const partOfSpeech = meaning.partOfSpeech
        const definition = meaning.definitions[0].definition

        // Avec la création d'élements 
        const li = document.createElement('li')
        li.classList.add('card__meaning')
        const pPartOfSpeech = document.createElement('p')
        pPartOfSpeech.textContent = partOfSpeech
        pPartOfSpeech.classList.add('card__part-of-speech')
        const pDefinition = document.createElement('p')
        pDefinition.textContent = definition
        pDefinition.classList.add('card__definition')
        
        li.appendChild(pPartOfSpeech)
        li.appendChild(pDefinition)
        list.appendChild(li)
    }
    // Ajout de l'audio en JS
    const button = document.querySelector('.js-card-button')
    const audio = new Audio(data.pronoun)
    button.addEventListener('click', () => {
        button.classList.remove("card__player--off")
        button.classList.add("card__player--on")
        audio.play()
    })
    audio.addEventListener('ended', () => {
        button.classList.remove("card__player--on")
        button.classList.add("card__player--off")
    })
}

// lancement du programme
watchSubmit()