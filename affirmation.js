const fs = require('fs');

const affirmation = {
    affirmationFile: 'affirmations.json',
    readAffirmations() {
        try {
            const data = fs.readFileSync(this.affirmationFile);
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    },
    writeAffirmations(affirmations) {
        fs.writeFileSync(this.affirmationFile, JSON.stringify(affirmations, null, 2));
    },
    addAffirmation(text) {
        const affirmations = this.readAffirmations();
        const newId = this.getNewId(affirmations);
        const newAffirmation = {
            id: newId,
            text,
        };
        affirmations.push(newAffirmation);
        this.writeAffirmations(affirmations);
    },
    getNewId(affirmations) {
        const ids = affirmations.map((affirmation) => affirmation.id);
        const maxId = Math.max(...ids);
        return (maxId + 1).toString();
    },
    deleteAffirmationById(id) {
        const affirmations = this.readAffirmations();
        const index = affirmations.findIndex((affirmation) => affirmation.id == id);
        if (index !== -1) {
            affirmations.splice(index, 1);
            this.writeAffirmations(affirmations);
        }
    },
    updateAffirmationById(id, newText) {
        const affirmations = this.readAffirmations();
        const index = affirmations.findIndex((affirmation) => affirmation.id == id);
        if (index !== -1) {
            affirmations[index].text = newText;
            this.writeAffirmations(affirmations);
        }
    },
};

module.exports = affirmation;
