import '../style/index.less';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {fn1} from './fun';


class Demo extends Component {
    render() {
        fn1(12, 12);
        return (<div className="box">{this.props.text}</div>);
    }
}

ReactDOM.render(
    <Demo text="This ia a text"/>,
    document.querySelector('.container')
);