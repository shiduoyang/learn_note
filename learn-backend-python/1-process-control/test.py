def testIf(x: int):
    print('in testIf')
    if x < 0:
        print('x < 0')
    elif x == 0:
        print('x = 0')
    else:
        print('x > 0')

def testFor(words: [str]):
    print('in testFor')
    for w in words:
        print(w, len(w))
        
def testRange():
    print('in testRange')
    arr1 = range(3)  #0,1,2
    arr2 = range(4, 7)  #4,5,6
    arr3 = range(1, 10, 3)  #1,4,7 步长
    for i in range(len(arr1)):
        print(i, arr1[i])
    for item in arr2:
        print(item)
    for item in arr3:
        print(item)

def testBreakAndContinue():
    print('in testBreakAndContinue')
    for n in range(1, 11):
        if (n % 2 == 0):
            print(n)
            continue

    for n in range(1, 11):
        if (n % 5 == 0):
            print(n)
            break
        else:
            print(n, '%5 !=0')

def testPass():
    print('in testPass')
    pass  #什么也不做，用于在语法上必须要有什么语句，但程序什么也不做的场合

def testFunc():
    "document of func"
    print('in testFunc')
    pass

def testDefaultParams1(a, l=[]):
    '重要警告：默认值只被赋值一次，这使得默认值是可变对象时会有所不同'
    print('in testDefaultParams1')
    l.append(a)
    return l

def testDefaultParams2(a, l=None):
    print('in testDefaultParams2')
    if l is None:
        l = []
    l.append(a)
    return l

def testKeyWordsParams(voltage, stage='a stiff', action='voom'):
    print('in testKeyWordsParams')
    print(voltage, stage, action)

def testVariableNumberParams(a, *args):
    print('in testVariableNumberParams')
    print(a.join(args))

def testLambda(n):
    return lambda x: x + n #匿名函数

def documentStr():
    """Do nothing, but document it.(对象用途的简介)

    No, really, it doesn't do anything(详细描述)
    """
    pass

testIf(1)
testFor(['a', 'ab', 'abc'])
testRange()
testBreakAndContinue()
testPass()
testFunc()
print(testDefaultParams1(1)) #[1]
print(testDefaultParams1(2)) #[1,2]
print(testDefaultParams1(3)) #[1,2,3]
print(testDefaultParams2(1)) #[1]
print(testDefaultParams2(2)) #[2]
print(testDefaultParams2(3))  #[3]
testKeyWordsParams('a', 'b')
testVariableNumberParams('a', 'b', 'c')
print(testLambda(2)(3))