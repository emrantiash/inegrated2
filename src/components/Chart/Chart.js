import React, { Component } from 'react';
import { View, TouchableOpacity, Image, BackHandler, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { Icon, Container, Header, Content } from 'native-base'
import VectorIcon from 'react-native-vector-icons/FontAwesome';
import MenuItems from "./MenuItems/MenuItems"
import MenuItemsSingle from "./MenuItemsSingle/MenuItemsSingle"
import ChartType from './ChartType'
import ChartInterval from './ChartInterval'
import HighChart from './HighChart/HighChart'
import Style from './Styles'

//Backend Logics Coded By Manal @16 September, 2018

class Chart extends Component {
    constructor(props) {
        super(props);

        const isPortrait = () => {
            const dim = Dimensions.get('screen');
            return dim.height >= dim.width;
        };

        this.state = {
            selectedQuote: "EURUSD",
            selectedChartType: "candlestick",
            selectedIntervalType: "h1",
            refresh: false,
            theme: 'black',
            orientation: isPortrait() ? 'portrait' : 'landscape'
        }

        Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: isPortrait() ? 'portrait' : 'landscape'
            });
        });
    }

    static navigationOptions = {
        drawerIcon: (
            <Image source={require('../../routes/Images/chart.png')}
                style={{ height: 24, width: 24 }} />
        )
    }

    //Changes Back Button beavior
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    }

    //Changes Back Button beavior and Unlocks Screen Orientation
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    //Changes Back Button beavior
    backPressed = () => {
        this.props.navigation.navigate('Home');
        return true;
    }

    //Fired on Refresh Button Press 
    onRefreshButtonPress = () => {
        let val = this.state.refresh;
        this.setState({
            refresh: !val
        })
    }

    //Change state with currently selected quote value 
    onQuoteChange(quote) {
        this.setState({
            selectedQuote: quote,
        })
    }

    //Change state with currently selected chartType value 
    onChartTypeChange(type) {
        this.setState({
            selectedChartType: type,
        })
    }

    //Change state with currently selected chartInterval value 
    onIntervalTypeChange(interval) {
        this.setState({
            selectedIntervalType: interval
        })
    }

    //Fired on Theme toogle icon press
    onThemePress = () => {
        let currentValue=this.state.theme;
        if(currentValue === 'black'){
            this.setState({
                theme: 'white'
            })
        }
        else if(currentValue === 'white'){
            this.setState({
                theme: 'black'
            })
        }
    }

    render() {
        let themeStyle=null;
        if(this.state.theme==='black')
            themeStyle=Style.chart.themeWhiteButton;
        else 
            themeStyle=Style.chart.themeBlackButton;

        if (this.state.orientation === 'landscape') {
            return (
                <Container style={Style.chart.containerStyle}>
                    <Header style={Style.chart.headerStyle}>
                        <Content>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    <Icon
                                        ios='ios-menu'
                                        android="md-menu"
                                        style={{ fontSize: 50, color: 'white' }}
                                        onPress={() => this.props.navigation.openDrawer()} />
                                </View>
                                <View style={{ flex: 6, flexDirection: "row" }}>
                                    <MenuItems                     
                                        selected={this.state.selectedQuote}
                                        change={(quote) => this.onQuoteChange(quote)}
                                    />
                                </View>
                                <View style={{ flex: 3, flexDirection: "row" }}>
                                    <ChartType
                                        selected={this.state.selectedChartType}
                                        change={(type) => this.onChartTypeChange(type)}
                                    />
                                </View>
                                <View style={{ flex: 1.5, flexDirection: "row" }}>
                                    <ChartInterval
                                        selected={this.state.selectedIntervalType}
                                        change={(interval) => this.onIntervalTypeChange(interval)}
                                    />
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity
                                            onPress={this.onRefreshButtonPress.bind(this)}
                                            style={Style.chart.refreshStyle}>
                                            <VectorIcon name="refresh" size={26} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                        <TouchableOpacity
                                            onPress={this.onThemePress.bind(this)}
                                            style={themeStyle}>                                            
                                        </TouchableOpacity>
                                    </View>                                   
                                </View>
                            </View>
                        </Content>
                    </Header>

                    <View style={{ flex: 1, flexDirection: "column" }}>
                        <HighChart
                            quote={this.state.selectedQuote}
                            type={this.state.selectedChartType}
                            interval={this.state.selectedIntervalType}
                            refresh={this.state.refresh}
                            color={this.state.theme}
                            range={true}
                        />                        
                    </View>
                </Container>
            );
        }
        else{
            return (
                <Container style={Style.chart.containerStyle}>
                    <Header style={Style.chart.headerStyle}>
                        <Content>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    <Icon
                                        ios='ios-menu'
                                        android="md-menu"
                                        style={{ fontSize: 50, color: 'white' }}
                                        onPress={() => this.props.navigation.openDrawer()} />
                                </View>                                
                                <View style={{ flex: 3, flexDirection: "row" }}>
                                    <MenuItemsSingle                                  
                                        selected={this.state.selectedQuote}
                                        change={(quote) => this.onQuoteChange(quote)}   />
                                </View> 
                                <View style={{ flex: 1.5 }}>
                                    <ChartInterval
                                        selected={this.state.selectedIntervalType}
                                        change={(interval) => this.onIntervalTypeChange(interval)} />
                                </View>                               
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity
                                            onPress={this.onRefreshButtonPress.bind(this)}
                                            style={Style.chart.refreshStyle}>
                                            <VectorIcon name="refresh" size={26} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                        <TouchableOpacity
                                            onPress={this.onThemePress.bind(this)}
                                            style={themeStyle}>                                
                                        </TouchableOpacity>
                                    </View>                                    
                                </View>
                            </View>
                        </Content>
                    </Header>
    
                    <View style={{ flex: 1, flexDirection: "column" }}>
                        <HighChart
                            quote={this.state.selectedQuote}
                            type={this.state.selectedChartType}
                            interval={this.state.selectedIntervalType}
                            refresh={this.state.refresh}
                            color={this.state.theme}
                            range={false}
                        />                        
                    </View>
                </Container>
            );
        }

    }
}

function mapStateToProps(state) {
    return ({
        language: state.settingReducer.currentLanguage
    })
}

export default connect(mapStateToProps)(Chart); 
