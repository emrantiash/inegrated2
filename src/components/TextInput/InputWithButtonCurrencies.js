import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, TextInput, TouchableHighlight, Text, TouchableOpacity, Image, AsyncStorage, ToastAndroid } from 'react-native';
import Alldata from '../../data/flag';
import styles from './styles';
import SvgUri from 'react-native-svg-uri';
import { Toast } from 'native-base';
const InputWithButtonCurrencies = (props) => {
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <View>
          {props.ShowingStarReal &&
            <Test child={props} />
          }
        </View>
        <View>
          <TouchableOpacity onPress={props.onPress} style={{ marginLeft: 10, marginTop: 10 }}>
            <SvgUri width="40" height="40" svgXmlData={Alldata.image[props.buttonText]} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', width: '50%', paddingLeft: 10 }}>
          <TouchableOpacity onPress={props.onPost} style={{ flexDirection: 'column', marginTop: 12 }}>
            <Text style={{ color: '#ffffff', fontSize: 16, textAlign: 'left' }}>{props.buttonText}</Text>
            <Text style={{ color: '#ffffff', fontSize: 14, textAlign: 'left' }}>{Alldata.fullname[props.buttonText]}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '25%', paddingTop: 19 }}>
          <Text style={{ fontSize: 18, color: '#D3BC3F', textAlign: 'right' }}>{parseFloat(props.value).toFixed(4)}</Text>
        </View>
      </View>

      {props.isHiddenBox && props.isKeyis == props.NowBoxValue && (

        <View style={{ height: 50 }}>
          <View style={styles.hairline1}></View>
          <View uniqueID={props.isKeyis} style={{ flexDirection: 'row', }}>
            <View style={{ width: '33%', alignItems: 'center', borderColor: '#1A273C', borderRightWidth: 2, height: 48, paddingTop: 10 }}>
              <TouchableOpacity onPress={props.onDelete}>
                <Text style={{ textAlign: 'center', fontSize: 18, color: '#D6D6D6' }}>Delete</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '33%', alignItems: 'center', borderColor: '#1A273C', borderRightWidth: 2, height: 48, paddingTop: 10 }}>
              <TouchableOpacity onPress={props.handleSwapCurrency}>
                <Image source={require('../../routes/Images/downUp.png')} />
              </TouchableOpacity>
            </View>
            <View style={{ width: '33%', alignItems: 'center', height: 48, paddingTop: 10 }}>
              <Text style={{ textAlign: 'center', fontSize: 18, color: '#D6D6D6' }}>Graph </Text>
            </View>

          </View>
        </View>

      )
      }

      <View style={styles.hairline}></View>


    </View>
  );
};

InputWithButtonCurrencies.propTypes = {
  onPress: PropTypes.func,
  buttonText: PropTypes.string,
  editable: PropTypes.bool,
};



const star = require('../../routes/Images/star.png');
const newStar = require('../../routes/Images/newStar.png');
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: star,
      // show: false,
      // props: '',
    }
    // this.toogleDiv = this.toogleDiv.bind(this)
  }



  Load_New_Image = () => {
    let newstar = newStar

    AsyncStorage.getItem("DeviceID")
      .then(res => JSON.parse(res))
      .then(array => {
        console.log(array[0]);

        let newObject = {
          qCurrency: this.props.child.buttonText,
          ResulT: this.props.child.value
        };

        let found = false;
        for (let i = 0; i < array.length; i++) {
          if (array[i].qCurrency === newObject.qCurrency) {
            found = true;
          }
        }
        !found && array.push(newObject);
        AsyncStorage.setItem("DeviceID", JSON.stringify(array)).then((res) => {
          ToastAndroid.show('Data save successfully', ToastAndroid.SHORT)
          console.log(array)
        });
        console.log(array);

      }).catch(error => {
        console.log(error);
        let newArray = [
          {
            qCurrency: this.props.child.buttonText,
            ResulT: this.props.child.value
          }];
        AsyncStorage.setItem("DeviceID", JSON.stringify(newArray)).then((res) => {
          ToastAndroid.show('Data save successfully', ToastAndroid.SHORT)
          console.log(newArray)
        });
      })

    // let newArray = [
    //   {
    //     qCurrency: this.props.child.buttonText,
    //     ResulT: this.props.child.value
    //   }];

    // AsyncStorage.setItem("DeviceID", JSON.stringify(newArray)).then((res) => {
    //   ToastAndroid.show('Data save successfully', ToastAndroid.SHORT)
    //   console.log(newArray)
    // });
    this.setState({ imageURL: newstar })


  }



  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.Load_New_Image} style={{ marginLeft: 10, marginTop: 19 }}>
          <Image source={this.state.imageURL}
            style={{ height: 21, width: 22 }} />
        </TouchableOpacity>
      </View>
    )
  }
}






export default InputWithButtonCurrencies;


