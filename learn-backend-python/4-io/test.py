print('${0} and ${1}'.format('a', 'b'))
print('My name is {name}'.format(name='ysd'))
import math
print('The value of PI is approximately {pi:.3f}'.format(pi=math.pi))
print('The value of a is approximately {0: 3}'.format(1))
print('a: {a:d};b: {b:d}'.format(**{'a': 1, "b": 2}))

fWrite = open('./temp', 'w')
fWrite.write('hello')
fWrite.close()
fRead = open('./temp', 'r')
print(fRead.read())
