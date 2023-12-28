## Testing if a value is within a specific range

`appromixately()` tells us that the actual value should be eqaul to the expected value given a range of delta (+/= amount of change from expected)

assert.approximately(1, 0, 2) === -2 to 2 (1 (actual) is approximately equal to 0 (expected) b/c its in range)

```js
`approximately(actual, expected, delta, [message])`
```
GOTCHAS:


resource(s):
[1]: [assert.approximately](https://www.chaijs.com/api/assert/#method_approximately)