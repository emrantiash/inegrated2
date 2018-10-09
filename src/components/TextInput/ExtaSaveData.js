import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Alldata from '../../data/flag';
import styles from './styles';
import SvgUri from 'react-native-svg-uri';

const ExtaSaveData = (props) => {
    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={()=>props.change(props)}>
                    <Image source={require('../../routes/Images/newStar.png')}
                        style={styles.extraImage} />
                </TouchableOpacity>
                <View>
                    <TouchableOpacity onPress={props.onPress} style={styles.ExtraTouch}>
                        <SvgUri width="40" height="40" svgXmlData={Alldata.image[props.buttonText]} />
                    </TouchableOpacity>
                </View>
                <View style={styles.ExtraView1}>
                    <TouchableOpacity style={styles.ExtraTouch1}>
                        <Text style={styles.ExtraText1}>{props.buttonText}</Text>
                        <Text style={styles.ExtraText2}>{Alldata.fullname[props.buttonText]}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ExtraView2}>
                    <Text style={styles.ExtraText3}>{parseFloat(props.value).toFixed(4)}</Text>
                </View>
            </View>
            <View style={styles.hairline}></View>
        </View>
    );
};

ExtaSaveData.propTypes = {
    onPress: PropTypes.func,
    buttonText: PropTypes.string,
    editable: PropTypes.bool,
};

export default ExtaSaveData;