function tri(a,b)
{
    if (a.name < b.name) return -1;
    else if (a.name == b.name) return 0;
    else return 1;
}

function preparePotion() {
    if(!M.player_inventory.find(function (e) {return e.name == 'fioleVide';})){
        console.log('nofiole');
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
    console.log(type);
}

function clearInventory(){
    M.player_inventory =[];
}

function prepareScroll() {
    if(!M.player_inventory.find(function (e) {return e.name == 'parchemin';})){
        console.log('noscroll');
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
       //M.player_inventory.push(new Ressources(type[0],type[1]));
       M.player_inventory.push(new Ressources('parchemin','scroll'));
       M.player_inventory.push(new Ressources('incantationDeSomeil','scroll'));
   }else if(M.player_inventory[0].type == type[1]){
       M.player_inventory.push(new Ressources(type[0],type[1]));
   }else {
       console.log('Error : Ressources type doesn\'t match');
   }
}