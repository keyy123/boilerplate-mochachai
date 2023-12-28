## Use Assert.isOK and Assert.isNotOK:

`isTrue()` and `isNotTrue()` are used to test explicitly for `true` or anything that is not the value `true`

GOTCHAS:

1. Truthy values (like objects, etc) are not the same as `true` boolean value

2. Double negation (!!) evaluates truthy values into boolean

3. `isTrue` and `isNotTrue` check if the value is equal to `true` or `!true`
 -? : How strict is the equality here?
resource(s):
[1]: [assert.isTrue](https://www.chaijs.com/api/assert/#method_istrue)
[2]: [assert.isNotTrue](https://www.chaijs.com/api/assert/#method_isnottrue)