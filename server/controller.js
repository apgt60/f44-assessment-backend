const notes = []
let id = 1

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        const fortunes = [
            "A faithful friend is a strong defense.",
            "A friend asks only for your time not your money.",
            "A golden egg of opportunity falls into your lap this month.",
            "A fresh start will put you on your way.",
            "A lifetime friend shall soon be made."
        ]

        // choose random compliment
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortunes = fortunes[randomIndex];
      
        res.status(200).send(randomFortunes);
    },
    addNote : (req, res) => {
        const {text} = req.body
        notes.push({text: text, id: id})
        id++
        res.status(200).send(notes)
    },
    editNote : (req, res) => {
        const {text, id} = req.body
        let noteWithIdMatch = null
        for(let i=0; i < notes.length; i++){
            if(notes[i].id == id){
                console.log("Found a note with matching id")
                noteWithIdMatch = notes[i]
            }
        }
        if(noteWithIdMatch != null){
            noteWithIdMatch.text = text
            res.status(200).send(notes)
        } else {
            res.status(400).send(`Note with ID=${id} not found!`)
        }
    }, 
    getNotes : (req, res) => {
        res.status(200).send(notes)
    }, 
    deleteNote : (req, res) => {
        console.log("req.params.id:" + req.params.id)
        const id = req.params.id
        let noteWithIdMatch = null
        let i=0
        while(i < notes.length){
            if(notes[i].id == id){
                console.log("Found a note with matching id")
                noteWithIdMatch = notes[i]
                break
            }
            i++
        }
        if(noteWithIdMatch != null){
            notes.splice(i, 1)
            res.status(200).send(notes)
        } else {
            res.status(400).send(`Note with ID=${id} not found!`)
        }
    }

}