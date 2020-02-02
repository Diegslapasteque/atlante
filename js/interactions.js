function tri(a,b)
{
    if (a.name < b.name) return -1;
    else if (a.name == b.name) return 0;
    else return 1;
}

function preparePotion() {
    if(!M.player_inventory.find(function (e) {return e.name == 'fioleVide';})){
        V.renderErrorRecipe('Il vous manque une fiole');
        return;
    }

    if ((RECIPES.POTIONDESOIN.length == M.player_inventory.length) && (JSON.stringify(RECIPES.POTIONDESOIN.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri)))) {
        document.querySelector('#loader-border').classList.add('active')

        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "20%";
        },1000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "40%";
        },2000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "60%";
        },3000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "80%";
        },4000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "100%";
            document.querySelector('#loader-border').classList.remove('active')
            M.player_quests_objects.push(M.questObject.Potions.Soin);
        },5000);
        clearInventory();
    }
    else if ((RECIPES.POTIONDEGUERISON.length == M.player_inventory.length) && (JSON.stringify(RECIPES.POTIONDEGUERISON.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri)))) {
        document.querySelector('#loader-border').classList.add('active')

        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "20%";
        },1000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "40%";
        },2000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "60%";
        },3000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "80%";
        },4000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "100%";
            document.querySelector('#loader-border').classList.remove('active')
            M.player_quests_objects.push(M.questObject.Potions.Guerison);
        },5000);
        clearInventory();
    }
    else if ((RECIPES.POTIONDEFORCE.length == M.player_inventory.length) && (JSON.stringify(RECIPES.POTIONDEFORCE.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri)))) {
        document.querySelector('#loader-border').classList.add('active')

        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "20%";
        },1000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "40%";
        },2000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "60%";
        },3000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "80%";
        },4000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "100%";
            document.querySelector('#loader-border').classList.remove('active')
            M.player_quests_objects.push(M.questObject.Potions.Force);
        },5000);
        clearInventory();
    }
    else if ((RECIPES.POTIONDECHANCE.length == M.player_inventory.length) && (JSON.stringify(RECIPES.POTIONDECHANCE.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri)))) {
        document.querySelector('#loader-border').classList.add('active')

        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "20%";
        },1000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "40%";
        },2000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "60%";
        },3000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "80%";
        },4000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "100%";
            document.querySelector('#loader-border').classList.remove('active')
            M.player_quests_objects.push(M.questObject.Potions.Chance);
        },5000);
        clearInventory();
    }
    else if ((RECIPES.POTIONDERESURECTION.length == M.player_inventory.length) && (JSON.stringify(RECIPES.POTIONDERESURECTION.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri)))) {
        document.querySelector('#loader-border').classList.add('active')

        setTimeout(function () {
           document.querySelector('#loader-inner').style.width = "20%";
        },1000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "40%";
        },2000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "60%";
        },3000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "80%";
        },4000);
        setTimeout(function () {
            document.querySelector('#loader-inner').style.width = "100%";
            document.querySelector('#loader-border').classList.remove('active')
            M.player_quests_objects.push(M.questObject.Potions.Resurection);
        },5000);
        clearInventory();
    }
    else {
        V.renderErrorRecipe('Votre inventaire ne vous permet pas de fabriquer une potion');
    }
}

function prepareRune(type) {
    if (JSON.stringify(RECIPES.RUNEAFFUTAGE.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))&& type === 'repairGlyph'){
        M.player_quests_objects.push(M.questObject.Runes.Affutage);
        clearInventory();
    }
    else if (JSON.stringify(RECIPES.RUNEDEREPARATION.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))&& type === 'repairGlyph'){
        M.player_quests_objects.push(M.questObject.Runes.Reparation);
        clearInventory();
    }
    else if (JSON.stringify(RECIPES.RUNEDEREPARATIONDEBIJOUX.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri)) && type === 'repairGlyph'){
        M.player_quests_objects.push(M.questObject.Runes.Bijoux);
        clearInventory();
    }
    else if (JSON.stringify(RECIPES.RUNEDEPROTECTIONDIVINE.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri)) && type === 'divineGlyph'){
        M.player_quests_objects.push(M.questObject.Runes.Divine);
        clearInventory();
    }
    else {
        V.renderErrorRecipe('Votre inventaire ne vous permet pas de fabriquer une rune');
    }
}

function clearInventory(){
    M.player_inventory =[];
}

function prepareScroll() {

    if (JSON.stringify(RECIPES.PARCHEMINDESOMEIL.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))){
        M.player_quests_objects.push(M.questObject.Parchemins.Sommeil);
        clearInventory();
    }
    else if (JSON.stringify(RECIPES.PARCHEMINAMOUR.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))){
        M.player_quests_objects.push(M.questObject.Parchemins.Amour);
        clearInventory();
    }
    else if (JSON.stringify(RECIPES.PARCHEMINDEPERSUASION.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))){
        M.player_quests_objects.push(M.questObject.Parchemins.Persuasion);
        clearInventory();
    }
    else if (JSON.stringify(RECIPES.PARCHEMINOUBLIE.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))){
        M.player_quests_objects.push(M.questObject.Parchemins.Oublie);
        clearInventory();
    }
    else if (JSON.stringify(RECIPES.PARCHEMINDECOMPETENCE.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))){
        M.player_quests_objects.push(M.questObject.Parchemins.Competence);
        clearInventory();
    }else {
        V.renderErrorRecipe('Votre inventaire ne vous permet pas de fabriquer un parchemin');
    }
}

function addRessourceToInventory(type) {
    type = type.split("-");
   if (M.player_inventory.length<=0){
       M.player_inventory.push(new Resources(type[0],type[1]));
   }else if(M.player_inventory[0].type === type[1]){
       M.player_inventory.push(new Resources(type[0],type[1]));
   }else {
       V.renderErrorRecipe('Vous ne pouvez pas mélanger différent type de resources !');
   }
}

function readBookOfRecipe(){
    M.gameState = M.READING;
    if(document.querySelector('#book-container').classList.contains('active')){
        document.querySelector('#book-container').classList.remove('active');

    }else{
        V.renderBook(M.questObject);
    }
}

function validateQuest(){
    C.manageCityInfluence();
}

function barInteraction(barNumber) {
    var pnj = M.visiblePnjs.find( (pnj) => {
        return pnj.barNumber === barNumber && pnj.waiting === true;
    });
    if(typeof pnj === 'undefined') {
        return;
    }

    M.gameState = M.READING;
    V.renderQuest(pnj, pnj.pnjInfos[1].actualQuests, pnj.pnjInfos[1].name, pnj.pnjInfos[1].actualQuests.title, pnj.pnjInfos[1].actualQuests.content, pnj.pnjInfos[1].actualQuests.objectRequested.name, pnj.pnjInfos[1].actualQuests.isQuestAccepted );
}
