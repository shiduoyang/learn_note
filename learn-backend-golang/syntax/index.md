## 一：go关键字

共25个关键字，我擅自将他们分为两类

1. 通用的（其他语言常见，如流程控制语句等）
    * break
    * default
    * func
    * interface
    * case
    * map
    * else
    * switch
    * const
    * if
    * continue
    * for
    * import
    * return 

1. 特殊的（需要进一步了解的）
    * select
    * defer
    * go
    * struct
    * chan
    * goto
    * package
    * fallthrough
    * range
    * type
    * var

## 二：预定义标识符

36个预定义标识符，包含一些基本类型的名称和一些内置函数

1. 内置函数
    * append close copy len make new print println recover cap panic real imag recover 
2. 数值类
    * uint uint8 uint16 uint32 uint64
    * int int8 int16 int32 int64
    * float32 float64
    * complex complex64 complex128
3. 非数值类
    * bool byte false nil string true
    * uintptr（指针类型的整数值）
    * iota （常量计数器）

## 三：常量和变量

* 常量用const: const a = 1
* 变量用var ： var a int

## 四: 数据类型

1. 布尔
2. 数字类型
3. 字符串类型
4. 派生类型：指针 数组 结构体 channel 函数 切片 接口 map

延伸：
1. 数组
    1. 把一个大数组传递给函数会耗费很多内存，有两种方法可以避免这种情况
        1. 传递数组的指针
        2. 传递数组的切片
2. 切片
    1. 切片是对数组一个连续片段的引用，因此一个切片和其对应数组的其他切片是共享存储的
    2. 切片的cap来测量切片最长可以达到多少，它=切片长度+数组除切片外的长度
    3. 切片的好处就是它是引用，所以不需要额外的内存来进行内存拷贝
    4. 切片在内存中的组织实际上是一个有3个域的结构体
        1. 指向相关数组的指针
        2. 长度
        3. 容量
    5. 如果想增加切片的容量，我们必须创建一个新的更大的切片，并把原切片的内容都拷贝过来
3. map 散列表

**go语言的数组是值类型，因此当把一个数组赋值给另一个时，需要做一次内存的拷贝**

## 五：流程控制

1. if else 
2. switch case
3. for 
4. select case //TODO
5. defer : 在函数返回之前执行某操作（用来关闭连接，追踪代码的执行等）
6. goto 
7. recover //TODO
8. panic  // TODO
9. os.Exit // TODO
10. break

## 六： 函数

1. 多参数
2. 空白符
3. 变长参数 arg... 
4. defer
5. 内置函数
    * close 管道通信
    * len返回长度  cap返回数组，切片，管道的最大容量
    * new make 分配内存
    * copy append 复制和连接切片
    * panic recover 错误处理机制
    * print println
    * complex real imag 复数相关
6. 递归
7. 函数作为参数, 闭包，函数作为返回值
8. 结构体
    1. Go通过类型别名的结构体的形式支持用户自定义类型
    2. 如Person是一个机构体的话，new(Person)等价于&Person{}
    3. go方法是作用在接收者上的一个函数，接收者是某种类型的变量（可以是几乎任何类型）
    4. 方法接收者最常见的是一个指向某类型的指针，因为我们不想要一个实例的靠背，特别是某类型是结构体时，更是如此
    5. 所以，在指向某结构体的指针上定义方法，该方法就能改变接收者的数据
    * golang自动的GC；SetGinalizer(对象被垃圾回收之前执行该函数)
9. 接口与反射
    0. go 没有类，而是松耦合的类型、方法对接口的实现
    1. 接口用来说明对象的行为
    2. 类型不需要显示的声明它实现了某接口，接口被隐式的实现，只要类型实现了接口中的方法，它就实现了此接口
    3. 多个类型可以实现同一接口
    4. 反射： 在运行时检查类型和变量, 动态的设置值，调用方法等
    5. 封装，继承与多态的实现
        1. 封装：包范围内的与包导出的
        2. 继承：
        3. 多态：用接口实现，某类型的实例可以赋给它所实现的任意一个接口类型的变量

10. 协程与通道
