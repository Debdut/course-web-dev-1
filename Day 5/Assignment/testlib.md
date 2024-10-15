Today we're building a testing library called `testlib`

1. Implement a function called `equalArray(arr1, arr2)` that returns true if the two arrays are equal, and false otherwise. Note that the arrays are equal if they have the same length and the same elements in the same order, you can't use `===` directly on these arrays. Assume that the arrays are only one level deep. For example, `equalArray([1, 2, 3], [1, 2, 3])` should return `true`, and `equalArray([1, 2, 3], [1, 2])` should return `false`.

2. Similarly, implement a function called `equalObject(obj1, obj2)` that returns true if the two objects are equal, and false otherwise. Note that the objects are equal if they have the same keys and values, you can't use `===` directly on these object. Assume that the objects are only one level deep. For example, `equalObject({a: 1, b: 2}, {a: 1, b: 2})` should return `true`, and `equalObject({a: 1, b: 2}, {a: 1, b: 3})` should return `false`.

3. Now improve the `equalArray` function to handle nested arrays. For example, `equalArray([1, [2, 3]], [1, [2, 3]])` should return `true`, and `equalArray([1, [2, 3]], [1, [2, 4]])` should return `false`. In this case, you'll have to use recursion to compare the nested objects. See, youtube video on recursion if you're not familiar with it.

4. Now improve the `equalObject` function to handle nested objects. For example, `equalObject({a: 1, b: {c: 2}}, {a: 1, b: {c: 2}})` should return `true`, and `equalObject({a: 1, b: {c: 2}}, {a: 1, b: {c: 3}})` should return `false`. Also handle, the nil and undefined values.

Nested objects look like:
```js
{
  a: 1,
  b: {
    c: 2
  }
}
```

5. Now improve the `equalArray` function to handle nested objects. For example, `equalArray([1, {a: 2, b: 3}], [1, {a: 2, b: 3}])` should return `true`, and `equalArray([1, {a: 2, b: { c: 1 }}], [1, {a: 2}])` should return `false`. Also handle, the nil and undefined values.

6. Now finally, create a function called `equal(data1, data2)` that takes two arguments and returns true if they are equal, and false otherwise. The function should be able to handle arrays and objects, and should use the `equalArray` and `equalObject` functions you've implemented. For example, `equal([1, {a: 2, b: 3}], [1, {a: 2, b: 3}])` should return `true`, and `equal([1, {a: 2, b: { c: 1 }}], [1, {a: 2}])` should return `false`.

Write 20 test cases for the `equal` function, from simple to complex like these:

```js
equal(1, 1) // true
equal(1, 2) // false

equal([1, 2, 3], [1, 2, 3]) // true
equal([1, 2, 3], [1, 2]) // false

equal([1, [2, 3]], [1, [2, 3]]) // true
equal([1, [2, 3]], [1, [2, 4]]) // false

equal({a: 1, b: {c: 2}}, {a: 1, b: {c: 2}}) // true
equal({a: 1, b: {c: 2}}, nil) // false
```

7. Now we create a function called `test(title, description, testFn)` that takes a title, description, and a test function. The test function `testFn` should return true if the test passes, and false otherwise. The `test` function should print the title and description, and then run the test function. If the test function returns true, it should print "PASS", otherwise it should print "FAIL". For example, `test("1 + 1 = 2", "1 + 1 should equal 2", () => 1 + 1 === 2)` should print:

```
Test: 1 + 1 = 2
Description: 1 + 1 should equal 2
PASS
```

In case of failure it must print:

```
Test: 1 + 1 = 3
Description: 1 + 1 should equal 3
FAIL
```

8. Now we need a function called `assert` function that can be called inside the test function. The `testFn` now has the signature `testFn(assert) => {}` where `assert` is a function that takes a boolean value, it prints the title and the description of the test, and then prints "PASS" if the value is true, and "FAIL" if the value is false. For example, `test("1 + 1 = 2", "1 + 1 should equal 2", (assert) => assert(1 + 1 === 2))` should print:

```
Test: 1 + 1 = 2
Description: 1 + 1 should equal 2
PASS
```

You must update the `test` function to handle this new signature.

9. Now, we need sub tests, for that you need to call test function inside the test function. A test will pass if only all nested tests are passed. The nested tests should be printed with an indentation of 2 spaces. If a test is nested inside test inside another test, it should be printed with an indentation of 4 spaces, and so on. For example:

```js
test("1 + 1 = 2", "1 + 1 should equal 2", () => {
  test("1 + 1 = 2", "1 + 1 should equal 2", () => 1 + 1 === 2)
  test("1 + 1 = 3", "1 + 1 should equal 3", () => 1 + 1 === 3)
})

// Output
// Test: 1 + 1 = 2
// Description: 1 + 1 should equal 2
// FAIL
//   Test: 1 + 1 = 2
//   Description: 1 + 1 should equal 2
//   PASS
//   Test: 1 + 1 = 3
//   Description: 1 + 1 should equal 3
//   FAIL
```
A more complex example:

```js
test(
  "Document in HTML",
  "The document exists",
  () => {
    assert(document !== null)
    test(
      "Title",
      "The title should be 'Hello, World!'",
      () => document.title === "Hello, World!"
    )
    test(
      "Body",
      "Body exists",
      () => {
        assert(document.body !== null)
        test(
          "Background color",
          "The body should have a background color",
          () => document.body.style.backgroundColor !== ""
        )
      }
    )
  }
)

// Output
// Test: Document in HTML
// Description: The document exists
// PASS
//  Test: Title
//  Description: The title should be 'Hello, World!'
//  PASS
//  Test: Body
//  Description: Body exists
//  PASS
//    Test: Background color
//    Description: The body should have a background color
//    PASS
```

```

Now, you should understand why we needed `assert` function.
