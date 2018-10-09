import React, { Component } from 'react';
import { View, TouchableOpacity, Text, BackHandler, Dimensions } from 'react-native';
import { Icon, Container, Header, Content } from 'native-base'
import VectorIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import ChartType from './ChartType'
import ChartInterval from './ChartInterval'
import HighChart from './HighChart/HighChart'
import Style from './Styles'

//Backend Logics Coded By Manal @16 September, 2018

class ChartSingle extends Component {
    constructor(props) {
        super(props);

        const isPortrait = () => {
            const dim = Dimensions.get('screen');
            return dim.height >= dim.width;
        }; 

        this.state = {
            selectedChartType: 'candlestick',
            selectedIntervalType: 'h1',
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

    //Locks Screen Orientation
    componentDidMount() {
    }

    //Changes Back Button beavior
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    }

    //Changes Back Button beavior and Unlocks Screen Orientation
    componentWillUnmount() {
        //Orientation.unlockAllOrientations();
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    //Changes Back Button beavior
    backPressed = () => {
        this.props.navigation.navigate('Currency');
        return true;
    }

    //Fired on Refresh Button Press 
    onRefreshButtonPress = () => {
        let val = this.state.refresh;
        this.setState({
            refresh: !val
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
        //Gets Quote value passed by previous screen 
        let quoteParam = this.props.navigation.getParam('quote');
        let header = `Chart - ${quoteParam}`;
        if (this.props.language === 'ENGLISH') header = header;
        if (this.props.language === 'RUSSIAN') header = `Диаграмма - ${quoteParam}`;

        let themeStyle=null;
        if(this.state.theme==='black')
            themeStyle=Style.chart.themeWhiteButton;
        else 
            themeStyle=Style.chart.themeBlackButton;       

        if (this.state.orientation === 'landscape'){
            return (
                <Container style={Style.chart.containerStyle}>
                    <Header style={Style.chart.headerStyle}>
                        <Content>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    <Icon
                                        ios='ios-arrow-back'
                                        android="md-arrow-back"
                                        style={{ fontSize: 40, color: 'white', justifyContent:'center', marginTop:5 }}
                                        onPress={() => this.backPressed()} />
                                </View>
                                <View style={{ flex: 3 }}>
                                    <Text style={{ fontSize: 16, marginTop: 14, fontWeight: '400', color:'white' }}>
                                        {header}
                                    </Text>
                                </View>
                                <View style={{ flex: 3 }}>
                                    <ChartType
                                        selected={this.state.selectedChartType}
                                        change={(type) => this.onChartTypeChange(type)} />
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
                                            style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center', }}>
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
                        <View style={{ flex: 10 }}>
                            <HighChart
                                quote={quoteParam}
                                type={this.state.selectedChartType}
                                interval={this.state.selectedIntervalType}
                                refresh={this.state.refresh}
                                color={this.state.theme}
                                range={true} />                            
                        </View>
                    </View>
                </Container>
            );
        }
        else{
            return (
                <Container style={{backgroundColor: '#1b2129'}}>
                    <Header style={{ paddingRight: 10, paddingLeft: 10, height: 50, backgroundColor: '#1b2129' }}>
                        <Content>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    <Icon
                                        ios='ios-arrow-back'
                                        android="md-arrow-back"
                                        style={{ fontSize: 40, color: 'white', justifyContent:'center', marginTop:5 }}
                                        onPress={() => this.backPressed()} />
                                </View>                                
                                <View style={{ flex: 3 }}>
                                    <Text style={{ fontSize: 16, marginTop: 14, fontWeight: '400', color:'white' }}>
                                        {header}
                                    </Text>
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
                                            style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center', }}>
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
                        <View style={{ flex: 10 }}>
                            <HighChart
                                quote={quoteParam}
                                type={this.state.selectedChartType}
                                interval={this.state.selectedIntervalType}
                                refresh={this.state.refresh}
                                color={this.state.theme}
                                range={false} />                            
                        </View>
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

export default connect(mapStateToProps)(ChartSingle);
