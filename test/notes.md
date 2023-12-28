## Use double equals to assert equality

`equal()` compares objects using `==` (loose equality)
`notEqual()` test if 2 objects are not equal `!=` (loose inequality)

GOTCHAS:
* Objects with the same keys andd values within them are not the same object aka they are
not equal... at least with loose equality 

resource(s):
[1]: [assert.equal](https://www.chaijs.com/api/assert/#method_equal)
[2]: [assert.notEqual](https://www.chaijs.com/api/assert/#method_notequal)