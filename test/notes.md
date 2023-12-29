## String Assertions

`isString()` test if the value passed in as a string
`isNotString()` tests if the value passed in is not a string
`include()` which is also an array assertion works on string in the same way but just looks for a substring in the actual value
`notInclude()` checks if a substring is not within a actual string value 
`match()` checks if the actual value passed in matches the regex expression (2nd argument)
`notMatch()` checks if actual value does not match regex expression
```js

```
GOTCHAS:


resource(s):
[1]: [assert.isString](https://www.chaijs.com/api/assert/#method_isstring)
[2]: [assert.isNotString](https://www.chaijs.com/api/assert/#method_isnotstring)
[3]: [assert.include](https://www.chaijs.com/api/assert/#method_include)
[4]: [assert.notInclude](https://www.chaijs.com/api/assert/#method_notInclude)