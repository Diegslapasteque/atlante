class PnjInfos {
    constructor(name,situation,quests,actualQuest,type){
        this.name = name;
        this.situation = situation;
        this.quests = [];
        this.actualQuests = actualQuest;
        this.timeToWait = 0;
        this.questObject = null;
        this.type = type;
    }

    decreaseTimeToWait(){this.timeToWait -= 1;}
}

class Pnj extends Character {
    constructor(type, x, y, width, height, speed, xColli, yColli, widthColli, heightColli, pnjInfos, barNumber) {
        super(type, x, y, width, height, speed, xColli, yColli, widthColli, heightColli);

        this.pnjInfos = pnjInfos;
        this.barNumber = barNumber;
        this.waiting = false;
    }
}
