/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  NativeModules
} from 'react-native';

import Button from 'react-native-button'
const BackgroundTask = NativeModules.Background;
export default class MultiThreadingAndroid extends Component {

  componentWillMount() {
    this.setState(
      {
        backgroundTask: "Not Started",
        doSomething: 0,
        count: 0
      }
    );
    
    var currectClassObject = this;
    DeviceEventEmitter.addListener('backgroundTaskEvent',(e)=>{
      console.log("here");
        currectClassObject.setState({backgroundTask: e.status})
        });
  }

  performTaskOnMainThread = () => {
    let count = this.state.count;
    count++;
    this.setState({ count: count});
  }

  startbackgroundTask = () => {
    BackgroundTask.callNativeFunction();
  }



  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.startbackgroundTask}>
          Run Task
          </Button>
        <Text style={{marginTop:10,marginBottom:100}}>
          background task status : {this.state.backgroundTask}
        </Text>

        <Button onPress={this.performTaskOnMainThread}>
          MainThreadButton
              </Button>
        <Text style={{marginTop:10,marginBottom:100}}>
          the count click of main thread button is : {this.state.count}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MultiThreadingAndroid', () => MultiThreadingAndroid);
