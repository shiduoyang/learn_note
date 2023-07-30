import os  #与操作系统交互的函数
import glob  #提供了一个函数从目录通配符搜索中生成文件列表
import sys  #命令行参数以链表形式存储于sys模块的argv变量。
import re  #字符串正则匹配
import math  #底层C函数库
import random #random
import urllib  #处理从URL接收的数据
import smtplib  #用于发送电子邮件
from datetime import date  #日期
import zlib  #压缩
from timeit import Timer  #性能度量
import threading, zipfile
import logging

def testOs():
    '''test os
    '''
    print('in testOs')
    print(os.getcwd())
    # print(os.chdir('/server/temp')) #change current working dicectory
    os.system('mkdir today')
    os.system('rmdir today')
    # dir(os)
    # help(os)

def testGlob():
    '''test glob
    '''
    print('in testGlob')
    arr = glob.glob('*.py')
    print(arr)

def testSys():
    '''test sys

    sys.argv stdin stdout stderr
    '''
    print('in testSys')
    print(sys.argv)

def testRe():
    '''test re
    '''
    print('in testRe')
    print(re.findall(r'\bf[a-z]*', 'which foot or hand fell fastest'))

def testMath():
    '''test math
    '''
    print('in testMath')
    print(math.cos(math.pi / 4.0))
    print(random.choice([1, 2, 3]))

def testUrllib():
    '''test urllib
    '''
    print('in testUrllib')
    
def testDate():
    '''test date
    '''
    print('in testDate')
    print(date.today())
    print(date(1997, 10, 10))

def testZlib():
    print('in testZlib')
    s = b'witch which has xosnogewngoewgjoew which has'
    print(len(s), s)
    t = zlib.compress(s)
    print(len(t), s)
    u = zlib.decompress(t)
    print(len(u), u)
    v = zlib.crc32(s)
    print(v)

def testTimeit():
    print('in testTimeit')
    print(Timer('t=a;a=b;b=t', 'a=1;b=2').timeit())

class AsyncFunc1(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self) #????? 为什么不能用super
        self.a = 1
    
    def run(self):
        result = self.a + 1
        print(result)
        return result

def testThread():
    print('in testThread')
    backgrade = AsyncFunc1()
    backgrade.start()
    backgrade.join() #waiting for the background task to finish

def testLog():
    logging.debug('Debugging information')
    logging.info('informational message')
    logging.warning('warning')
    logging.error('error ')
    logging.critical('Critical error -- shutting down')

testOs()
testGlob()
testSys()
testRe()
testMath()
testUrllib()
testDate()
testZlib()
testTimeit()
testThread()
testLog()