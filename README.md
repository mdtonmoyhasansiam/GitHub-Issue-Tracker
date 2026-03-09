# 1. What is the difference between var, let, and const?
Ans: JavaScript-এ var, let, এবং const দিয়ে variable declare করা হয়। এদের মধ্যে মূল পার্থক্য scope, reassign এবং hoisting-এ। 

// var

- পুরোনো JavaScript variable declaration
- Function scope থাকে, block scope না
- Re-declare এবং Re-assign দুইটাই করা যায়

Ex:

```var x = 10;
var x = 20; // আবার declare করা যায়
x = 30; // value change করা যায়
```

// let

- ES6 (modern JavaScript) এ এসেছে
- Block scope থাকে ({ } এর ভিতরে সীমাবদ্ধ)
- Re-assign করা যায়, কিন্তু re-declare করা যায় না

Ex: 

```let y = 10;
y = 20;   // value change করা যায়
// let y = 30; ❌ আবার declare করা যাবে না
```

// const

- এটা block scope
- Re-declare এবং Re-assign কোনটাই করা যায় না
- declare করার সময় value দিতে হয়

Ex:

```const z = 10;
// z = 20 ❌ value change করা যাবে না
```


# 2. What is the spread operator (...)?
Ans: Spread Operator (...) JavaScript-এ ব্যবহার করা হয় array বা object-এর ভেতরের সব value আলাদা করে ছড়িয়ে দিতে (expand করতে)

// Array এ ব্যবহার

Ex:

```const arr1 = [1, 2];
const arr2 = [3, 4];

const result = [...arr1, ...arr2];

console.log(result); // Output: [1, 2, 3, 4]
```

// Object এ ব্যবহার


# 3. What is the difference between map(), filter(), and forEach()?
Ans: JavaScript-এ map(), filter(), এবং forEach() তিনটাই array এর উপর কাজ করার method। কিন্তু এদের কাজ আলাদা।

// map()
- Array এর প্রতিটি element এর উপর কাজ করে নতুন array return করে।
- সাধারণত data modify বা transform করতে ব্যবহার হয়।

Ex:

```const numbers = [1,2,3];

const result = numbers.map(n => n * 2); // Output: [2,4,6]
```

// filter()
- নির্দিষ্ট condition অনুযায়ী element বেছে নিয়ে নতুন array return করে।

Ex:

``` const numbers = [1,2,3,4];

const result = numbers.filter(n => n > 2); // Output: [3,4]
```

// forEach()
- Array এর প্রতিটি element এর উপর কাজ করে কিন্তু কোনো নতুন array return করে না।
- সাধারণত loop করার জন্য ব্যবহার হয়।

Ex: 

```const numbers = [1,2,3];

numbers.forEach(n => {
  console.log(n);
});
```

# 4. What is an arrow function?
Ans: Arrow Function (=>) হলো JavaScript-এর একটি ছোট ও সহজভাবে function লেখার পদ্ধতি, যা ES6 এ এসেছে।

Ex: Normal Function-

```function add(a, b) {
  return a + b;
}
```

Arrow Function-

```const add = (a, b) => a + b;```


# 5. What are template literals?
Ans: Template Literals হলো JavaScript-এ string লেখার আধুনিক পদ্ধতি, যেখানে backtick ( ) ব্যবহার করা হয় এবং এর ভিতরে সহজে variable বা expression বসানো যায়।

Ex: 

```const name = "Rasel";

const text = `Hello ${name}`; // Output: Hello Rasel
```