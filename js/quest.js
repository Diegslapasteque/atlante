class Quest  {
    constructor(title,content,reward,objectRequested,cityInfluence){
        this.title = title;
        this.content = content;
        this.reward = reward;
        this.isQuestAccomplished = true;
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
    setIsQuestAccomplished (bool){
        this.isQuestAccomplished = bool;
    }

    getObjectRequested(){return this.objectRequested;}
    setObjectRequested(newObject){this.objectRequested = newObject;}

    getCityInfluence(){return this.cityInfluence}
    setCityInfluence(newInfluence){this.cityInfluence = newInfluence}

}