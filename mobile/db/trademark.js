const trademarkTypeData = [
    {
        "ejectTitle": "默认",
        "filterId": "trademarkType",
        "id": 1,
        "filterData": "[0,1]",
        "filterShow": "商标类型"
    },
    {
        "ejectTitle": "文字商标",
        "filterId": "trademarkType",
        "id": 2,
        "filterData": "0",
        "filterShow": "文字商标"
    },
    {
        "ejectTitle": "图形商标",
        "filterId": "trademarkType",
        "id": 3,
        "filterData": "1",
        "filterShow": "图形商标"

    }
];
const trademarkPriceRangeData = [
    {
        "ejectTitle": "默认",
        "filterId": "trademarkPriceRange",
        "id": 1,
        "filterData": "[0,1000000]",
        "filterShow": "价格范围"
    },
    {
        "ejectTitle": "1000以下",
        "filterId": "trademarkPriceRange",
        "id": 2,
        "filterData": "<1000",
        "filterShow": "1000以下"
    },
    {
        "ejectTitle": "1000-2000",
        "filterId": "trademarkPriceRange",
        "id": 3,
        "filterData": "[1000,2000]",
        "filterShow": "1000-2000"
    },
    {
        "ejectTitle": "2000-3000",
        "filterId": "trademarkPriceRange",
        "id": 4,
        "filterData": "[2000,3000]",
        "filterShow": "2000-3000"
    },
    {
        "ejectTitle": "3000-5000",
        "filterId": "trademarkPriceRange",
        "id": 5,
        "filterData": "[3000,5000]",
        "filterShow": "3000-5000"
    },
    {
        "ejectTitle": "5000-10000",
        "filterId": "trademarkPriceRange",
        "id": 6,
        "filterData": "[5000,10000]",
        "filterShow": "5000-10000"
    },
    {
        "ejectTitle": "10000-50000",
        "filterId": "trademarkPriceRange",
        "id": 7,
        "filterData": "[10000,50000]",
        "filterShow": "10000-50000"
    },
    {
        "ejectTitle": "50000以上",
        "filterId": "trademarkPriceRange",
        "id": 8,
        "filterData": ">50000",
        "filterShow": "50000以上"
    }
];
const trademarkSortMethodData = [
    {
        "ejectTitle": "默认",
        "filterId": "trademarkSortDefault",
        "id": 1,
        "filterData": "",
        "filterShow": "排列顺序"
    },
    {
        "ejectTitle": "发布时间",
        "filterId": "trademarkSort",
        "id": 2,
        "filterData": "+shelved_at",
        "filterShow": "发布时间"
    },
    {
        "ejectTitle": "人气",
        "filterId": "trademarkSort",
        "id": 3,
        "filterData": "+follow",
        "filterShow": "人气"
    },
    {
        "ejectTitle": "价格",
        "filterId": "trademarkSort",
        "id": 4,
        "filterData": "+price",
        "filterShow": "价格"
    }
];
export {trademarkTypeData, trademarkPriceRangeData, trademarkSortMethodData}