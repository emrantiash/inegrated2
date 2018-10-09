import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Button, Dimensions, Alert, Share, Linking } from 'react-native';
import { Icon, Container, Header, Content,Body, Title} from 'native-base'
import { connect } from 'react-redux';
import styles from './style';
class About extends Component {
    static navigationOptions = {
        title: 'About Us',
        drawerIcon: (
            <Image source={require('../routes/Images/about.png')}
                style={{ height: 22, width: 22 }} />
        )
    }
    _onPressButton() {
        Linking.openURL('https://play.google.com/store/apps/details?id=com.instaforex.mobiletrader')
    }
    _onPressShare() {
        Share.share({
            title: 'Designed Survivor',
            url: 'www.youtube.com',
            message: 'Share'
        }, {
                dialogTitle: 'Share this Content',
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                ]
            })
    }
    _onPressLike() {
        Alert.alert('This button will work after upload the apps in playstore')
        underlayColor = "white"
    }
    render() {
        let title = "About Us"; let trade = "Instant Forex Trading";
        let body = "A simple and effective way of learning the trading skills in the InstaForex app. The course consists of five main sections. To consolidate the information received after each lesson envisaged test.";
        let buttonTitle = "Trade with Instaforex";
        let version = "App version 0.93.39";
        if (this.props.language === 'ENGLISH') {
            title = title;
            trade = trade;
            body = body;
            buttonTitle = buttonTitle;
            version = version;
        }
        if (this.props.language === 'RUSSIAN') {

            title = "О нас";
            trade = "Мгновенная торговля";
            body = "Простой и эффективный способ изучения навыков торговли в приложении InstaForex. Курс состоит из пяти основных разделов. Укрепить информацию, полученную после каждого проведенного урока.";
            buttonTitle = "ТОРГОВЛЯ С INSTAFOREX";
            version = "Версия приложения 0.93.39";
        }
        return (
            <Container>
                <Header style={{ backgroundColor: '#1b2129' }}>
                    <Content>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <Icon ios='ios-menu' android="md-menu" style={{ fontSize: 50, color: '#ffffff' }}
                                onPress={() => this.props.navigation.openDrawer()} />

                            <Body style={{ marginLeft: -20 }}>
                                <Title>{title}</Title>
                            </Body>
                        </View>
                    </Content>
                </Header>
                <Content style={styles.content}>
                    <View>
                        <Image style={styles.logo}
                            source={require('../routes/Images/logoSmall.png')} />
                    </View>
                    <View style={styles.contentView1}>
                        <Text style={styles.Text}>instaforex</Text>
                        <Text style={styles.text}>{trade}</Text>
                    </View>
                    <View style={styles.contentBody}>
                        <Text style={styles.info}>{body}</Text>
                    </View>

                    <View style={styles.bottom}>
                        <View style={styles.buttonContainer}>
                            <Button
                                onPress={this._onPressButton}
                                title={buttonTitle}
                                color='#EF5350'
                            />
                        </View>
                        <View style={styles.contentBody1}>
                            <TouchableOpacity onPress={() => this._onPressShare()}>
                                <Image style={styles.share}
                                    source={require('../routes/Images/share.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image style={styles.like}
                                    onPress={this._onPressLike}
                                    source={require('../routes/Images/like.png')} />
                            </TouchableOpacity>
                        </View>

                    </View>

                </Content>
                <View style={{}}>
                    <Text style={styles.footer}>{version}</Text>
                </View>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return ({

        language: state.settingReducer.currentLanguage

    })
}



export default connect(mapStateToProps)(About);