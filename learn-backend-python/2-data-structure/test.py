def testList():
    print('in testList')
    a = [1, 2, 3, 3]
    print(a.count(3))
    a.append(333)
    print(a)
    print(a.index(333))
    a.remove(333)
    print(a)
    a.reverse() #颠倒
    print(a)
    a.sort()
    print(a)
    value1 = a.pop() #数组末尾弹出
    print(value1, a)
    a.insert(1, 5) #
    print(a)

class StackTest:
    def __init__(self):
        self.a = []
    def push(self, x):
        self.a.append(x)
    def pop(self):
        if len(self.a) < 1:
            return -1
        return self.a.pop()

from collections import deque
class QuqueTest:
    def __init__(self):
        self.a = deque([])
    def push(self, x):
        self.a.append(x)
    def get(self):
        return self.a.popleft()

def testFilter():
    '''返回判定为真的元素组成的链表
    '''
    print('in testFilter')    
    def f(x): return x % 3 == 0
    arr = filter(f, range(2, 10))
    for item in arr:
        print(item)

def testMap():
    '''为每个元素一次调用函数，并将返回值构成一个链表
    '''
    print('in testMap')
    seq = range(3)
    def add(x, y): return x + y
    arr = map(add, seq, seq)
    for item in arr:
        print(item)

def testListDeduction():
    '''列表推导式
    '''
    print('in testListDeduction')
    print('arr1:')
    arr = [x ** 2 for x in range(3)]
    print(arr)
    print('arr2:')
    arr2 = [(x, y) for x in [1, 2, 3] for y in [4, 5, 6] if x != y]
    print(arr2)

def testListDeduction2():
    '''嵌套的列表推导式，是对for后面的内容进行求值

    代码等价于: \n
    arr2 = [] \n
    for i in range(4): \n
        arr2.append(row[i] for row in matrix)
    '''
    print('in testListDeduction2')
    matrix = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12]
    ]
    arr = [[row[i] for row in matrix] for i in range(4)]
    print(arr)

def testDel():
    '''从列表中按给定的索引而不是值来删除一个子项
    '''
    print('in testDel')
    a = [1, 2, 3, 4, 5, 6, 7]
    print(a)
    del a[0]
    print(a)
    del a[2:4]  #删除序号为：2,3的子项
    print(a)
    del a[:]
    print(a)
    del a

def testTuple():
    '''元组测试

    一个元组由数个逗号分隔的值组成\n
    一对空的括号可以创建空元组\n
    一个单元素元组可以在值的后面跟一个逗号
    '''
    print('in testTuple')
    t = 1, 2, 3
    print(t)
    x, y, z = t
    print(x, y, z)
    empty = ()
    print(empty)
    singleton = 1,
    print(singleton)

def testSet():
    '''集合测试

    集合是无序不重复的集。
    集合支持关系测试、消除重复元素\n
    联合，交，差，对称差集等数学运算
    '''
    print('in testSet')
    fruit = set(['apple', 'orange', 'apple', 'pear', 'orange', 'banana'])
    print('orange' in fruit)
    print('xxxx' in fruit)

    a = set('abcde')
    b = set('defg')
    print(a)
    print(b)
    print(a - b) #差集
    print(a & b) #交集
    print(a | b) #并集
    print(a ^ b)  #去除重复之后的并集???

def testDict():
    ''' 字段测试

    keys 将返回关键词组成的无序列表
    '''
    print('in testDict')
    dict1 = {'a': 1, 'b': 2}
    print(dict1)
    print(dict1.keys())
    dict2 = dict([('a', 1), ('b', 2)])
    print(dict2)
    print(dict2.keys())
    dict3 = {x: x ** 2 for x in [1, 2, 3]}
    print(dict3)
    print(dict3.keys())

def testLoopSkill():
    '''enumerate();zip();reversed();sorted();iteritems();

    序列中循环时，可以用enumerate函数同时得到索引位置和对应值\n
    同时循环两个或更多的序列，可以使用zip()整体打包\n
    逆向循环序列\n
    sorted函数，生成一个新的已排序的序列
    '''
    print('in testLoopSkill')
    for i, v in enumerate([1, 2, 3]):
        print(i, v)

    print('\n')
    for o, a, in zip([1, 2, 3], ['a', 'b', 'c']):
        print(o, a)
    
    print('\n')
    for i in reversed(range(1, 4)):
        print(i)

    print('\n')
    for i in sorted(set([1, 3, 2])):
        print(i)
    
    print('\n')
    for k, v in {'a': 1, 'b': 2}.items():
        print(k, v)

testList()

print('in test stack')
stack1 = StackTest()
stack1.push(1)
stack1.push(2)
stack1.push(3)
print(stack1.pop())
print(stack1.pop())
print(stack1.pop())
print(stack1.pop())

print('in testQueue')
queue1 = QuqueTest()
queue1.push(1)
queue1.push(2)
queue1.push(3)
print(queue1.get())
print(queue1.get())
print(queue1.get())

testFilter()
testMap()
testListDeduction()
testListDeduction2()
testDel()
testTuple()
testSet()
testDict()
testLoopSkill()