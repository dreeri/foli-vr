import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  VrButton,
} from 'react-vr';

export default class pong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'red',
            station : 1,
            stationInfo: [],
        }

        this.convertUnixTimeToDate = this.convertUnixTimeToDate.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    convertUnixTimeToDate(unixTime) {
        console.log(unixTime);
        var a = new Date(unixTime * 1000);
        var hour = a.getHours();
        var min = a.getMinutes();
        var time = hour + ':' + min;
        console.log(time);
        return time;
    }

    fetchData() {
        fetch('http://data.foli.fi/siri/sm/1')
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            console.log(res);
            this.setState((prevState) => ({ stationInfo: (res.result[0]) }));
        }).catch((error)=>{
                console.log("Api call error");
                console.log(error.message);
        })
    }

    render() {
    return (
      <View>
        <Pano source={asset('background.jpg')}
        />
        <Text
          style={{
            backgroundColor: '#242424af',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}>
          {this.state.stationInfo.expecteddeparturetime != undefined ? this.convertUnixTimeToDate(this.state.stationInfo.expecteddeparturetime) : "empty"} Lentoasema{"\n"}11:58
        </Text>

        <VrButton
            style={{
                height:0.4,
                paddingTop: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
                borderStyle: 'solid',
                borderColor: 'red',
                borderWidth: 0.01,
                layoutOrigin: [0.3, 0]
            }}
            onClick={()=>this.fetchData()}>
            <Text
                    style= {{
                            backgroundColor: this.state.color,
                            fontSize: 0.8,
                            fontWeight: '400',
                            layoutOrigin: [0.5, 0.5],
                            paddingLeft: 0.2,
                            paddingRight: 0.2,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            transform: [{translate: [0, 0, -3]}],
                        }}>
                    Nappi
            </Text>
        </VrButton>
      </View>
    );
  }
};

AppRegistry.registerComponent('pong', () => pong);
