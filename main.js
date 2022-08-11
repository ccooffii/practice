const div = dom.create("<div>newDiv</div>");
console.log(div);
dom.after(test, div);
dom.attr(test,"name","Jeremy")
let x = dom.attr(test,"name")
console.log(x)
dom.text(test,"I am Jeremy")