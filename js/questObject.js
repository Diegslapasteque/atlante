class questObject{
    constructor(name,difficulty,recipe,effect){
        this.name = name;
        this.difficulty = difficulty;
        this.recipe = recipe;
        this.effect = effect;
    }

    getName(){ return this.name;}
    setName(newName){this.name = newName; }

    getDifficulty(){ return this.difficulty;}
    setDifficulty(newDifficulty){this.difficulty = newDifficulty; }

    getRecipe(){ return this.recipe; }
    setRecipe(newRecipe){this.recipe = newRecipe;}

    getEffect(){ return this.effect;}
    setEffect(newEffect){ this.effect = effect;}
}

const ALL_QUEST_OBJECT = {
    "Potion" : null
}