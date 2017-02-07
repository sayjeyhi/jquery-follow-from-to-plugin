# followFromTo
jquery plug in for managing page scroll

```javascript

$element.find(".stickWithScroll").followFromTo({
    from: 'self',                     // also can be integer 
    to: 'end',                        // also can be integer 
    behavior: 'class',                // [class,css]
    class: 'sticky',                  // if behavior is class
    debug: false,                      // debug mode
    marginTopFixed : -130
});
```
