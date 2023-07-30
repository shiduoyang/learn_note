/**
 * simple dynamic string : SDS
 */
struct Sdshdr{
    int len;
    int free;
    char buf[];
};


