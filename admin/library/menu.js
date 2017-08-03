/**
 * Created by Wangxy on 2017/6/27.
 */
let _list = []

let Menu = function (list) {
    this._list = list
}

Menu.prototype.getMap = function (keyName) {
    let map = {}
    for (let menu of this._list) {
        map[menu[keyName]] = {
            id: menu.id,
            name: menu.name,
            description: menu.description
        }
    }
    return map
}

Menu.prototype.getTree = function () {
    let tree = []
    let refMenus = this.getMap('name')
    let tmpMenus = {}
    for (let menu of this._list) {
        let names = menu.name.substring(1).split('/')
        if (!tmpMenus[names[0]])
            tmpMenus[names[0]] = {'_data': refMenus['/' + names[0]]}
        if (names[1] && !tmpMenus[names[0]][names[1]])
            tmpMenus[names[0]][names[1]] = {'_data': refMenus['/' + names[0] + '/' + names[1]]}
        if (names[2] && !tmpMenus[names[0]][names[1]][names[2]])
            tmpMenus[names[0]][names[1]][names[2]] = {'_data': refMenus['/' + names[0] + '/' + names[1] + '/' + names[2]]}
    }
    let k1 = 0
    for (let name1 in tmpMenus) {
        tree[k1] = tmpMenus[name1]['_data']
        tree[k1]['children'] = []
        let k2 = 0
        for (let name2 in tmpMenus[name1]) {
            if ('_data' !== name2) {
                tree[k1]['children'][k2] = tmpMenus[name1][name2]['_data']
                tree[k1]['children'][k2]['children'] = []
                let k3 = 0
                for (let name3 in tmpMenus[name1][name2]) {
                    if ('_data' !== name3) {
                        tree[k1]['children'][k2]['children'][k3] = tmpMenus[name1][name2][name3]['_data']
                        k3++
                    }
                }
                k2++
            }
        }
        k1++
    }
    return tree
}

Menu.prototype.getUserTree = function (userList) {
    let tree = []
    let refMenus = this.getMap('name')
    let tmpMenus = {}
    for (let userMenu of userList) {
        let names = userMenu.name.substring(1).split('/')
        if (3 === names.length) {
            if (!tmpMenus[names[0]])
                tmpMenus[names[0]] = {'_data': refMenus['/' + names[0]]}
            if (!tmpMenus[names[0]][names[1]])
                tmpMenus[names[0]][names[1]] = {'_data': refMenus['/' + names[0] + '/' + names[1]]}
            if (!tmpMenus[names[0]][names[1]][names[2]])
                tmpMenus[names[0]][names[1]][names[2]] = {'_data': refMenus['/' + names[0] + '/' + names[1] + '/' + names[2]]}
        }
    }
    let k1 = 0
    for (let name1 in tmpMenus) {
        tree[k1] = tmpMenus[name1]['_data']
        tree[k1]['children'] = []
        let k2 = 0
        for (let name2 in tmpMenus[name1]) {
            if ('_data' !== name2) {
                tree[k1]['children'][k2] = tmpMenus[name1][name2]['_data']
                tree[k1]['children'][k2]['children'] = []
                let k3 = 0
                for (let name3 in tmpMenus[name1][name2]) {
                    if ('_data' !== name3) {
                        tree[k1]['children'][k2]['children'][k3] = tmpMenus[name1][name2][name3]['_data']
                        k3++
                    }
                }
                k2++
            }
        }
        k1++
    }
    return tree
}

Menu.prototype.getUserCrumbs = function (userList) {
    let crumbs = {}
    let refMenus = this.getMap('name')
    for (let userMenu of userList) {
        let names = userMenu.name.substring(1).split('/')
        if (3 === names.length) {
            crumbs[userMenu.name] = [
                refMenus['/' + names[0]].description,
                refMenus['/' + names[0] + '/' + names[1]].description,
                refMenus['/' + names[0] + '/' + names[1] + '/' + names[2]].description
            ]
        }
    }
    return crumbs
}

module.exports = Menu