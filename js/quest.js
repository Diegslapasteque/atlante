class Quest  {
    constructor(title,content,reward,objectRequested,cityInfluence){
        this.title = title;
        this.content = content;
        this.reward = reward;
        this.isQuestAccomplished = false;
        this.objectRequested =objectRequested;
        this.cityInfluence = cityInfluence;
    }
    getTitle(){ return this.title;}
    setTitle(newTitle){this.title = newTitle; }

    getContent(){ return this.content;}
    setContent(newContent){this.content = newContent; }

    getReward(){ return this.reward;}
    setReward(newReward){this.reward = newReward; }

    getIsQuestAccomplished(){ return this.isQuestAccomplished;}
    setIsQuestAccomplished (bool , passedQuestTo){
        this.isQuestAccomplished = bool;
        if(this.influencedPnj !== null){this.influencedPnj.setActualQuest(passedQuestTo)}
    }

    getObjectRequested(){return this.objectRequested;}
    setObjectRequested(newObject){this.objectRequested = newObject;}

    getCityInfluence(){return this.cityInfluence}
    setCityInfluence(newInfluence){this.cityInfluence = newInfluence}

}

var ALL_QUESTS = {
    //IMPORTANT QUESTS
    "VilMalendrin" : new Quest('Des projets de richesses','Bonjour, mage. Je suis à la recherche d\'une magie pour soulager les problèmes de sommeil sensible.',200,ALL_QUEST_OBJECT.Parchemins.Sommeil,-15),
    "VilMalendrin_2" : new Quest('Des projets de vengeance','Bon alors !!! je sais que je ne suis pas apprécié dans ce village mais ce n\'est pas une raison pour fournir des sort qui me nuisent. Vous avez intéret à me donner Un parchemin de persuasion pour que je récupère ce que ce voleur m\'a dérobé !!',500,ALL_QUEST_OBJECT.Potions.Soin,-30),
    "VilMalendrin_3" : new Quest('Des projets de fuite','Je vous remercie beaucoup !!!! maintenant je suis recherché dans tous le royaume, alors qu\'il le mérité !! Il faut que j\'efface mes traces auprès du commissaire, donnez moi ce qu\'il faut !' ,0,ALL_QUEST_OBJECT.Parchemins.Oublie,50),

    //RANDOM QUESTS POTION
    "Chien" : new Quest('Chien blessé','Bonjour, monsieur le magicien, pendant que je jouais avec mon chien, un méchant noble lui à donné un coup. Il a la patte cassé, je sais pas quoi faire ?   ',10,ALL_QUEST_OBJECT.Potions.Soin,5),
    "ProcheMalade" : new Quest('Chat malade','Bonjour, magicien, un de mes proche est gravement malade, et j\'aurai besoin d\'une potion pour la soigner !',30,ALL_QUEST_OBJECT.Potions.Guerison,5),
    "Combattant" : new Quest('Un combattant aguéri','Mage ! j\'ai besoin de plus de force ! VITEEEEE !!!!',5,ALL_QUEST_OBJECT.Potions.Soin,15),
    "Novice" : new Quest('Un combattant peu aguéri','Bon...Bonjour monsieur, j... je dois bientôt partir pour le champ de bataille, mais avec ma poisse, je vais surement prendre un flèche perdu et mourir. Vous avez quelque chose.',0,ALL_QUEST_OBJECT.Potions.Soin,5),
    "Chasseur" : new Quest('Un chasseur ne sachant chasser','Excusez-moi, Auriez-vous quelque-chose de très puissant, qui pourrait... par exemple... redonner la vie à quelqu\'un ?',200,ALL_QUEST_OBJECT.Potions.Soin,-10),

    //RANDOM QUESTS RUNES
    "VoleurAncien" : new Quest('Trésor ancien','Bonjour, grand sorcier respectable. Je suis à la recherche d\'une runes permettant d\'embellir et de rendre cette ancien relique réutilisable ? ',300,ALL_QUEST_OBJECT.Runes.Affutage,-20),
    "CombattantPeuSoigneux" : new Quest('Un combattant peu soigneux','Mage !!! , Mon épée s\'est brisée !!! faites quelque chose !!!',5,ALL_QUEST_OBJECT.Runes.Reparation,15),
    "NoblesseTriste" : new Quest('Une noblesse attristé','mage... le bijoux hérité de ma défunte mère, s\'est brisé en mille morceaux... Par pitié, aidez-moi...',15,ALL_QUEST_OBJECT.Runes.Bijoux,5),
    "Heros" : new Quest('Futur Héro','Bonjour à toi grand mage, j\'ai récemment acquéri cette relique magique. Mais comme vous pouvez le voir, cette épée commence à ce briser. Je recherche donc une rune me permettant de la protéger.' ,500,ALL_QUEST_OBJECT.Runes.Divine,20),

    //RANDOM QUESTS PARCHEMIN
    "Sommeil" : new Quest('Un sommeil reposant','Monsieur, on m\'a conseillé de venir vous voir pour mon probléme, la nuit mon esprit est torturé et je ne peux m\'endormir...',10,ALL_QUEST_OBJECT.Parchemins.Sommeil,5),
    "ChevelierDeRose" : new Quest('Roméo et Juliette','Mage !! je suis amoureux de... d\'une agricultrice, mais sa mère ne m\'accorde pas leur consentement. Auriez-vous... quelque chose pour qu\'ils m\'aiment autant que j\'aime ma dulcinée',60,ALL_QUEST_OBJECT.Parchemins.Amour,5),
    "Marchand" : new Quest('Rude négociation','Bonjour, je suis moi aussi un commerçant, et je recherche quelque chose pour m\aider durant des négociations',100,ALL_QUEST_OBJECT.Parchemins.Persuasion,-10),
    "SoldatSuicidaire" : new Quest('Douloureux souvenir','Mage ... Je veux tout oublier... oublier mes erreurs, et cette guerre !!! ',50,ALL_QUEST_OBJECT.Parchemins.Oublie,-5),
    "PaysanPeureux" : new Quest('Un agriculteur peu motivé','B\'jour Msieur. Tout les matins j\'la flemme de t\'vailler,Vous\'riez un t\'uc pour Moi',10,ALL_QUEST_OBJECT.Parchemins.Competence,15),

    /*
    "" : new Quest('','',0,null,ALL_QUEST_OBJECT.Potions.Soin,5),
    "" : new Quest('','',0,null,ALL_QUEST_OBJECT.Potions.Soin,5),
    "" : new Quest('','',0,null,ALL_QUEST_OBJECT.Potions.Soin,5),
    "" : new Quest('','',0,null,ALL_QUEST_OBJECT.Potions.Soin,5),
    "" : new Quest('','',0,null,ALL_QUEST_OBJECT.Potions.Soin,5),
    "" : new Quest('','',0,null,ALL_QUEST_OBJECT.Potions.Soin,5),
    "" : new Quest('','',0,null,ALL_QUEST_OBJECT.Potions.Soin,5),
    "" : new Quest('','',0,null,ALL_QUEST_OBJECT.Potions.Soin,5),*/
}