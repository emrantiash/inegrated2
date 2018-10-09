import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Container, List, ListItem, Left, Body, Right, Switch, Footer } from 'native-base';
import styles from './style' ;
class walletAlert extends Component {
    render() {
        return (
            <Container>
                <ScrollView style={styles.container}>
                    <View >

                        <View style={styles.bluebox} >
                            <Text style={styles.blueBoxText}>Ethereum</Text>
                        </View>

                        <View style={styles.wallets}>
                            <List >
                                <ListItem icon>
                                    <Left>
                                        <Image source={require('../routes/Images/alerts.png')} style={{ width: 20 }} />
                                    </Left>
                                    <Body style={styles.bottomBorder}>
                                        <Text style={styles.topText}>Above $300</Text>
                                        <Text note style={styles.belowText}>created on August 18, 2018</Text>
                                    </Body>
                                    <Right style={styles.bottomBorder}>
                                        <Switch value={true} />
                                    </Right>
                                </ListItem>
                            </List>
                            <List >
                                <ListItem icon>
                                    <Left>
                                        <Image source={require('../routes/Images/alerts.png')} style={{ width: 20 }} />
                                    </Left>
                                    <Body style={styles.bottomBorder}>
                                        <Text style={styles.topText}>Above $250</Text>
                                        <Text note style={styles.belowText}>created on August 18, 2018</Text>
                                    </Body>
                                    <Right style={styles.bottomBorder}>
                                        <Switch value={true} />
                                    </Right>
                                </ListItem>
                            </List>
                            <List >
                                <ListItem icon>
                                    <Left>
                                        <Image source={require('../routes/Images/alerts.png')} style={{ width: 20 }} />
                                    </Left>
                                    <Body style={styles.bottomBorder}>
                                        <Text style={styles.topText}>Above $310</Text>
                                        <Text note style={styles.belowText}>created on August 18, 2018</Text>
                                    </Body>
                                    <Right style={styles.bottomBorder}>
                                        <Switch value={true} />
                                    </Right>
                                </ListItem>
                            </List>

                        </View>

                        <View style={styles.bluebox} >
                            <Text style={styles.blueBoxText}>Litecoin</Text>
                        </View>

                        <View style={styles.wallets}>
                            <List >
                                <ListItem icon>
                                    <Left>
                                        <Image source={require('../routes/Images/alerts.png')} style={{ width: 20 }} />
                                    </Left>
                                    <Body style={styles.bottomBorder}>
                                        <Text style={styles.topText}>Above $61.10</Text>
                                        <Text note style={styles.belowText}>created on August 18, 2018</Text>
                                    </Body>
                                    <Right style={styles.bottomBorder}>
                                        <Switch value={true} />
                                    </Right>
                                </ListItem>
                            </List>
                            <List >
                                <ListItem icon>
                                    <Left>
                                        <Image source={require('../routes/Images/alerts.png')} style={{ width: 20 }} />
                                    </Left>
                                    <Body style={styles.bottomBorder}>
                                        <Text style={styles.topText}>Above $59.60</Text>
                                        <Text note style={styles.belowText}>created on August 18, 2018</Text>
                                    </Body>
                                    <Right style={styles.bottomBorder}>
                                        <Switch value={true} />
                                    </Right>
                                </ListItem>
                            </List>
                            <List >
                                <ListItem icon>
                                    <Left>
                                        <Image source={require('../routes/Images/alerts.png')} style={{ width: 20 }} />
                                    </Left>
                                    <Body style={styles.bottomBorder}>
                                        <Text style={styles.topText}>Above $72.00</Text>
                                        <Text note style={styles.belowText}>created on August 18, 2018</Text>
                                    </Body>
                                    <Right style={styles.bottomBorder}>
                                        <Switch value={true} />
                                    </Right>
                                </ListItem>
                            </List>
                        </View>
                    </View>
                    <Footer style={{ backgroundColor: '#1F2F46', paddingTop:5 }}>
                        <TouchableOpacity onPress = {()=>this.props.navigation.navigate('addalert')}>
                            <Image source={require('../routes/Images/newStar.png')}
                                style={{ height: 24, width: 25, marginLeft: 20, padding: 5}} />
                            <Text style={{ color: '#838790', fontSize: 15 }}>Add Alert</Text>
                        </TouchableOpacity>
                    </Footer>

                </ScrollView>
            </Container>
        )
    }


}

export default walletAlert;