class QuestObject{
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

var ALL_QUEST_OBJECT = {
    "Potions" : {
        'Soin': new QuestObject('Potion de soin', 1, 'Une fiole vide, une herbe médicinale', 'Soigne d\'une blessure légère'),
        'Guerison': new QuestObject('Potion de guérison', 2, 'Une fiole vide, deux herbes médicinales , une racine de mandragore', 'Soigne d\'une maladie ou blessure grave'),
        'Force': new QuestObject('Potion de froce', 3, 'Une fiole vide, deux racines de mandragore, une plume de,phoenix ', 'Décuple la force'),
        'Chance': new QuestObject('Potion de chance', 4, 'Une fiole vide, trois herbes médicinales, deux racines de mandragore', 'Confère une chance incroyable'),
        'Ressurection': new QuestObject('Potion de resu', 5, 'Une fiole vide, deux herbes médicinales, deux racines de mandragore, deux plumes de phoenix ', 'Ressucite un être mort '),
    },
    "Runes" : {
        'Affutage' : new QuestObject('Rune d\'affutage',1,'Une pierre , glyphe de réparation','Restaure un équipement pas encore cassé'),
        'Reparation' : new QuestObject('Rune de répatation',2,'Une ferrite, glyphe de réparation','Répare un équipement cassé'),
        'Bijoux' : new QuestObject('Rune de réparation des bijoux',3,'Un lingot d\'or, glyphe de réparation','Répare un cristal / bijoux cassé'),
        'Divine' : new QuestObject('Rune d eprotection divine',4,'Un Lingot d\'or, glyphe divine','Répare et protège un equipement de la casse'),
    },
    "Parchemins" : {
        'Sommeil' : new QuestObject('Parchemin de sommeil',1,'Un parchemin, incantation de sommeil','Permet à la cible de faire de beaux rêves'),
        'Amour' : new QuestObject('Parchemin d\'amour',2,'Un parchemin, incantation de manipulation','Permet de rendre la cible amoureuse du lanceur'),
        'Persuasion' : new QuestObject('Parchemin de persuasion',3,'Un parchemin, incantation de persuasion','La cible accepte TOUS provenant du lanceur'),
        'Oublie' : new QuestObject('Parchemin d\'oublie',4,'Un parchemin, incantation de mental','La cible oublie TOUS ce que le lanceur souhaite'),
        'Competence' : new QuestObject('Parchemin de compétence accrue',5,'Un parchemin, incantation d\'amélioration','Augmente ou diminue un trait choisi de la cible'),
    }
}