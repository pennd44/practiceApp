import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

class Actions extends React.Component {
  state = {};

  doActivity = (x, y) => {
    return () => this.props.doActivity(x, y);
  };

  fight = (x, entity) => {
    return () => this.props.fight(x, entity);
  };

  render() {
    let enemies = this.props.enemies;
    return (
      <View>
        <Text>{this.props.healthDisplay(this.props.playerStats)}</Text>
        <Text>Energy: {this.props.playerStats.energyCount}</Text>
        <Text>Money: ${this.props.playerStats.moneyCount}</Text>

        {this.props.playerStats.energyCount >= 1 ? (
          <Button onPress={this.doActivity(-1, 5)} title="Wash Car" />
        ) : null}
        {this.props.playerStats.moneyCount >= 20 ? (
          <Button onPress={this.doActivity(5, -20)} title="Buy Soup" />
        ) : null}
        {this.props.playerStats.energyCount >= 15 ? (
          <Button
            onPress={this.doActivity(-15, 90)}
            title="Work Construction"
          />
        ) : null}
        {this.props.playerStats.energyCount >= 20 ? (
          <Button
            onPress={this.fight(-20, enemies.hooligans)}
            title="Fight Hooligans"
          />
        ) : null}
      </View>
    );
  }
}

export default Actions;
