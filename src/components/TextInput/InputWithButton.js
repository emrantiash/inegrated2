import PropTypes from 'prop-types';
import React from 'react';
import { View, TextInput, TouchableHighlight, Text, Image, TouchableOpacity } from 'react-native';
import Svg,{
  Circle
} from 'react-native-svg';

import SvgUri from 'react-native-svg-uri';

import styles from './styles';
import Alldata from '../../data/flag';


const InputWithButton = (props) => {
  return (
    // <View style={styles.container}>
    //   <TouchableHighlight
    //     onPress={props.onPress}
    //     style={styles.buttonContainer}
    //     // underlayColor={underlayColor}
    //   >
    //     <Text style={styles.buttonText}>{props.buttonText}</Text>
    //   </TouchableHighlight>
    //   <View style={styles.separator} />
    //   <TextInput style={styles.input} underlineColorAndroid="transparent" {...props} />
    // </View>
    <View style={{ flexDirection: 'row' }}>

        <TouchableOpacity onPress={props.onPress} style={{ position: 'absolute', margin: 20 }}>
          <SvgUri width="40" height="40" svgXmlData={Alldata.image[props.buttonText]} />
        </TouchableOpacity>

      <View style={{ flex: 4 }}>
        <TouchableOpacity onPress={props.onPress} style={{ marginLeft: 80, marginTop: 30 }}>
          <Text style={{ color: '#ffffff', fontSize: 15 }}>{Alldata.fullname[props.buttonText]}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 2, marginTop: 28 }}>
        <Text style={{ color: '#ffffff', fontSize: 16 }}>{props.buttonText}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: '#ffffff', fontSize: 22, marginTop: 10 }}>{Alldata.character[props.buttonText]}</Text>
          <TextInput
            keyboardType="numeric"
            style={{ backgroundColor: '#1B2129', color: '#ffffff', fontSize: 22,  flex: 1 }} {...props} 
            value={props.defaultValue}
          /> 
        </View>
      </View>       
    </View>
  );
};

InputWithButton.propTypes = {
  onPress: PropTypes.func,
  buttonText: PropTypes.string,
  editable: PropTypes.bool,

  ///
};

export default InputWithButton;