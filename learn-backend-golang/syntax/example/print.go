package example

import (
	"os"
	"strconv"
)

type Stringer interface {
	String() string
}

type Day int

var dayName = []string{"Monday", "Theusday"}

func (day Day) String() string {
	return dayName[day]
}

func print(args ...interface{}) { // 利用反射包，获取了类型信息
	for i, arg := range args {
		if i > 0 {
			os.Stdout.WriteString("")
		}
		switch a := arg.(type) {
		case Stringer:
			os.Stdout.WriteString(a.String())
		case int:
			os.Stdout.WriteString(strconv.Itoa(a))
		case string:
			os.Stdout.WriteString(a)
		default:
			os.Stdout.WriteString("???")
		}
	}
}
