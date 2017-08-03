const patentTypeData = [
    {
        "ejectTitle": "默认",
        "filterId": "patentType",
        "id": 1,
        "filterData": "[0,2]",
        "filterShow":"专利类型"
    },
    {
        "ejectTitle": "发明",
        "filterId": "patentType",
        "id": 2,
        "filterData": "0",
        "filterShow":"发明"

    },
    {
        "ejectTitle": "实用新型",
        "filterId": "patentType",
        "id": 3,
        "filterData": "1",
        "filterShow":"实用新型"
    },
    {
        "ejectTitle": "外观设计",
        "filterId": "patentType",
        "id": 4,
        "filterData": "2",
        "filterShow":"外观设计"
    }
];
const patentStatusData = [
    {
        "ejectTitle": "默认",
        "filterId": "patentStatus",
        "id": 1,
        "filterData": "[0,1]",
        "filterShow":"专利状态"
    },
    {
        "ejectTitle": "授权未缴费",
        "filterId": "patentStatus",
        "id": 2,
        "filterData": "0",
        "filterShow":"授权未缴费"
    },
    {
        "ejectTitle": "已下证",
        "filterId": "patentStatus",
        "id": 3,
        "filterData": "1",
        "filterShow":"已下证"
    }
];
const patentPriceRangeData = [
    {
        "ejectTitle": "默认",
        "filterId": "patentPriceRange",
        "id": 1,
        "filterData": "[0,1000000]",
        "filterShow":"价格范围"
    },
    {
        "ejectTitle": "1000以下",
        "filterId": "patentPriceRange",
        "id": 2,
        "filterData": "<1000",
        "filterShow":"1000以下"
    },
    {
        "ejectTitle": "1000-2000",
        "filterId": "patentPriceRange",
        "id": 3,
        "filterData": "[1000,2000]",
        "filterShow":"1000-2000"
    },
    {
        "ejectTitle": "2000-3000",
        "filterId": "patentPriceRange",
        "id": 4,
        "filterData": "[2000,3000]",
        "filterShow":"2000-3000"
    },
    {
        "ejectTitle": "3000-5000",
        "filterId": "patentPriceRange",
        "id": 5,
        "filterData": "[3000,5000]",
        "filterShow":"3000-5000"
    },
    {
        "ejectTitle": "5000-10000",
        "filterId": "patentPriceRange",
        "id": 6,
        "filterData": "[5000,10000]",
        "filterShow":"5000-10000"
    },
    {
        "ejectTitle": "10000-50000",
        "filterId": "patentPriceRange",
        "id": 7,
        "filterData": "[10000,50000]",
        "filterShow":"10000-50000"
    },
    {
        "ejectTitle": "50000以上",
        "filterId": "patentPriceRange",
        "id": 8,
        "filterData": ">50000",
        "filterShow":"50000以上"
    }
];
const patentSortMethodData = [
    {
        "ejectTitle": "默认",
        "filterId": "patentSortDefault",
        "id": 1,
        "filterData": "",
        "filterShow":"排列顺序"
    },
    {
        "ejectTitle": "发布时间",
        "filterId": "patentSort",
        "id": 2,
        "filterData": "+shelved_at",
        "filterShow":"发布时间"
    },
    {
        "ejectTitle": "人气",
        "filterId": "patentSort",
        "id": 3,
        "filterData": "+follow",
        "filterShow":"人气"
    },
    {
        "ejectTitle": "价格",
        "filterId": "patentSort",
        "id": 4,
        "filterData": "+price",
        "filterShow":"价格"
    }
];
export {patentTypeData, patentStatusData, patentPriceRangeData, patentSortMethodData}