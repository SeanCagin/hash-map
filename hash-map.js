// import { LinkedList } from "quick-ll";
// in browsers the above doesn't work so I use the (somewhat inconvenient)
// method below. If you are in an environment where it works, I suggest
// you comment out the first line of this file and comment the
// one right below this.
import { LinkedList } from "./node_modules/quick-ll/linked-list.js";

class HashMap {
  #hashprime = 31;
  #loadFactor = 0.75;
  #backingArr;
  #size;
  #INITIAL_CAPACITY = 13;

  constructor() {
    this.#backingArr = new Array(this.#INITIAL_CAPACITY);
    this.#size = 0;
  }

  set(key, value) {
    if (this.#size + 1 > this.#backingArr.length * this.#loadFactor) {
      this.#resize();
    }
    let hash = this.#getHash(key);
    if (this.#backingArr[hash] == undefined) {
      this.#backingArr[hash] = new LinkedList();
    }
    let bucket = this.#backingArr[hash];
    let ptr = bucket.head;
    if (ptr == null) {
      this.#size++;
      this.#backingArr[hash].append([key, value]);
      return [key, value];
    }
    while (ptr != null) {
      if (ptr.value[0] == key) {
        ptr.value[1] = value;
        return [key, value];
      }
      ptr = ptr.next;
    }
    this.#size++;
    this.#backingArr[hash].append([key, value]);
    return [key, value];
  }

  get(key) {
    let hash = this.#getHash(key);
    if (this.#backingArr[hash] == undefined) {
      return null;
    }
    let bucket = this.#backingArr[hash];
    let ptr = bucket.head;
    if (ptr == null) {
      return null;
    }
    while (ptr != null) {
      if (ptr.value[0] == key) {
        return ptr.value[1];
      }
      ptr = ptr.next;
    }
    return null;
  }

  has(key) {
    if (this.get(key) != null) return true;
    return false;
  }

  remove(key) {
    let hash = this.#getHash(key);
    if (this.#backingArr[hash] == undefined) {
      return false;
    }
    let bucket = this.#backingArr[hash];
    let ptr = bucket.head;
    if (ptr == null) {
      return false;
    }
    let counter = 0;
    while (ptr != null) {
      if (ptr.value[0] == key) {
        this.#backingArr[hash].removeAt(counter);
        this.#size--;
        return true;
      }
      ptr = ptr.next;
      counter++;
    }
    return false;
  }

  length() {
    return this.#size;
  }

  clear() {
    this.#backingArr = new Array(this.#INITIAL_CAPACITY);
    this.#size = 0;
  }

  keys() {
    return this.#traverse(0);
  }

  values() {
    return this.#traverse(1);
  }

  entries() {
    return this.#traverse(2);
  }

  #traverse(mode /* 0 = only keys, 1 = only values, 2 = [key, value] pairs */) {
    let retval = [];
    for (let i = 0; i < this.#backingArr.length; i++) {
      if (this.#backingArr[i] == null) continue;
      let bucket = this.#backingArr[i];
      let ptr = bucket.head;
      while (ptr != null) {
        if (mode == 0) retval.push(ptr.value[0]);
        else if (mode == 1) retval.push(ptr.value[1]);
        else if (mode == 2) retval.push(ptr.value);
        ptr = ptr.next;
      }
    }
    return retval;
  }

  #resize() {
    let oldArr = this.#backingArr;
    this.#backingArr = new Array(this.#backingArr.length * 2 + 1);
    this.#size = 0;
    for (let i = 0; i < oldArr.length; i++) {
      if (oldArr[i] == null) continue;
      let bucket = oldArr[i];
      let ptr = bucket.head;
      while (ptr != null) {
        this.set(...ptr.value);
        ptr = ptr.next;
      }
    }
  }

  #getHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += (str.charCodeAt(i) * this.#hashprime) % this.#backingArr.length;
    }
    hash %= this.#backingArr.length;
    return hash;
  }
}

export default HashMap;
