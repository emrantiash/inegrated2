import React, { Component } from 'react';
import { FlatList, StatusBar, View, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeBaseCurrency, changeQuoteCurrency, addnewCurrenyResult } from '../actions/currencies';

import ListItem from '../components/List/ListItems';
import Separator from '../components/List/Separator';
import currencies from '../data/currencies';

import { Icon, Button, Container, Header, Content, Left, Body, Title } from 'native-base';

// const TEMP_CURRENT_CURRENCY = 'CAD';

class CurrencyList extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
  };

  handlePress = (currency) => {
    const { type } = this.props.navigation.state.params;
    if (type === 'base') {
      this.props.dispatch(changeBaseCurrency(currency));
    } else if (type === 'quote') {
      console.log('New Currency is :', this.props.navigation.state.params.C_currency)
      this.props.dispatch(changeQuoteCurrency(currency, this.props.navigation.state.params.key, this.props.navigation.state.params.C_currency));
    }else if (type === 'add') {
      this.props.dispatch(addnewCurrenyResult(currency));
    }else{
      console.log('other type unknown');
    }

    this.props.navigation.goBack(null);
  };

 

  render() {
    
    let comparisonCurrency = this.props.baseCurrency;
    if (this.props.navigation.state.params.type === 'quote') {
      comparisonCurrency = this.props.quoteCurrency;
    }

    return (
      <Container>
        <Content>
          <View style={{ flex: 1 }}>
            <StatusBar translucent={false} barStyle="light-content" />
            <FlatList
              data={this.props.dataItemLoaded}
              renderItem={({ item }) => (
                this.props.navigation.state.params.type == 'base' ? [(
                  item != this.props.quoteCurrency ? <ListItem
                  key={item}
                  text={item}
                  selected={item === comparisonCurrency}
                  onPress={() => this.handlePress(item)} /> : console.log("Selected", comparisonCurrency) 
                )] : [(
                  item != this.props.baseCurrency ? <ListItem
                  key={item}
                  text={item}
                  selected={item === comparisonCurrency}
                  onPress={() => this.handlePress(item)} /> : console.log("Selected", comparisonCurrency)
                )]
               
              )
              }
              keyExtractor={item => item}
              ItemSeparatorComponent={Separator}
            />
          </View>
        </Content>
      </Container>
    );
  }
}



const mapStateToProps = state => ({
  baseCurrency: state.currencies.baseCurrency,
  quoteCurrency: state.currencies.quoteCurrency,
  dataItemLoaded: state.currencies.dataItemLoaded
});

export default connect(mapStateToProps)(CurrencyList);