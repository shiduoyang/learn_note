class Class1:
    x: 1
    def __init__(self, value):
        super().__init__()
        self.value = value
    def __str__(self):
        return repr(self.value)
    
    def func1(self, value):
        return value + 1

class Class2(Class1):
    def __init__(self, value, value2):
        super().__init__(value)
        self.value2 = value2
    def __str__(self):
        return repr(self.value) + repr(self.value2)
    def func1(self, value):
        return value + 2
    def func2(self):
        return 1

class TempClass1:
    def func1(self, value):
        return value + 3
class TempClass2:
    def func1(self, value):
        return value + 4
class Class3(Class2, TempClass1, TempClass2):  #多重继承
    pass

class1 = Class1('a')
print(class1)
print(class1.func1(1))
class2 = Class2('a', 'b')
print(class2)
print(class2.func1(1))
print(class2.func2())
class3 = Class3('a', 'b')
print(class3.func1(1))  #深度优先，从左至右，左边没找到，才会搜索右边