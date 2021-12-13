let isConnection = true;
let SiteDetailsData = [];

const SetConnectionStatus = (status) => {
    isConnection = status;
}

const SetSiteDetailsData = (data) => SiteDetailsData = data;

let ColorNum = [{
    key: 'Blue',
    value: 1,
    colorCode: "#558ed5"
},
{
    key: 'Orange',
    value: 2,
    colorCode: "#ffc000"
},
{
    key: 'Green',
    value: 3,
    colorCode: "#00b050"
},
{
    key: 'Brown',
    value: 4,
    colorCode: "#984807"
},
{
    key: 'Grey',
    value: 5,
    colorCode: "#bfbfbf"
},
{
    key: 'White',
    value: 6,
    colorCode: "#fff"
},
{
    key: 'Red',
    value: 7,
    colorCode: "#f00"
},
{
    key: 'Black',
    value: 8,
    colorCode: "#000"
}
]


let TopFiber = [{
    key: 'Sensory Fiber 1',
    value: 9
},
{
    key: 'Sensory Fiber 2',
    value: 10
},
{
    key: 'Sensory Fiber 3',
    value: 11
}]


const Roles = [
    { key: "admin", display: "Administrator", value: 1 },
    { key: "operation_head", display: "Operation Head", value: 2 },
    { key: "regional_manager", display: "Regional Manager", value: 3 },
    { key: "field_manager", display: "Field Manager", value: 4 },
    { key: "field_teams", display: "Field Teams", value: 5 },
]

const regions = [
    { value: 1, display: "Southern", title: "Region-1" },
    { value: 2, display: "Eastern", title: "Region-2" },
    { value: 3, display: "Western", title: "Region-3" },
    { value: 4, display: "Central", title: "Region-4" },
    { value: 5, display: "Northern", title: "Region-5" },
    { value: 6, display: "South Western", title: "Region-6" }
]

const siteTypes = [
    { value: "1", title: "Army GOF" },
    { value: "2", title: "Army NonGOF" },
    { value: "3", title: "Navy" },
    { value: "4", title: "IAF" },
    { value: "5", title: "BSNL" },
    { value: "6", title: "Spare" }
]
const nodeTypes = [
    // { value: 1, title: "ASCON" },
    // { value: 1, title: "NFS Node" },
    { value: 1, title: "NLD" },
    { value: 2, title: "Access" }
]

const elementTypes = [
    { value: 1, title: "SE" },
    { value: 2, title: "EE" },
    { value: 3, title: "other" },
]


const TempRegions = [
    { value: 0, display: "-", title: "Access All Regions" },
    { value: 7, display: "Access All Regions", title: "Access All Regions" },
]

const DisplayFips = (number, type) => {
    if (number && number.length == 10) {
        return number + (type == 1 ? "/A" : (type == 2 ? "/B" : ""))
    } else {
        return number
    }
}


//0 pending, 1 Approval, 2 Rejected, 3 Resubmit  
const GetSurveyStatus = [
    { value: 0, display: "Pending" },
    { value: 1, display: "Approved" },
    { value: 2, display: "Rejected" },
    { value: 3, display: "Resubmit" },
]


const GetUserData = () => {
    let obj = null;
    if (localStorage.getItem("authUser") && atob(localStorage.getItem("authUser"))) {
        obj = JSON.parse(atob(localStorage.getItem("authUser")));
    }
    return obj;
}

const GetTwoName = (name) => {
    try {
        return (name.split(" ")[0][0] + " " + name.split(" ")[1][0]).toUpperCase()
    } catch (e) {
        return name
    }
}

const pad = (n, width, z) => {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

let powerSourceAvailableTypes = [
    { value: 1, "title": 'ACDB' },
    { value: 2, "title": '3 Pin' },
    { value: 3, "title": 'Industrial Socket' },
    { value: 4, "title": 'UPS' }]

let GetQueryString = (key) => {
    const urlParams = new URLSearchParams(window.location.search);
    return (urlParams.get(key));
}

export {
    isConnection,
    SiteDetailsData,
    Roles,
    GetSurveyStatus,
    regions,
    TempRegions,
    nodeTypes,
    ColorNum,
    TopFiber,
    siteTypes,
    elementTypes,
    powerSourceAvailableTypes,
    SetConnectionStatus,
    SetSiteDetailsData,
    GetUserData,
    GetTwoName,
    DisplayFips,
    GetQueryString
}