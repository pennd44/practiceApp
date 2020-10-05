import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

class Battle extends React.Component {
  state = {};
  attack = (enemy) => {
    return () => this.props.attack(enemy);
  };
  goBack = () => {};

  finishBattle = (enemy, won) => {
    return () => this.props.finishBattle(enemy, won);
  };
  render() {
    let enemy = this.props.enemies[this.props.enemy.name.toLowerCase()];
    let player = this.props.playerStats;
    return (
      <View>
        <Text>You</Text>
        <Text>{this.props.healthDisplay(player)}</Text>
        <Text>{enemy.name}</Text>
        <Text>{this.props.healthDisplay(enemy)}</Text>
        {player.currentHealth === 0 ? (
          <Button
            onPress={
              this.props.goBack
              // finishBattle(enemy, false)
            }
            title="Go back"
          />
        ) : enemy.currentHealth === 0 ? (
          <Button
            onPress={
              this.props.goBack
              //   this.finishBattle(enemy, true)
            }
            title="Go back"
          />
        ) : (
          <View>
            <Button onPress={this.attack(enemy)} title="Attack" />
            <Button onPress={this.props.goBack} title="Run" />
          </View>
        )}
      </View>
    );
  }
}

export default Battle;
