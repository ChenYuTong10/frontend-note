// 声明文件
// declare var jQuery: (selector: string) => any;
(() => {
    // 更多详细请看"https://24kcs.github.io/vue3_study"文档
    // 类型注解:为形参添加约束,便于检查错误,注意的是,即使"TypeScript"文件错误,"JavaScript"也能编译生成
    function Greeting(message) {
        console.log(message);
    }
    var message = "Hello, TypeScript";
    Greeting(message);
    /*
    *   TypeScript中的类型:
    *   1.boolean 2.number 3.string 4.Array<type> 或者 type[]
    *   5.Tuple:[type1, type2, ...] 6.enum variable {} 7.any 8.void
    *   9.object 10.联合 11.断言
    *   说明:
    *   1.Tuple是特殊的数组,可以存储任何数据类型;
    *   2.any表示暂时不检查类型,可以为任何类型;
    *   3.void只能是"undefined"和"null"之一.
    */
    function GetString(param) {
        return param.toString();
    }
    function GetLength(param) {
        return param.toString();
        // (param as string).toString();
    }
    ;
    const person = {
        "firstName": "小",
        "lastName": "明"
    };
    // 类和Java非常相似
    // 1.继承用"extends",实现"implements";
    // 2.域修饰符:"public","protected","privated",默认"public";
    // 3.存在"get"和"set"方法,静态变量"static"和抽象类"abstract".
    class Animal {
        // 构造函数
        constructor(name, weight, color) {
            this.name = name;
            this.weight = weight;
            this.color = color;
        }
        ;
        concatName(firstName, lastName) {
            return firstName + lastName;
        }
        ;
        get fullName() {
            return "动物" + this.name;
        }
        set fullName(value) {
            this.name = value;
        }
    }
    Animal.temp = "temp"; // 静态变量
    // 函数
    function buildName(firstName = 'zhang', lastName) {
        if (lastName !== undefined) {
            return firstName + lastName;
        }
        else {
            return firstName;
        }
    }
    function addNumber(...args) {
        var result = 0;
        for (var i = 0; i < args.length; i = i + 1) {
            result = result + args[i];
        }
        return result;
    }
    // 当然也支持了函数重载
    // 泛型
    function createArray(length, value) {
        const array = [];
        for (var i = 0; i < length; i = i + 1) {
            array.push(value);
        }
        return array;
    }
    // 内置属性(Error, Number, String...)与JavaScript中相同;
    // DOM和BOM对象:
    // 1.window 2.Document 3.HTMLElement 4.NodeList 5.Event 6.DocumentFragment(未知)
})();
