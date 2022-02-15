// 声明文件
// declare var jQuery: (selector: string) => any;

(() => {
    // 更多详细请看"https://24kcs.github.io/vue3_study"文档

    // 类型注解:为形参添加约束,便于检查错误,注意的是,即使"TypeScript"文件错误,"JavaScript"也能编译生成
    function Greeting(message: string) {
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
    function GetString(param: number | string): string {
        return param.toString();
    }
    function GetLength(param: number | string) {
        return (<string>param).toString();
        // (param as string).toString();
    }

    // 接口
    interface Person {
        readonly firstName: string,  // 只读常量
        lastName: string
        fullName?: string  // 可选属性
    };
    interface ConcatName {
        concatName(firstName:string, lastName:string) :string;  // 函数原型
    }
    const person = {
        "firstName": "小",
        "lastName": "明"
    };

    // 类和Java非常相似
    // 1.继承用"extends",实现"implements";
    // 2.域修饰符:"public","protected","privated",默认"public";
    // 3.存在"get"和"set"方法,静态变量"static"和抽象类"abstract".
    class Animal implements ConcatName {
        name: string;
        weight: number;
        readonly color: string;  // 只读常量
        static temp: string = "temp";  // 静态变量
        // 构造函数
        public constructor(name: string, weight: number, color: string) {
            this.name = name;
            this.weight = weight;
            this.color = color;
        };
        concatName(firstName: string, lastName: string): string {
            return firstName + lastName;
        };
        get fullName () {
            return "动物" + this.name;
        }
        set fullName (value) {
            this.name = value;
        }
    }

    // 函数
    function buildName(firstName:string = 'zhang', lastName?:string) {  // 默认参数和可选参数
        if(lastName !== undefined) {
            return firstName + lastName;
        }
        else {
            return firstName;
        }
    }
    function addNumber(...args:number[]) {  // 多参数函数
        var result = 0;
        for(var i = 0; i < args.length; i = i + 1) {
            result = result + args[i];
        }
        return result;
    }

    // 当然也支持了函数重载

    // 泛型
    function createArray<T>(length:number, value:T):Array<T> {
        const array:Array<T> = [];
        for(var i = 0; i < length; i = i + 1) {
            array.push(value);
        }
        return array;
    }

    // 内置属性(Error, Number, String...)与JavaScript中相同;
    // DOM和BOM对象:
    // 1.window 2.Document 3.HTMLElement 4.NodeList 5.Event 6.DocumentFragment(未知)
})();