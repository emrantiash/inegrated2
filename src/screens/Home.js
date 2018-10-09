import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AsyncStorage, Dimensions, View, Image, BackHandler, Alert, StyleSheet, ScrollView, TouchableOpacity, Text, ToastAndroid, NetInfo } from 'react-native';
import { Icon, Container, Header, Content, Footer, Body, Title } from 'native-base';
import InputWithButton from '../components/TextInput/InputWithButton';
import InputWithButtonCurrencies from '../components/TextInput/InputWithButtonCurrencies';
import { changeCurrencyAmount, getInitialConversion, swapCurrency, refreshCurrency, ShowBoxToggle, Delete_Currency_List } from '../actions/currencies';
import Alldata from '../data/flag';

var { height, width } = Dimensions.get('window');

class Home extends Component {
  constructor(props) {
    super(props);
    this.count = 0;
    this.state = {
      defaultValueCurrency: 1,
      srefresh: false,
      isConnected: true,
      newState: null,
      loading: false
    };
  }

  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    amount: PropTypes.number,
    conversionRate: PropTypes.number,
    lastConvertedDate: PropTypes.object,
    isFetching: PropTypes.bool,
  };

  handleConnectivityChange = (isConnected) => {
    console.log("Connection is " + isConnected)
    if (isConnected) {
      this.setState({
        isConnected
      });
      this.props.dispatch(getInitialConversion());
    }
    else {
      this.setState({
        isConnected
      })
      Alert.alert("Connection error!",
        "Internet is disconnected\nPlease connect to internet for full features",
        [
          { text: 'OK', onPress: () => this.loadFromDatabase() }
          //{text: 'OK', onPress: () => null}
        ],
        { cancelable: false })
    }
  };

  loadFromDatabase() {
    //alert("loadFromDatabase")
    this.setState({
      loading: true
    })
    AsyncStorage.getItem("Converter@State").then(res => {
      let newState = JSON.parse(res);
      this.setState({
        newState: newState,
        loading: false
      })
      //alert(this.state.newState.currencies.baseCurrency)
      //console.log("Retrived from database " + this.state.newState.currencies.baseCurrency)
    }).catch(err => {
      Alert.alert("Database Error!",
        "Fetching Offline Data from Database Failed",
        [
          //{ text: 'OK', onPress: () => this.loadFromDatabase() }
          { text: 'OK', onPress: null }
        ],
        { cancelable: false })
    })
  }

  handleChangeText = (text) => {
    this.setState({
      defaultValueCurrency: text
    })
    text != '' ? this.props.dispatch(changeCurrencyAmount(text)) : console.log('plan working');
  };

  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Base Currency', type: 'base' });
  };

  handlePressQuoteCurrency = (key, C_currency) => {
    console.log('New Currency', C_currency)
    let value = key;
    let data = C_currency
    this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency', type: 'quote', key: value, C_currency: data});
    // console.log(key);
  };

  ShowHiddenBox = (key) => {
    this.props.dispatch(ShowBoxToggle(key));
  }

  handPresstoDeletCurrency = (key, value) => {
    console.log('hit delete button  is: ', key, value);
    this.props.dispatch(Delete_Currency_List(key, value))
  };

  handlePressAddCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency', type: 'add', currentArray: this.props.valueArray });
  };

  handleFav = () => {
    AsyncStorage.getItem('DeviceID').then(res => {
      const resultArray = JSON.parse(res)
      if (!resultArray || resultArray.length === 0) {
        alert('There is no data on database')
      }
      else {
        this.props.navigation.navigate('favScreen');
      }
    })
  };

  handleSwapCurrency = (key, value, C_Base, Array_dat) => {
    this.props.dispatch(swapCurrency(key, value, C_Base, Array_dat));
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillMount() {
    // this.props.valueArray.length === 0 ? this.props.dispatch(getInitialConversion()) : this.props.dispatch(getInitialConversion())  
    this.props.dispatch(getInitialConversion());
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  backPressed = () => {
    if (this.count == 1) {
      BackHandler.exitApp();
    }
    else {
      ToastAndroid.show('Press AGAIN to Exit', ToastAndroid.SHORT);
      if (ToastAndroid.SHORT == 0) {
        this.count = this.count + 1;
      }
      else {
        console.log('ToastAndroid not press short');
      }
    }
    return true;
  }

  refreshLocker = () => {
    let val = this.state.refresh;
    this.setState({
      defaultValueCurrency: 1,
      refresh: !val
    })
    this.props.dispatch(refreshCurrency());
    ToastAndroid.show('Refreshing...', ToastAndroid.SHORT);
  }

  static navigationOptions = {
    drawerIcon: (
      <Image source={require('../routes/Images/converter.png')}
        style={{ height: 24, width: 24 }} />
    )
  }

  render() {    
      let quotePrice = (this.props.amount * this.props.rate).toFixed(2);
      let ourResult, isresult;
      this.props.addChangeData.length === 0 ? ourResult = this.props.valueArray : ourResult = this.props.addChangeData
      this.props.addChangeData.length === 0 ? isresult = false : isresult = true

      if (this.props.addChangeData.length !== 0) {
        newArray = ourResult.map((item, key) => {
          return (
            <InputWithButtonCurrencies key={key}
              editable={false}
              ShowingStarReal={this.props.ShowingStarReal}
              buttonText={item[0].qCurrency}
              ShowingStarReal={this.props.ShowingStarReal}
              onPress={this.handlePressQuoteCurrency.bind(key, key, item[0].qCurrency)}
              onPost={this.ShowHiddenBox.bind(key, key)}
              onDelete={this.handPresstoDeletCurrency.bind(key, key, item[0].qCurrency)}
              value={item[1].ResulT}
              isHiddenBox={this.props.isHiddenBox}
              isKeyis={key}
              NowBoxValue={this.props.NowBoxValue}
              handleSwapCurrency={this.handleSwapCurrency.bind(key, key, item[0].qCurrency, this.props.baseCurrency,  this.props.addChangeData)}
            />
          );
        })
      }
      else {
        newArray = <Text></Text>
      };
      return (
        <Container>
          <Header style={{ paddingRight: 15, paddingLeft: 15, backgroundColor: '#171b21' }}>
            <Content>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Icon ios='ios-menu' android="md-menu" style={{ fontSize: 50, color: '#ffffff' }}
                  onPress={() => this.props.navigation.openDrawer()} />
                <Body>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}>
                      <Title>Currency Converter</Title>
                    </View>
                    <View>
                      <TouchableOpacity onPress={this.refreshLocker} style={{ alignSelf: 'flex-end', marginLeft: 90, marginTop: 5 }}>
                        <Image source={require('../routes/Images/arrows.png')}
                          style={{ height: 20, width: 20 }} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Body>
              </View>
            </Content>
          </Header>

          <Content>
            <View style={styles.container}>
              <ScrollView>
                <InputWithButton
                  buttonText={this.props.baseCurrency}
                  onPress={this.handlePressBaseCurrency}
                  // defaultValue={this.props.currenTinputValue.toString()}
                  defaultValue={this.state.defaultValueCurrency.toString()}
                  keyboardType="numeric"
                  onChangeText={this.handleChangeText}
                />

                <View style={styles.subcontainer}>
                  {this.props.ShowourView &&
                    newArray
                  }
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={this.handlePressAddCurrency} >
                      <Text style={styles.bellowText}>Add More Currencies</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Footer style={{ backgroundColor: '#1F2F46' }}>
                  <TouchableOpacity onPress={this.handleFav}>
                    <Image source={require('../routes/Images/newStar.png')}
                      style={{ height: 21, width: 22, marginLeft: 50, marginBottom: 5, marginTop: 5 }} />
                    <Text style={{ color: '#838790', fontSize: 15 }}>Selected Currency</Text>
                  </TouchableOpacity>
                </Footer>
              </ScrollView>
            </View>
          </Content>
        </Container>
      );
    }    
}


const styles = StyleSheet.create({
  connectingContainer:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1B2129',
    margin: 0,
    padding: 0,
    height:'100%'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1B2129',
    minHeight: 610,
    margin: 0,
    padding: 0,
  },
  subcontainer: {
    flex: 1,
    backgroundColor: '#22324C',
    marginTop: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginLeft: 0,
    minHeight: 610,
  },
  hairline1: {
    backgroundColor: '#1B2A41',
    height: 1,
    width: '100%',
    marginTop: 20,
  },
  hairline2: {
    backgroundColor: '#1B2A41',
    width: '100%',
    flexDirection: 'row'
  },
  text: {
    fontSize: 17,
    padding: 10,
    color: '#838790',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 60
  },
  text1: {
    fontSize: 17,
    padding: 10,
    color: '#838790',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 60
  },
  bellowText: {
    color: '#838790',
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10
  }
});

const mapStateToProps = (state) => {
  const baseCurrency = state.currencies.baseCurrency;
  const quoteCurrency = state.currencies.quoteCurrency;
  const conversionResult = state.currencies.conversions_quote;
  const rate = state.currencies.conversions_base * state.currencies.conversions_quote;
  const actionName = state.currencies.actionName;
  const valueArray = state.currencies.valueArray;
  const addChangeData = state.currencies.addChangeData;
  const currenTinputValue = state.currencies.currenTinputValue;
  const ShowingStarReal = state.currencies.ShowingStarReal;
  const isHiddenBox = state.currencies.isHiddenBox;
  const NowBoxValue = state.currencies.NowBoxValue;
  const ShowourView = state.currencies.ShowourView;
  const amount = state.currencies.amount;

  return {
    NowBoxValue,
    isHiddenBox,
    ShowingStarReal,
    baseCurrency,
    quoteCurrency,
    amount,
    rate,
    conversionResult,
    actionName,
    valueArray,
    addChangeData,
    currenTinputValue,
    ShowourView
  };
};

export default connect(mapStateToProps)(Home);