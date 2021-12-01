const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

// GET Route for homepage
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

// GET Route for notes page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

// GET API Route to read db notes
router.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
        if (err) throw err
        const dbNotes = JSON.parse(data)
        res.json(dbNotes)
    })
})

// GET Route to redirect to index.html if another route isn't found
router.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

//POST API Route to read the notes db and add new notes to it
router.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
        if (err) throw err
        const dbNotes = JSON.parse(data)
        const newNote = req.body
        newNote.id = uuidv4()
        dbNotes.push(newNote)

        const createNote = JSON.stringify(dbNotes)
        fs.writeFile(path.join(__dirname, '../db/db.json'), createNote, (err) => {
            if (err) throw err
        })
        res.json(newNote)
    })
})

// DELETE Route to remove a selected note
router.delete('/api/notes/:id', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
        if (err) throw err
        const dbNotes = JSON.parse(data)
        const notesArray = dbNotes.filter(result => {
            return result.id !== req.params.id
        })

        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notesArray), (err, data) => {
            if (err) throw err
            res.json(notesArray)
        })
    })
})

module.exports = router