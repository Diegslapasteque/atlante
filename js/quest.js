class Quest  {
    constructor(title,content,reward,influencedPnj,objectRequested,cityInfluence){
        this.title = title;
        this.content = content;
        this.reward = reward;
        this.influencedPnj = influencedPnj;
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

    getInfluencedPnj(){ return this.influencedPnj;}
    setInfluencedPnj(newPnj){this.influencedPnj = newPnj; }

    getIsQuestAccomplished(){ return this.isQuestAccomplished;}
    setIsQuestAccomplished (bool , passedQuestTo){
        this.isQuestAccomplished = bool;
        this.influencedPnj.setActualQuest(passedQuestTo)
    }

    getObjectRequested(){return this.objectRequested;}
    setObjectRequested(newObject){this.objectRequested = newObject;}

    getCityInfluence(){return this.cityInfluence}
    setCityInfluence(newInfluence){this.cityInfluence = newInfluence}

}

const ALL_QUESTS = {
    "quest1" : null
}