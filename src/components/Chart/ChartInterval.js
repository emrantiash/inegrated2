import React, { Component } from "react";
import { Container, Content, Picker, Form } from "native-base";

//Backend Logics Coded By Manal @16 September, 2018

class ChartInterval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartInterval: [
                ["M1", "m1"],
                ["M5", "m5"],
                ["M15", "m15"],
                ["M30", "m30"],
                ["H1", "h1"],
                ["H4", "h4"],
                ["D1", "d1"],
                ["W1", "w1"],
                ["MN", "mn"]
            ],
            intervalArray: []
        }
    }

    generateChartIntervalList() {
        let res = [];
        let arr = [...this.state.chartInterval];
        for (let i = 0; i < arr.length; i++) {
            let line = arr[i];
            res.push(<Picker.Item color='white' key={i} label={line[0]} value={line[1]} />)
        }
        this.setState({
            intervalArray: [...res]
        })
    }

    componentDidMount() {
        this.generateChartIntervalList();
    }
    render() {
        return (
            <Container style={{ backgroundColor: '#1b2129' }}>
                <Content>
                    <Form>
                        <Picker                            
                            selectedValue={this.props.selected}
                            onValueChange={this.props.change}>
                            {this.state.intervalArray}
                        </Picker>
                    </Form>
                </Content>
            </Container>
        )
    }
}

export default ChartInterval;