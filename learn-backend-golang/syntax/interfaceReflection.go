package main

import (
	"fmt"
	"reflect"
)

type Namer interface {
	method1(a int) int
	method2(b int) int
}

type Shaper interface {
	Area() float32
}

type Square struct {
	side float32
}

func (sq *Square) Area() float32 {
	return sq.side * sq.side
}

func testInterface1() {
	sq1 := new(Square)
	sq1.side = 4

	var areaIntf Shaper = sq1

	fmt.Println(areaIntf.Area())
}

type Rectangle struct {
	length, width float32
}

func (r Rectangle) Area() float32 {
	return r.length * r.width
}

func testInterface2() { // 实现了某接口的方法，即实现了该接口
	sq1 := &Square{3}
	rec := &Rectangle{3, 4}

	shaps := []Shaper{sq1, rec}
	for n, _ := range shaps {
		fmt.Println(shaps[n], shaps[n].Area())
	}
}

func testStructTypeAssert() { // 类型断言
	var areaIntf Shaper
	sq1 := new(Square)
	sq1.side = 4

	areaIntf = sq1
	if t, ok := areaIntf.(*Square); ok {
		fmt.Printf("the type of areaIntf is %T\n", t)
	}
}

func testStructTypeSwitch() { // 类型判断type-switch
	var areaIntf Shaper
	switch t := areaIntf.(type) {
	case *Square:
		fmt.Println('1', t)
	case *Rectangle:
		fmt.Println("2", t)
	default:
		fmt.Println("3", t)
	}
}

// 测试一个值是否实现了某个接口
type Stringer interface {
	String() string
}

// if sv,ok := v.(Stringer); ok  {
// 	fmt.Printf("v implements String(): %s\n",sv.String())
// }

type List []int

func (l List) Len() int {
	return len(l)
}
func (l *List) Append(val int) {
	*l = append(*l, val)
}

type Appender interface {
	Append(int)
}

func CountInto(a Appender, start, end int) {
	for i := start; i <= end; i++ {
		a.Append(i)
	}
}

type Lenner interface {
	Len() int
}

func LongEnouth(l Lenner) bool {
	return l.Len()*10 > 42
}

func testUsingMethodSetAndInterface() { // 使用方法集与接口
	var lst List
	if LongEnouth(lst) {
		fmt.Printf("- lst is long enough \n")
	}
	plst := new(List)
	CountInto(plst, 1, 10)
	if LongEnouth(plst) {
		fmt.Printf("- plst is long enough \n")
	}
}

// 下面是一个例子

func Sort(data Sorter) {

}

type Sorter interface {
	Len() int
	Less(i, j int) bool
	Swap(i, j int)
}

type IntArray []int

func (p IntArray) Len() int           { return len(p) }
func (p IntArray) Less(i, j int) bool { return p[i] < p[j] }
func (p IntArray) Swap(i, j int)      { p[i], p[j] = p[j], p[i] }

func testSort() {
	data := IntArray{1, 2, 3, 4, 5}
	Sort(data)
}

// 反射
func TestReflect() {
	var x float64 = 3.4
	v := reflect.ValueOf(x)
	fmt.Println("settability of v", v.CanSet())

	v = reflect.ValueOf(&x) // take the address of x
	fmt.Println("type of v:", v.Type())
	fmt.Println("settability of v:", v.CanSet())

	v = v.Elem()
	fmt.Println("the Elem of v is:", v)
	fmt.Println("settability of v:", v.CanSet())
	v.SetFloat(3.1415)
	fmt.Println(v.Interface())
	fmt.Println(v)
}
