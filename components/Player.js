import React from "react";
import Actions from "./Actions";
import Battle from "./Battle";
import { StyleSheet, Text, View } from "react-native";

class Player extends React.Component {
  state = {
    stats: {
      currentHealth: 10,
      maxHealth: 10,
      attack: 4,
      defense: 2,
      energyCount: 10,
      moneyCount: 0,
    },
    fighting: "none",
    enemies: {
      hooligans: {
        name: "Hooligans",
        currentHealth: 10,
        maxHealth: 10,
        attack: 3,
        defense: 1,
        moneyOnwin: 200,
        moneyOnloss: -100,
      },
    },
  };

  healthDisplay = (entityStats) => {
    return "HP: " + entityStats.currentHealth + "/" + entityStats.maxHealth;
  };

  doActivity = (energyChange, moneyChange) => {
    let newEnergyCount = this.state.stats.energyCount + energyChange;
    let newMoneyCount = this.state.stats.moneyCount + moneyChange;
    this.setState({
      stats: {
        ...this.state.stats,
        energyCount: newEnergyCount,
        moneyCount: newMoneyCount,
      },
    });
  };

  fight = (energyChange, entity) => {
    let newEnergyCount = this.state.stats.energyCount + energyChange;
    this.setState({
      fighting: entity,
      stats: { ...this.state.stats, energyCount: newEnergyCount },
    });
  };

  attack = (entity) => {
    let enemy = this.state.enemies[entity.name.toLowerCase()];
    let player = this.state.stats;
    let newEnemyHealth = enemy.currentHealth;
    let newPlayerHealth = player.currentHealth;
    if (player.attack - enemy.defense < enemy.currentHealth) {
      newEnemyHealth -= player.attack - enemy.defense;
    } else {
      newEnemyHealth = 0;
    }
    if (enemy.attack - player.defense < player.currentHealth) {
      newPlayerHealth -= enemy.attack - player.defense;
    } else {
      newPlayerHealth = 0;
    }

    this.setState({
      stats: { ...this.state.stats, currentHealth: newPlayerHealth },
      enemies: {
        ...this.state.enemies,
        [enemy.name.toLowerCase()]: { ...enemy, currentHealth: newEnemyHealth },
      },
    });
    console.log(this.state.stats.currentHealth);
    console.log(newEnemyHealth);
  };

  goBack = () => {
    this.setState({
      fighting: "none",
    });
  };

  loss = (enemy) => {
    this.setState({
      stats: {
        ...this.state.stats,
        moneyCount: this.state.stats.moneyCount - enemy.moneyOnloss,
      },
    });
  };
  win = (enemy) => {
    let newMoneyCount = this.state.stats.moneyCount + enemy.moneyOnwin;
    this.setState({
      stats: {
        ...this.state.stats,
        moneyCount: newMoneyCount,
      },
    });
  };

  finishBattle(enemy, won) {
    let enemyMoney;
    won ? (enemyMoney = enemy.moneyOnwin) : (enemyMoney = enemy.moneyOnloss);
    let newMoneyCount = this.state.stats.moneyCount + enemyMoney;
    this.setState({
      stats: {
        ...this.state.stats,
        moneyCount: newMoneyCount,
      },
      fighting: "none",
    });
  }

  render() {
    return (
      <View>
        {this.state.fighting === "none" ? (
          <Actions
            playerStats={this.state.stats}
            healthDisplay={this.healthDisplay}
            doActivity={this.doActivity}
            fight={this.fight}
            enemies={this.state.enemies}
          />
        ) : (
          <Battle
            playerStats={this.state.stats}
            enemy={this.state.fighting}
            healthDisplay={this.healthDisplay}
            attack={this.attack}
            enemies={this.state.enemies}
            goBack={this.goBack}
            finishBattle={this.finishBattle}
          />
        )}
      </View>
    );
  }
}

export default Player;
