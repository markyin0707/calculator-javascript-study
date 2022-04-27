// 建议初始化放在一起，一个函数里面，不建议放在html标签里(表单得value=0)
function init(){
    var textbox=document.getElementById("textbox");//前后等价
    textbox.value=0;
    // 通过初始化函数来对每一个表单进行事件的添加  
    // 按照标签的名字来获取
    var btn_num1;
    var btn_char;
    var objButton=document.getElementsByTagName("input");
    for(var i=0;i<objButton.length;i++){
        objButton[i].onclick=function(){
            // 单击的对象(按钮)是谁，this就是指谁。在方法中，this表示该方法所属的对象。
            // *注(函数和方法的区别):当将函数和对象合写在一起时，函数就变成了 “方法”（method），或者说当函数赋值给对象的属性，我们称为"方法"。即:面向对象的语言叫方法，面向过程的语言叫函数。
            // 在input中.value返回的是一个字符串类型
            if(isNumber(this.value)){
                // alert(objButton[i].value);会报错，因为执行完for循环之后才会触发onclik事件，会溢出
                // textbox.value=(textbox.value+this.value)*1;
                if(isNull(textbox.value)){
                    textbox.value=this.value;
                }else{
                    textbox.value=textbox.value+this.value;
                }
            }else{
                switch(this.value){
                    case "c":
                        textbox.value=0;
                        break;
                    case "←":
                        textbox.value=back(textbox.value);
                        break;
                    case "+/-":
                        textbox.value=sign(textbox.value);
                        break;
                    case "/":
                        btn_num1=Number(textbox.value);
                        textbox.value=0;
                        btn_char="/";
                        break;
                    case "*":
                        btn_num1=Number(textbox.value);
                        textbox.value=0;
                        btn_char="*";
                        break;
                    case "-":
                        btn_num1=Number(textbox.value);
                        textbox.value=0;
                        btn_char="-";
                        break;
                    case "+":
                        btn_num1=Number(textbox.value);
                        textbox.value=0;
                        btn_char="+"
                        break;
                    case ".":
                        textbox.value=decPoint(textbox.value);
                        break;
                    case "=":
                        switch(btn_char){
                            case "+":
                                textbox.value=btn_num1+Number(textbox.value);
                                break;
                            case "-":
                                textbox.value=btn_num1-Number(textbox.value);
                                break;
                            case "*":
                                textbox.value=btn_num1*Number(textbox.value);
                                break;
                            case "/":
                                if(Number(textbox.value)==0){
                                    alert("除数不能为0");
                                    textbox.value=0;
                                }else{
                                    textbox.value=btn_num1/Number(textbox.value);
                                }
                                break;
                        }
                        break;
                }
            }
        }
    }
}

function isNumber(n){
/*     
    if(isNaN(n)==false){
        return true;
    }else{
        return false;
    } 
*/
    return !isNaN(n);//优化
}

// 验证文本框是否为空或者0
function isNull(n){
    if(n=="0" || n.length==0){
        return true;
    }else{
        return false;
    }
}

// 小数点是否存在
function decPoint(n){
    // indexOf(".")如果没有小数点返回-1，有返回索引值
    if(n.indexOf(".")==-1){
        n=n+".";
    }
    return n;
}

// 退位键
function back(n){
    n=n.substr(0,n.length-1);
    if(isNull(n)){
        n="0";
    }
    return n;
}

// 正负号
function sign(n){
    // 法一
    /* 
    if(n.indexOf("-")==-1){
        n="-"+n;
    }else{
        n.substr(1,n.length);
    } 
    */
    // 法二
    n=Number(n)*-1;
    return String(n);// 强制转换为字符串
}



// 通过单一事件，单击0-9在文本框显示对应的0-9
/* 
function num_1_click(){
    var num=document.getElementById("num");
    var n=num.value;
    // 通过字符串拼接
    // 文本框去掉0的三种方法
    法一
        if(n==0){
            n=1;
        }else{
            n=n+"1";
        } 
    
    法二
        if(n==0){
            n="";
        }
        n=n+"1";
    
        n=n+"1";
        document.getElementById("num").value=n*1; //法三，转换为数值类型
    }
*/