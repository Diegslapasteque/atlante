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
        M.player_quests_objects.push(M.questObject.Potions.Resurection);
        console.log('Succes');
        clearInventory();
    }
}

function prepareRune(type) {
    if (JSON.stringify(RECIPES.RUNEAFFUTAGE.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))){
        console.log('Succes');
        clearInventory();
    }
    else if (JSON.stringify(RECIPES.RUNEDEREPARATION.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))){
        console.log('Succes');
        clearInventory();
    }
    else if (JSON.stringify(RECIPES.RUNEDEREPARATIONDEBIJOUX.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri)) && type === 'repairGlyphe'){
        console.log('Succes bijoux');
        clearInventory();
    }
    else if (JSON.stringify(RECIPES.RUNEDEPROTECTIONDIVINE.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri)) && type === 'divineGlyphe'){
        console.log('Succes');
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
        console.log('Succes');
        clearInventory();
    }
    if (JSON.stringify(RECIPES.PARCHEMINAMOUR.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))){
        console.log('Succes');
        clearInventory();
    }
    if (JSON.stringify(RECIPES.PARCHEMINDEPERSUASION.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))){
        console.log('Succes');
        clearInventory();
    }
    if (JSON.stringify(RECIPES.PARCHEMINOUBLIE.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))){
        console.log('Succes');
        clearInventory();
    }
    if (JSON.stringify(RECIPES.PARCHEMINDECOMPETENCE.sort(tri)) == JSON.stringify(M.player_inventory.sort(tri))){
        console.log('Succes');
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
    V.renderBook(M.questObject);
}

function validateQuest(){
    C.manageCityInfluence();
}

function barInteraction(barNumber) {
    console.log(barNumber);
}
