typedef struct listNode {
    struct listNode *prev;
    struct listNode *next;
    void *value;
} ListNode;

typedef struct list{
    listNode *head;
    listNode *tail;
    unsigned long len;
    void *(*dup)(void *ptr);//节点值复制函数
    void *(*free)(void *ptr); //节点值释放函数
    int *(*free)(void *ptr, void *key);//节点值对比函数
} List;