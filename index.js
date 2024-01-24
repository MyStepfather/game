class Hero {
  constructor(name) {
    this.name = name;
    this.health = 10;
    this.level = 1;
    this.power = 3;
  }

  getName() {
    return this.name;
  }
  getHealth() {
    return this.health;
  }
  getLevel() {
    return this.level;
  }
  getDamage(damage) {
    this.health -= damage;
  }
  setHealth(health) {
    this.health = health;
  }
  setLevel(level) {
    this.level = level;
  }
  giveDamage(hero, damage) {
    hero.getDamage(damage);
  }
}

class Story {
  text;

  setText(text) {
    this.text = text;
  }
}

class Enemy {
  constructor(name, health, power) {
    this.name = name;
    this.health = health;
    this.power = power;
  }

  getName() {
    return this.name;
  }
  getHealth() {
    return this.health;
  }
  getPower() {
    return this.power;
  }
  setHealth(health) {
    this.health = health;
  }
  giveDamage(enemy, damage) {
    enemy.getDamage(damage);
  }
  getDamage(damage) {
    this.health -= damage;
  }
}

const heroNameHTML = document.querySelector(".create-hero");
const heroNameInput = heroNameHTML.querySelector(".hero-name");
const heroNameButton = heroNameHTML.querySelector("button");
const actionButtons = document.querySelector(".actions");
const attackButton = actionButtons.querySelector(".attack");
const leaveButton = actionButtons.querySelector(".leave");
const logsArea = document.querySelector(".logs-area");
const enemyNames = [
  "Сибма",
  "Рыжий",
  "Пират",
  "Санта Сасанта",
  "Глеб",
  "Чипи-Чапа",
];
let hero;

// const battle = (enemyName, heroName, damage, health) => {
//     textsForLog = {
//         attakToHero: Противник ${enemyName} наносит ${damage} ед. урона,
//         attakToEnemy: ${heroName} наносит ${damage} ед. урона ${enemyName},
//         remainHealth: У {}
//     }
// }

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // Максимум и минимум включаются
};

const getValue = (input) => {
  let value = input.value;
  input.value = "";
  return value;
};

const insertToLog = (text) => {
  let row = document.createElement("p");
  row.innerHTML = text;
  logsArea.appendChild(row);
};

const createEnemy = () => {
  let health, power, name;
  health = getRandomIntInclusive(3, 10);
  power = getRandomIntInclusive(2, 5);
  name = enemyNames[getRandomIntInclusive(1, enemyNames.length - 1)];
  return new Enemy(name, health, power);
};

const actionBattle = (enemy, hero) => {
  let text;
  function enemyTurn() {
    console.log(hero);
    enemy.giveDamage(hero, enemy.power);
    console.log(hero);
    if (hero.health > 0) {
      text = `${enemy.name} атакует и наносит ${enemy.power} ед. урона по ${hero.name}`;
      insertToLog(text);
      setTimeout(heroTurn, 2000);
    } else {
      text = `${enemy.name} наносит фатальный урон и убивает ${hero.name}`;
      insertToLog(text);
    }
  }
  function heroTurn() {
    console.log(enemy);
    hero.giveDamage(enemy, hero.power);
    console.log(enemy);
    if (enemy.health > 0) {
      text = `${hero.name} атакует и наносит ${hero.power} ед. урона по ${enemy.name}`;
      insertToLog(text);
      setTimeout(enemyTurn, 2000);
    } else {
      text = `${hero.name} совершает лютую атаку по ${enemy.name} и убивает его!`;
      insertToLog(text);
    }
  }
  enemyTurn();
};

const actionLeave = () => {};

function start() {
  heroNameButton.addEventListener("click", () => {
    const heroName = getValue(heroNameInput);
    hero = new Hero(heroName);
    let greeting = `Приветствую тебя, ${hero.name}!\nТы только что появился в этом мире.\n\nТвои статы:\nУровень: ${hero.level}\nЗдоровье: ${hero.health}`;

    insertToLog(greeting);
  });
  const smurfik = createEnemy();
  attackButton.addEventListener("click", () => {
    actionBattle(smurfik, hero);
  });
  leaveButton.addEventListener("click", actionLeave);
}

start();
