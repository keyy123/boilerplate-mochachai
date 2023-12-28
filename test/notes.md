## Use double equals to assert equality

`deepEqual()` compares objects using `===` (strict equality)
`notDeepEqual()` test if 2 objects are not equal `!==` (strict inequality)

GOTCHAS:
* What is being checked in deep equality is the properties within the object type and depending on the data structure used, the order of the properties or indices. 

resource(s):
[1]: [assert.deepEqual](https://www.chaijs.com/api/assert/#method_deepequal)
[2]: [assert.notDeepEqual](https://www.chaijs.com/api/assert/#method_notdeepequal)
[3]: [Deep equality in JS](https://www.syncfusion.com/blogs/post/deep-compare-javascript-objects.aspx) 