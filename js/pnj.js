
const TIME_TO_WAIT = 0;
const DECREASE_TIME_TO_WAIT = 1;
class Pnj extends MoveAsset {
    constructor(name,situation,quests,actualQuest){
      super();
      this.name = name;
      this.situation = situation;
      this.quests = [];
      this.actualQuests = actualQuest;
      this.timeToWait = TIME_TO_WAIT;
      this.questObject = null;
    }
    getName(){ return this.name;}
    setName(newName){this.name = newName; }

    getSituation(){ return this.situation;}
    setSituation(newSituation){this.situation = newSituation; }

    getQuests(){ return this.quests; }
    setQuests(newQuest){this.actualQuest = newQuest;}

    getActualQuest(){ return this.actualQuest;}
    setActualQuest(quest){ this.actualQuest = quest;}

    getTimeToWait(){ return this.timeToWait;}
    setTimeTOWait(newTimeToWait){this.timeToWait = newTimeToWait;}
    decreaseTimeToWait(){this.timeToWait -= DECREASE_TIME_TO_WAIT;}
}

const ALL_PNJ = {
    "Capricol" : {
        //IMPORTANT PNJ
        'Rocwald' : new Pnj('Rocwald','Voleur',[ALL_QUESTS.VilMalendrin,ALL_QUESTS.VilMalendrin_3],ALL_QUESTS.VilMalendrin,),
        'Fastpaul' : new Pnj('Fastpaul','Noble',[ALL_QUESTS.Marchand,ALL_QUESTS.VilMalendrin_2],ALL_QUESTS.Marchand),

        //RANDOM PNJ
        'Roywulf' : new Pnj('Roywulf','Voleur',null,ALL_QUESTS.VoleurAncien),
        'Eallett' : new Pnj('Eallett','Paysanne',null,ALL_QUESTS.ProcheMalade),
        'Roneal' : new Pnj('Roneal','Petite fille',null,ALL_QUESTS.Chien),
        'Nasba' : new Pnj('Nasba','Chasseur',null,ALL_QUESTS.Chasseur),
        'Evermit' : new Pnj('Evermit','Soldat',null,ALL_QUESTS.Combattant),
        'Muelord' : new Pnj('Muelord','Soldat',null,ALL_QUESTS.Novice),
        'Nadon' : new Pnj('Nadon','Soldat',null,ALL_QUESTS.CombattantPeuSoigneux),
        'Elfvid' : new Pnj('Elfvid','Noble',null,ALL_QUESTS.NoblesseTriste),
        'Venred' : new Pnj('Venred','Héros',null,ALL_QUESTS.Heros),
        'Roe' : new Pnj('Roe','Veille dame',null,ALL_QUESTS.Sommeil),
        'Retvise' : new Pnj('Retvise','Chevalier',null,ALL_QUESTS.ChevelierDeRose),
        'Brandbard' : new Pnj('Brandbard','Soldat',null,ALL_QUESTS.SoldatSuicidaire),
        'Rolla' : new Pnj('Rolla','Agriculteur',null,ALL_QUESTS.PaysanPeureux),
    },
    "Monnie" : {
        //IMPORTANT PNJ

        //RANDOM PNJ
    },
}