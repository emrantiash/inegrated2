import React, { Component } from "react";
import { Container, Content, Picker, Form } from "native-base";

//Backend Logics Coded By Manal @16 September, 2018

class ChartType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartType: [
                ['CandleStick Chart', 'candlestick'],
                ['Stock Chart', 'ohlc'],
                ['Line Chart', 'spline'],
                ['StepLine Chart', 'line'],
                ['Area Chart', 'area'],
            ],
            chartArray: []
        }
    }

    generateChartTypeList() {
        let res = [];
        let arr = [...this.state.chartType];
        for (let i = 0; i < arr.length; i++) {
            let line = arr[i];
            res.push(<Picker.Item color='white' key={i} label={line[0]} value={line[1]} />)
        }
        this.setState({
            chartArray: [...res]
        })
    }

    componentDidMount() {
        this.generateChartTypeList();
    }
    render() {
        return (
            <Container style={{ backgroundColor: '#1b2129' }}>
                <Content>
                    <Form>
                        <Picker
                            selectedValue={this.props.selected}
                            onValueChange={this.props.change}>
                            {this.state.chartArray}
                        </Picker>
                    </Form>
                </Content>
            </Container>
        )
    }
}

export default ChartType;