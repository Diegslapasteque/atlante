class Pnj {
    constructor(name,situation,quests,actualQuest){
      this.name = name;
      this.situation = situation;
      this.quests = [];
      this.actualQuests = actualQuest;
      this.timeToWait = 0;
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
    decreaseTimeToWait(){this.timeToWait -= 1;}
}