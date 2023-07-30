try:
    10 * (1 / 0)
except ZeroDivisionError:
    print('ZeroDivisionError ')

try:
    raise NameError('HiThere') #抛异常
except NameError:
    print('An exception flew by!')
    # raise
finally:
    print('done')

class MyError(Exception):
    def __init__(self, value):
        self.value = value
    
    def __str__(self):
        return repr(self.value)

try:
    raise MyError('HiThere') #抛异常
except MyError as e:
    print('An exception flew by!', e.value)
finally:
    print('done')