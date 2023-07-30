import libSelf
print(libSelf.add(1, 2))

from libSelf import add
print(add(1, 2))

from libSelf2 import *
func1()
func2()

import sys
print(dir(sys)) #无参数调用时，dir()函数返回当前定义的命名列表
