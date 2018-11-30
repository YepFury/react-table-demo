import React, {Component} from 'react';
import {getMointorTableData} from '../services/api';
import {Table, Button, Tag} from 'antd'
import Modals from './Modals'
import '../less/mointor.less'

class Tables extends Component {

    state = {
        params: {
            pageNums: 1,
            pageSizes: 10
        },
        loading: false,
        dataSource: [],
        total: 0,
        currentPage: 1,
        showModal: false,
        columns: [
            {
                title: '编号',
                dataIndex: 'index',
                key: 'index'
            },
            {
                title: '路口名称',
                dataIndex: 'nodeName',
                key: 'nodeName'
            },
            {
                title: '监控编号',
                dataIndex: 'monitorNumb',
                key: 'monitorNumb',
                render: monitorNumb => {
                    if (monitorNumb) {
                        return (
                            <span>
                            {monitorNumb.split(',').map(numb =>
                                <Tag color="blue" key={numb}>{numb}</Tag>
                            )}
                            </span>
                        )
                    }
                }
            },
            {
                title: '操作',
                key: 'action',
                render: (text, reocrd) => (
                    <span>
                        <Button className="btn-table-edit" onClick={this.editSource.bind(this, text)}>编辑</Button>
                    </span>
                )
            }
        ],
        itemInfo: null
    }

    componentDidMount() {
        this.getTableData();
    }

    getTableData(currentPage) {
        this.setState({
            loading: true,
            params: {
                pageNums: currentPage || 1,
                pageSizes: 10
            }
        },()=>{
            getMointorTableData(this.state.params).then(res => {
                res.data.list.map((item, index) => {
                    return item.index = index + 1;
                })
                this.setState({
                    dataSource: res.data.list,
                    total: res.data.total,
                    loading: false
                })
            })
        })
    }

    changePage(page){
        this.getTableData(page.current);
    }
    editSource(info, e) {
        this.setState({
            itemInfo: info,
            showModal: true
        })
    }

    closeModal(status) {
        this.setState({
            showModal: status
        })
    }

    render() {
        return (
            <div>
                <Table
                    className="mointor-table"
                    dataSource={this.state.dataSource} columns={this.state.columns} rowKey='index'
                    loading={this.state.loading}
                    onChange={this.changePage.bind(this)}
                    pagination={{
                        total: this.state.total,
                        pageSize: this.state.params.pageSizes,
                        defaultPageSize: this.state.params.pageSizes,
                        showSizeChanger: false,
                        showTotal: () => {
                            return `共${this.state.total}条数据`;
                        }
                    }}/>
                {this.state.showModal ? (<Modals numbs={this.state.itemInfo} visible={this.state.showModal} fromSon={status => {
                    this.closeModal(status)
                }}/>) : null}
            </div>
        )
    }
}
export default Tables;