package example

import "fmt"

type Any interface{}
type Car struct {
	Model        string
	Manufacturer string
	BuildYear    int
}

type Cars []*Car

// 定义一个通用的Process函数，它接收一个对一辆car的f函数 作为参数
func (cs Cars) process(f func(car *Car)) {
	for _, c := range cs {
		f(c)
	}
}

// 在上面的基础上，实现一个查找函数来获取子集合
func (cs Cars) FindAll(f func(car *Car) bool) Cars {
	cars := make([]*Car, 0)
	cs.process(func(c *Car) {
		if f(c) {
			cars = append(cars, c)
		}
	})
	return cars
}

// 实现Map-functionality, 从每个car对象中产出某些东西
func (cs Cars) Map(f func(car *Car) Any) []Any {
	result := make([]Any, 0)
	ix := 0
	cs.process(func(c *Car) {
		result[ix] = f(c)
		ix++
	})
	return result
}

func testCars() {
	ford := &Car{"Fiesta", "Ford", 2008}
	bmw := &Car{"XL 450", "BMW", 2011}
	merc := &Car{"D600", "Mercedes", 2009}
	bmw2 := &Car{"X 800", "BMW", 2008}

	allCards := Cars([]*Car{ford, bmw, merc, bmw2})
	allNewBmws := allCards.FindAll(func(car *Car) bool {
		return (car.Manufacturer == "BMW") && (car.BuildYear > 2010)
	})
	fmt.Println("All cars", allCards)
	fmt.Println("All BMWs", allNewBmws)

	// // arr := []int{1,2,3,4,5}
	// cardList := []Car{
	// 	{Model: "1", Manufacturer: "", BuildYear: 1991},
	// }
	// cars Cars := cardList

	// // cards:= new(Cars)
	// // allNewBMWs :=
}
