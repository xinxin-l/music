/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2022-03-07 10:36:21
 * @version $Id$
 */
function new_instance_of(leftVaule, rightVaule) { 
    let rightProto = rightVaule.prototype; // 取右表达式的 prototype 值
    leftVaule = leftVaule.__proto__; // 取左表达式的__proto__值
    while (true) {
      if (leftVaule === null) {
            return false; 
        }
        if (leftVaule === rightProto) {
            return true;  
        } 
        leftVaule = leftVaule.__proto__ 
    }
}
// left是否在right 的原型
function myInctanceof(left ,right){
  let rightProto=right.prototype;
  leftValue=left._proto_;
  while(true){
    if
  }
}