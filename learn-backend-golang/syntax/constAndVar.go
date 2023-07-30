package main

import "fmt"

// 常量

const (
	beef, two, three = "eat", 2, "veg"
)
const Monday, Thesday, Wedensday, Thursday, Friday, Saturday = 1, 2, 3, 4, 5, 6

const ( // 表枚举
	Unknown = 0
	Female  = 1
	Male    = 2
)

const (
	a = iota
	b
	c
)

// 变量 变量声明后，赋该类型的0值

var d int
var e float64
var f string

var (
	h int
	i float64
	g string
)

func test() { // := 初始化时圣罗变量的类型，由系统自动推断
	k, h := 1, 2
	fmt.Println(k, h)
}

var Pi float64

func init() { // init函数不能够被人为调用，而在包完成初始化后自动执行，故可以对全局变量做初始化
	Pi = 3.14
}
