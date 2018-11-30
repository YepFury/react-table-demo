import React, {Component} from 'react';
import {Modal, Button} from 'antd';

class Modals extends Component {
    state = {
        loading: false,
        visible: false,
        numbs: null
    }

    handleOk(e) {
        this.props.fromSon(false);
        this.setState({
            visible: false,
        });
    }

    handleCancel(e) {
        this.props.fromSon(false);
        this.setState({
            visible: false,
        });
    }

    componentWillMount() {
        this.setState({
            visible: this.props.visible,
            numbs: this.props.numbs
        });
    }

    render() {
        let nineNumbs = [].concat(this.props.numbs.monitorNumb.split(','));
        for (let i = 0; i < 9 - this.state.numbs.monitorNumb.split(',').length; i++) {
            nineNumbs.push('')
        }
        const { visible } = this.props;
        return (
            <div>
                <Modal
                    key={this.props.numbs.nodeId}
                    visible={visible}
                    title="Title"
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    footer={[
                        <Button key="back" onClick={this.handleCancel.bind(this)}>Return</Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk.bind(this)}>
                            Submit
                        </Button>,
                    ]}>
                    {
                        nineNumbs.map((num, index) => {
                            return (
                                <div className="input-item" key={index}>
                                    <label>监控{index + 1}编号</label>
                                    <input type="text" defaultValue={num}/>
                                </div>
                            )
                        })
                    }
                </Modal>
            </div>
        )
    }
}

export default Modals;