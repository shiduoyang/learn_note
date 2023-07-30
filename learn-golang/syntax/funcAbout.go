package main

import "fmt"

func Multiplay3Nums(a int, b int, c int) int {
	return a * b * c
}

func MinMax(a int, b int) (min int, max int) { //named return variables
	if a < b {
		min, max = a, b
	} else {
		min, max = b, a
	}
	return
}

func testBlankIdentifier() { // blank identifier 空白符
	min, _ := MinMax(1, 2)
	fmt.Println(min)
}

func changeParamsOutsideFunc(a int, b int, reply *int) { // 通过传递引用，改变外部变量的值
	*reply = a * b
}

func testChangeParamsOutsideFunc() {
	n := 0
	replay := &n
	changeParamsOutsideFunc(1, 2, replay)
	fmt.Println("Multiply", *replay)
}

func testLenChangeableParams(a int, b int, arg ...int) int { // 变长参数
	result := 0
	for _, v := range arg {
		result += v
	}
	return a + b + result
}

func Add(a, b int) {
	fmt.Printf("sum is %d", a+b)
}

func callback(y int, f func(int, int)) { // 函数作为参数
	f(y, 2)
}

func testCloser() { // 闭包（函数访问其自身作用域之外的变量
	i := 0
	g := func(i int) { fmt.Println(i) }
	g(i)
}

func testReturnFunc() func(b int) int { // 该函数返回了一个函数
	return func(b int) int {
		return b + 2
	}
}
