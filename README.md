# Vue Eventing
[![Maintainability](https://api.codeclimate.com/v1/badges/3e0a8f858e1e329c4994/maintainability)](https://codeclimate.com/github/rocketbase-io/vue-eventing/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3e0a8f858e1e329c4994/test_coverage)](https://codeclimate.com/github/rocketbase-io/vue-eventing/test_coverage)
[![Build Status](https://travis-ci.com/rocketbase-io/vue-eventing.svg?branch=master)](https://travis-ci.com/rocketbase-io/vue-eventing)

##### Add Vue 2.x like eventing to Vue 3

    npm install @rocketbase/vue-eventing


## Configuration
You can configure this module by importing the "VueEventing" function and optionally passing in the features you want to enable.

Example:
```typescript
import { VueEventing } from "@rocketbase/vue-eventing";

VueEventing({
  // Enable $on, $off, $once instance methods, off by default
  instanceMethods: true,
  // Enable $emit hook to emulate Vue 2.x $emit behavior, off by default
  emitIntegration: true,
});
```


## Usage
There are two main ways of using this library, with the `@Eventing` decorator or the `MixEventing` mixin.

While the decorator works essentially the same way, the mixin also provides useful typing to the class.

#### Decorator Example:
```typescript
import { Component, On, Vue } from "@rocketbase/vue-extra-decorators";
import { Eventing } from "@rocketbase/vue-eventing";

@Component({})
@Eventing
export default class MyComponent extends Vue {
  
  @On("some-event")
  private onSomeEvent(...args: unknown[]): void {
    console.log(...args);
  }
  
  private mounted() {
    this.$emit("some-event", "foo", "bar", 123);
  }
  
}
```

#### Mixin Example
```typescript
import { Component, On, Vue } from "@rocketbase/vue-extra-decorators";
import { MixEventing } from "@rocketbase/vue-eventing";

@Component({})
export default class MyComponent extends MixEventing(Vue) {
  
  @On("some-event")
  private onSomeEvent(...args: unknown[]): void {
    console.log(...args);
  }
  
  private mounted() {
    this.$emit("some-event", "foo", "bar", 123);
  }
  
}
```
