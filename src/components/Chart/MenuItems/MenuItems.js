import React, { Component } from "react";
import { Alert } from "react-native"
import { Container, Content, Picker, Form } from "native-base";
import Style from './Style'
import { generateList, fetchList } from './Helper'

//Backend Logics Coded By Manal @16 September, 2018

class menuItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            quotesArray: [],
            listArray: []
        }
    }

    async componentDidMount() {
        await fetchList()
            .then(res => {
                this.setState({
                    quotesArray: [...res.result],
                    listArray: [...generateList(this.state.quotesArray)]
                })
            })
            .catch(err => {
                Alert.alert(
                    'Error !',
                    `Downloading Quotes List Failed`,
                    [
                        { text: 'Try Again', onPress: () => fetchList() },
                        { text: 'Cancel', onPress: null }
                    ],
                    { cancelable: false }
                )
            });
        this.setState({
            listArray: [...generateList(this.state.quotesArray)]
        })
    }

    render() {
        return (
            <Container style={Style.menuItemsBackground}>
                <Content>
                    <Form>
                        <Picker
                            selectedValue={this.props.selected}
                            onValueChange={this.props.change}>
                            {this.state.listArray}
                        </Picker>
                    </Form>
                </Content>
            </Container>
        )
    }
}

export default menuItems;