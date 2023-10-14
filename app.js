const express = require('express');
const bodyParser = require('body-parser');
const affirmation = require('./affirmation');
const cors = require('cors');

const port = 3000;

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json());

app.get('/affirmations', (req,res)=> {
    const affirmations = affirmation.readAffirmations();
    res.send(affirmations);
})
app.put('/affirmations/:id', (req,res)=> {
    const {id} = req.params;
    const {text} = req.body;
    if(text == null){
        res.send('Please provide text in the body');
        return;
    }
    affirmation.updateAffirmationById(id, text);
    res.send('Successfully updated affirmation');
})
app.post('/affirmations', (req,res)=>{
    const {text} = req.body;
    if(text == null){
        res.send('Please provide affirmation text in body');
        return;
    }
    affirmation.addAffirmation(text);
    res.send('Successfully added affirmation: ' + text);
})

app.delete('/affirmations/:id', (req,res)=>{
    const {id} = req.params;
    affirmation.deleteAffirmationById(id);
    res.send('Successfully deleted affirmation with id: ' + id);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})