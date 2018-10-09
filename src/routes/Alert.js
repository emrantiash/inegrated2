import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Body, Title } from 'native-base'

class Alert extends Component {
    static navigationOptions = {
        drawerIcon: (
            <Image source={require('./Images/alert.png')}
            style={{height: 22, width: 18}} />
        )
    }
    render() {
        return (
            <Container>
                <Header style={{ paddingRight: 15, paddingLeft: 15 }}>
                    <Content>

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Icon ios='ios-menu' android="md-menu" style={{ fontSize: 50, color: '#000000' }}
                                onPress={() => this.props.navigation.openDrawer()} />

                            <Body>
                                <Title>Alert</Title>
                            </Body>
                        </View>
                    </Content>
                </Header>
                <Content contentContainerStyle={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ffffff',
                }}>
                    <Text>Alert Screen</Text>
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    imageCont: {
        height: 22,
        width: 18,
        margin: 100
    }
});

export default Alert;
