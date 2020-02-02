class Quest  {
    constructor(title,content,reward,objectRequested,cityInfluence){
        this.title = title;
        this.content = content;
        this.reward = reward;
        this.isQuestAccepted = false;
        this.isQuestAccomplished = false;
        this.objectRequested =objectRequested;
        this.cityInfluence = cityInfluence;
    }
}
