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
        M.player_quests_objects.push(M.questObject.Potions.Soin);
        console.log('Succes');
        clearInventory();
    }
    if ((RECIPES.POTIONDEGUERISON.length == M.player_inventory.length) && (JSON.stringify(RECIPES.POTIONDEGUERISON.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri)))) {
        M.player_quests_objects.push(M.questObject.Potions.Guerison);
        console.log('Succes');
        clearInventory();
    }
    if ((RECIPES.POTIONDEFORCE.length == M.player_inventory.length) && (JSON.stringify(RECIPES.POTIONDEFORCE.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri)))) {
        M.player_quests_objects.push(M.questObject.Potions.Force);
        console.log('Succes');
        clearInventory();
    }
    if ((RECIPES.POTIONDECHANCE.length == M.player_inventory.length) && (JSON.stringify(RECIPES.POTIONDECHANCE.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri)))) {
        M.player_quests_objects.push(M.questObject.Potions.Chance);
        console.log('Succes');
        clearInventory();
    }
    if ((RECIPES.POTIONDERESURECTION.length == M.player_inventory.length) && (JSON.stringify(RECIPES.POTIONDERESURECTION.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri)))) {
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
}

function prepareRune(type) {
    console.log(type)
    if (JSON.stringify(RECIPES.RUNEAFFUTAGE.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))){
        M.player_quests_objects.push(M.questObject.Runes.Affutage);
        clearInventory();
    }
    else if (JSON.stringify(RECIPES.RUNEDEREPARATION.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))){
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
    if(!M.player_inventory.find(function (e) {return e.name == 'parchemin';})){
        V.renderErrorRecipe('Il vous manque un parchemin');
        return;
    }

    if (JSON.stringify(RECIPES.PARCHEMINDESOMEIL.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))){
        M.player_quests_objects.push(M.questObject.Parchemins.Sommeil);
        clearInventory();
    }
    if (JSON.stringify(RECIPES.PARCHEMINAMOUR.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))){
        M.player_quests_objects.push(M.questObject.Parchemins.Amour);
        clearInventory();
    }
    if (JSON.stringify(RECIPES.PARCHEMINDEPERSUASION.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))){
        M.player_quests_objects.push(M.questObject.Parchemins.Persuasion);
        clearInventory();
    }
    if (JSON.stringify(RECIPES.PARCHEMINOUBLIE.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))){
        M.player_quests_objects.push(M.questObject.Parchemins.Oublie);
        clearInventory();
    }
    if (JSON.stringify(RECIPES.PARCHEMINDECOMPETENCE.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))){
        M.player_quests_objects.push(M.questObject.Parchemins.Competence);
        clearInventory();
    }
}

function addRessourceToInventory(type) {
    type = type.split("-");
   if (M.player_inventory.length<=0){
       M.player_inventory.push(new Resources(type[0],type[1]));
   }else if(M.player_inventory[0].type === type[1]){
       M.player_inventory.push(new Resources(type[0],type[1]));
   }else {
       console.log('Error : Resources type doesn\'t match');
   }
}

function readBookOfRecipe(){
    M.gameState = M.READING;
    V.renderBook(M.questObject);
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
