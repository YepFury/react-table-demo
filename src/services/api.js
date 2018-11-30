import request from './request';

export async function getMointorTableData(params) {
    return request.get('/monitor/queryMonitorOriginalAll.json', {
        params: params
    })
}