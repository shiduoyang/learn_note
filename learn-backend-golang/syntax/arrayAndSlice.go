package main

import "fmt"

func testArr() {
	var arr1 [5]int

	for i := 0; i < len(arr1); i++ {
		arr1[i] = i * 2
	}
}

func testArr2() {
	a := [...]string{"a", "b", "c"}
	for i, v := range a {
		fmt.Println("Array item", i, "is", a[i], v)
	}
}

func TestArray() { // 数组  是一种 值类型！！！
	var arr1 = new([5]int)
	for i := range arr1 {
		arr1[i] = i
	}
	// := arr1 引用相同
	// := *arr1 发生了内存拷贝
	arr2 := *arr1
	arr2[1] = 10
	for i, val := range arr2 {
		fmt.Printf("arr2 index:%d, val is%d \n", i, val)
	}

	for i, val := range arr1 {
		fmt.Printf("arr1 index:%d, val is%d \n", i, val)
	}

	// 数组常量
	var arrKeyValue = [5]string{3: "1", 4: "2"}
	fmt.Println(arrKeyValue)

	var arrLazy = [...]int{1, 2, 3, 4, 5}
	fmt.Println(arrLazy)
}

func Sum(a *[3]int) int {
	sum := 0
	for _, v := range a {
		sum += v
	}
	return sum
}

func testArray2() { //传递数组的指针
	array := [3]int{1, 2, 3}
	x := Sum(&array)
	fmt.Println(x)
}

func testSlice() { // 切片
	arr1 := [5]int{1, 2, 3, 4, 5}
	var slice1 []int = arr1[0:4]
	fmt.Println(len(slice1))

	var arr = [5]int{1, 2, 3, 4, 5} // 将切片传给函数
	testParamsIsOneSlice(arr[:])

	var slice2 []int = make([]int, 10) // 用make来创建一个切片
	for i := 0; i < len(slice2); i++ {
		slice2[i] = 5 * i
	}
	for i := 0; i < len(slice1); i++ {
		fmt.Printf("Slice at %d is %d\n", i, slice1[i])
	}
}

func testParamsIsOneSlice(a []int) int {
	return 0
}

func testSliceRange() {
	var slice1 []int = make([]int, 4)
	slice1[0] = 1
	slice1[1] = 2
	slice1[2] = 3
	slice1[3] = 4
	for _, val := range slice1 {
		val *= 2
	}
	for _, val := range slice1 {
		fmt.Printf("val is %d", val)
	}
}

func testSliceCopy() {// copy 和append 
	s1From := []int{1, 2, 3}
	s1To := make([]int, 10)
	n := copy(s1To, s1From)
	fmt.Printf("Copied %d elements\n", n)

	s13 := []int{1, 2, 3}
	s13 = append(s13, 4, 5, 6)
	fmt.Println(s13)
	
}
