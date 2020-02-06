//打乱数组
export function disOrderArr(orgArr){
    var newArr = [];
    let arr = clone(orgArr);
    for(var i=0; i<arr.length; i++){
        var index = Math.floor(Math.random()*arr.length);//随机下标
        newArr.push(arr[index]);//将随机出的元素，存放新数组newArr中去
        arr.splice(index,1);//    将随机出的元素在arr中删除            
    }
    //arr中删除随机出的元素,arr.length-1,同时i++,导致循环不会10次,会是5次.最后得到newArr中只有一半的随机数字,arr中剩下另一半. 将其合并到一起,得到res
    var res =[...newArr,...arr];
    return res
}
//深克隆
const isType = (obj, type) => {
    if (typeof obj !== 'object') return false;
    // 判断数据类型的经典方法：
    const typeString = Object.prototype.toString.call(obj);
    let flag;
    switch (type) {
      case 'Array':
        flag = typeString === '[object Array]';
        break;
      case 'Date':
        flag = typeString === '[object Date]';
        break;
      case 'RegExp':
        flag = typeString === '[object RegExp]';
        break;
      default:
        flag = false;
    }
    return flag;
};
const getRegExp = re => {
    var flags = '';
    if (re.global) flags += 'g';
    if (re.ignoreCase) flags += 'i';
    if (re.multiline) flags += 'm';
    return flags;
  };
export function clone (parent) {
    // 维护两个储存循环引用的数组
    const parents = [];
    const children = [];
  
    const _clone = parent => {
      if (parent === null) return null;
      if (typeof parent !== 'object') return parent;
  
      let child, proto;
  
      if (isType(parent, 'Array')) {
        // 对数组做特殊处理
        child = [];
      } else if (isType(parent, 'RegExp')) {
        // 对正则对象做特殊处理
        child = new RegExp(parent.source, getRegExp(parent));
        if (parent.lastIndex) child.lastIndex = parent.lastIndex;
      } else if (isType(parent, 'Date')) {
        // 对Date对象做特殊处理
        child = new Date(parent.getTime());
      } else {
        // 处理对象原型
        proto = Object.getPrototypeOf(parent);
        // 利用Object.create切断原型链
        child = Object.create(proto);
      }
  
      // 处理循环引用
      const index = parents.indexOf(parent);
  
      if (index != -1) {
        // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
        return children[index];
      }
      parents.push(parent);
      children.push(child);
  
      for (let i in parent) {
        // 递归
        child[i] = _clone(parent[i]);
      }
  
      return child;
    };
    return _clone(parent);
};
//计算元素到顶部的距离
export function getElementToPageTop(el) {
  if(el.parentElement) {
    return getElementToPageTop(el.parentElement) + el.offsetTop
  }
  return el.offsetTop
}
//计算元素到左边的距离
export function getElementToPageLeft(el) {
  if(el.parentElement) {
    return getElementToPageLeft(el.parentElement) + el.offsetLeft
  }
  return el.offsetLeft
}