package main

import (
	"fmt"
	"reflect"
	"strings"
)

// 结构体定义

type identifier struct {
	a, b int
}

func testStruct1() {
	var s identifier
	s.a = 1
	s.b = 2
	fmt.Println(s)
}

func testStruct2() {
	type struct1 struct { // 给这个XXX的结构体起了个别名交struct1
		i1  int
		f1  float32
		str string
	}
	ms := new(struct1)
	ms.i1 = 10
	ms.f1 = 1
	ms.str = ""
	fmt.Println(ms)
}

type Person struct {
	firstName string
	lastName  string
}

func upPerson(p *Person) {
	p.firstName = strings.ToUpper(p.firstName)
}

func testStruct3() { //  new(Person)等价于Person{}
	// 1-struct as a value type 值类型
	var pers1 Person
	pers1.firstName = "1"
	pers1.lastName = "2"
	upPerson(&pers1)

	// 2-struct as a pointer 指针
	var pers2 *Person = new(Person)
	pers2.firstName = "1" // <=>  *pers2.firstName ="1"这是go的语法糖
	pers2.lastName = "2"
	(*pers2).lastName = "3"
	// pers2.lastName = "1"
	upPerson(pers2)

	// 3-struct as a literal 字面量
	pers3 := &Person{"1", "2"}
	upPerson(pers3)

	// type myStruct struct{ i int }
	// ms := &myStruct{1}
	// fmt.Println(ms.i)

	// ms2 := myStruct{2}
	// fmt.Println(ms2.i)
}

type TagType struct {
	field1 bool "An important answer"
	field2 int  "How much there are"
}

func testStruct4() { // 标签
	tt := TagType{true, 1}
	for i := 0; i < 2; i++ {
		refTag(tt, i)
	}
}

func refTag(tt TagType, ix int) {
	ttType := reflect.TypeOf(tt)
	ixField := ttType.Field(ix)
	fmt.Printf("%v\n", ixField.Tag)
}

type TwoInts struct {
	a int
	b int
}

func (tn *TwoInts) AddThem() int {
	return 0
}

func (tn *TwoInts) AddToParam(param int) int { // 接收者最常见的是一个指向某类型的指针（因为我们不想要一个实例的拷贝)
	return 1
}

func testMethod() {
	two1 := new(TwoInts)
	two1.a = 1
	two1.b = 2
	two1.AddThem()

	two2 := TwoInts{3, 4}
	two2.AddThem()
}
