package main

import "fmt"

func testProcessControl() { // if else
	if 1 > 0 {
		fmt.Println("1")
	} else {
		fmt.Println("2")
	}

	result, err := func1()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(result)
}

func func1() (a int, e error) {
	if 1 > 0 {
		return 0, fmt.Errorf("params error")
	}
	return 1, nil
}

func testSwitch(a int) { //switch
	switch a {
	case 1:
		fmt.Println("1")
	case 2:
		fmt.Println("2")
	case 3:
		fmt.Println("3")
		fallthrough // 默认当匹配到3之后，后续的case4...不会执行，可以通过fallthrough让后续的逻辑继续执行
	case 4:
		fmt.Println("4")
	default:
		fmt.Println("3")
	}
}

func testFor() { // for break and continue
	for i := 0; i < 5; i++ {
		fmt.Printf("This is the %d interation\n", i)
		if i == 3 {
			continue
		}
		if i == 4 {
			break
		}
	}

	var j int = 5
	for j >= 0 {
		j = j - 1
		fmt.Println(j) // 4 3 2 1 0 -1
	}

	str := "123"
	for index, runed := range str {
		fmt.Printf("%-2d  %d \n", index, runed)
	}
}

func testGoto() { // goto
	i := 0
HERE:
	fmt.Print(i)
	i++
	if i == 5 {
		return
	}
	goto HERE
} // 输出01234

func testLabelAndContinue() { // label and continue
LABEL1:
	for i := 0; i <= 5; i++ {
		for j := 0; i <= 5; j++ {
			if j == 4 {
				continue LABEL1
			}
			fmt.Printf("i is %d, and j = %d\n", i, j)
		}
	}
}

func testDefer() { // defer
	fmt.Printf("1")
	defer function2()
	fmt.Printf("2")
}

func function2() {
	fmt.Printf("3")
}

func testDefer2() { // 多个defer注册时，他们会逆序执行，后注册的先执行
	for i := 0; i < 5; i++ {
		defer fmt.Printf("%d", i)
	}
}
