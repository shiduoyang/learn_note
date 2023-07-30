package main

import (
	"fmt"
	"math/rand"
	"strings"
	"time"
)

func testBool() {
	var a = 1
	fmt.Println(a == 1, !(a == 1), (a == 1) && (1 > 0))
}

func testNumber() {
	var a int
	var b int32
	a = 15
	// b = a + a // 这是错的，a b 类型不同
	b = int32(a) + int32(a) // 强转类型之后正确
	b = b + 5
	fmt.Println(a, b, c)
}

func testComplex() { // 复数类型
	var c1 complex64 = 5 + 10i
	fmt.Println(c1)
	var c complex64 = complex(1, 5)
	fmt.Println(c)
	fmt.Println(real(c), imag(c)) // 分别取复数的实部和需部
}

func testByteCalculate() { //位运算
	var x uint8 = 15
	var y uint8 = 4
	fmt.Println(x&y, 3|2)

	fmt.Println(1 << 3) // 移位
}

func testRandomNum() { // 随机数
	a := rand.Int()
	fmt.Println(a)
}

func testTypeAlias() { // 类型别名
	type TZ int
	var a TZ = 1
	fmt.Println(a)
}

func testChar() { // 字符类型
	var ch byte = 65
	fmt.Println(ch)
}

func testString() { // 字符串
	str := "hello" +
		"world"
	fmt.Println(str)
	// 字符串拼接的更好方法： string.Join bytes.Buffer

	strSplit := strings.Split(str, " ")
	fmt.Println(strings.Join(strSplit, "123"))
}

func testTime() { // 时间和日期
	t := time.Now()
	fmt.Println(t)
	fmt.Printf("%02d.%02d.%4d\n", t.Day(), t.Month(), t.Year())

	week := 60 * 60 * 24 * 7 * 1e9
	week_from_now := t.Add(time.Duration(week))
	fmt.Println(week_from_now)
}

func testPointer() { // 指针
	var i1 = 5
	fmt.Printf("An integer: %d, it's location in memory: %p\n", i1, &i1)
	var intP *int = &i1
	fmt.Printf("the value at memory location %p is %d \n", intP, *intP)

	// & 取地址  ； * 访问
	// var == *(&var)
}

func testMap() { // map 是引用类型
	var map1 map[string]int
	map1 = map[string]int{"1": 1}

	mapCreated := make(map[string]float32)
	mapCreated["k1"] = 1

	fmt.Println(map1["1"])
	fmt.Println(mapCreated["k1"])

	val, isPresent := map1["k2"] // 检查某key是否存在
	if isPresent {
		fmt.Println('1')
	} else {
		fmt.Printf("map1 contains k2,val is %d", val)
	}

	for key, val := range map1 { // for range 来循环读取map
		fmt.Println(key, val)
	}
}
