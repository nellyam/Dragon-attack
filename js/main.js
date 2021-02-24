let game = new Object();
const DIV = document.querySelector("#game");

function initialize() {
    game.round = 1;
    game.difficulty = requestInteger("Saisir un niveau de difficulté: \n1 -facile \n2 - normale \n 3 - difficile", 1, 3)
    
    switch(game.difficulty) {
        case 1:
            game.hpPlayer = getRandomInteger(200, 250);
            game.hpDragon = getRandomInteger(150, 200);
            break;

            case 2:
            game.hpPlayer = getRandomInteger(200, 250);
            game.hpDragon = getRandomInteger(200, 250);
            break;

            case 3:
            game.hpPlayer = getRandomInteger(150, 200);
            game.hpDragon = getRandomInteger(200, 250);
            break;
    }

    game.sword = requestInteger("Saisir votre épée: \n1 -bois \n2 - acier \n 3 - excalibur", 1, 3)

    switch(game.sword) {
        case 1:
            game.swordRation = 0.5;
            break;

        case 2:
            game.swordRation = 1;
            break;    
        
        case 3:
            game.swordRation = 1.5;
            break;    
    }

    game.armure = requestInteger("Saisir votre armure: \n1 -cuivre \n2 - fer \n 3 - magique", 1, 3);

    switch(game.armure) {
        case 1:
            game.armureRation = 1;
            break;

        case 2:
            game.armureRation = 0.75;
            break;      
    
        case 3:
            game.armureRation = 0.50;
            break;     
    
        }
    DIV.innerHTML = "<h3>Points de départ</h3>";
       showPV();
}

function computerPlayerDamagePoints() {
    let damage;
   switch(game.difficulty) {
       case 1:
       damage = getRandomInteger(25, 30)
       break;

       case 2: 
       damage = getRandomInteger(15, 20)
       break;

       case 3: 
       damage = getRandomInteger(5, 10)
       break;
   }
      return Math.floor(damage * game.swordRation);
}


function computerDragonDamagePoints() {
    let damage;
    switch(game.difficulty) {
        case 1:
        damage = getRandomInteger(10, 20)
        break;
 
        case 2: 
        case 3: 
        damage = getRandomInteger(20, 30)
        break;
    }
    return Math.floor(damage * game.armureRation);
}


function showPV() {
    DIV.innerHTML += `<table>
    <thead>
      <tr> 
        <th>Personnage</th>
        <th>PV</th>
      </tr>       
    </thead>

    <tbody>
        <tr>
            <td>Chevalier</td>
            <td>${game.hpPlayer}</td>
        </tr>
        <tr>
            <td>Dragon</td>
            <td>${game.hpDragon}</td>
     </tr>
    </tbody>
</table>`;
}


function gameLoop() {
    let speedDragon, speedPlayer, damage;

    do {
        speedDragon = getRandomInteger(10, 20); 
        speedPlayer = getRandomInteger(10, 20); 
        DIV.innerHTML += `<p>Round n ${game.round}</p>`;
          if (speedPlayer >= speedDragon) {
        // joueur qui attaque
        damage = computerPlayerDamagePoints();
        game.hpDragon -= damage;
        DIV.innerHTML +=  `<p>Vous étiez trop fort! Vous avez infligez ${damage} point de dégats</p>`;
    } else {
        // dragon qui attaque
        damage = computerDragonDamagePoints();
        game.hpPlayer -= damage;
        DIV.innerHTML +=  `<p>Le dragon est trop fort! Il vous inflige ${damage} point de dégats</p>`;
    }
    showPV();
    game.round++;
    } while( game.hpDragon > 0 && game.hpPlayer > 0)

  
}


function showWinner() {
    if(game.hpPlayer > 0) {
        DIV.innerHTML = `<article>
        <img src="img/knight.png" alt="">
        <h3>Vous avez gagné</h3>
        </article>`  + DIV.innerHTML;
    } else {
        DIV.innerHTML = `<article>
        <img src="img/dragon.png" alt=""> 
        <h3>Le dragon a gagné</h3>
        </article>` + DIV.innerHTML;
    }
}



initialize();
gameLoop();
showWinner();
