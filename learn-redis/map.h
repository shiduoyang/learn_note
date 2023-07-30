/**
 * 哈希表节点
 */
typedef struct dictEntry
{
    void *key;
    union {
        void *val;
        unsigned int tu64;
        int ts64;
    } v;

    //指向下一个哈希表节点，行程链表
    struct dictEntry *next;
};

/**
 * 哈希表
 */
typedef struct dictht
{
    //哈希表数组
    dictEntry **table;
    //哈希表大小
    unsigned long size;
    //哈希表大小掩码，用于计算索引值
    //总是等于size-1，哈希算法用
    unsigned long sizemask;
    //该哈希表已有节点的数量
    unsigned long used;
};

typedef struct dictType
{
    //计算hash值的函数
    unsigned int (*hashFunction)(const void *key);

    //复制键的函数
    void *(*keyDup)(void *privdata, const void *key);

    //复制值的函数
    void *(*valdup)(void *privdata, const void *obj);

    //对比键的函数
    void *(*keyCompare)(void *privdata, const void *key1, const void *key2);

    //删除键的函数
    void (*keyDestructor)(void *privdata, void *key);

    //删除值的函数
    void (*valDestructor)(void *privdata, void *obj);
} dictType;

typedef struct dict
{
    //保存一簇用于操作制定类型键值对对函数，
    //redis会为用途不同对字典设置不同对类型特定函数
    dictType *type;

    //私有数据，保存需要传给那些类型特定函数当可选参数
    void *privdata;

    //哈希表，ht[0]作为存储使用，ht[1]rehash时使用
    dictht ht[2];

    //rehash索引
    //当rehash不再进行时，值为-1
    int trehashidx;
};
