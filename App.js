// @flow

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import firebase from "react-native-firebase";
import Speedometer from 'react-native-speedometer-chart'


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      speed: 0,
      error: null
    };
  }

  componentDidMount = () => {
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          speed: Math.round(position.coords.speed*3.6),
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 0,
        maximumAge: 0,
        accuracy: 0,
        distanceFilter: 0
      }
    );
  };

  componentWillUnmount = () => {
    navigator.geolocation.clearWatch(this.watchId);
  };

  render() {
    return (
      <View style={styles.container}>
        <Speedometer
            value={this.state.speed}
            totalValue={100}
            size={250}
            outerColor="#d3d3d3"
            internalColor="#ff0000"
            showText
            text={this.state.speed}
            textStyle={{ color: 'green' }}
            showLabels
            labelStyle={{ color: 'blue' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
