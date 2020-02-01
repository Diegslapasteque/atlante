
const TIME_TO_WAIT = 0;
const DECREASE_TIME_TO_WAIT = 1;
class Pnj extends MoveAsset {
    constructor(name,situation,quests,actualQuest,category){
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
        "pnj1" : null
    },
    "Monnie" : {
        "pnj2" : null
    },
}