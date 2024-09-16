class LinkedList {
  Node = class {
    constructor(value, next = null) {
      this.value = value;
      this.next = next;
    }
  };

  constructor(value = null) {
    let node = null;
    if (value != null) {
      node = new this.Node(value);
      this.size = 1;
    } else {
      this.size = 0;
    }
    this.head = node;
    this.tail = this.head;
  }
  prepend(value) {
    let node = new this.Node(value);
    node.next = this.head;
    this.head = node;
    if (this.size == 0) this.tail = this.head;
    this.size++;
    return this;
  }
  append(value) {
    let node = new this.Node(value);
    if (this.size == 0) {
      this.head = node;
      this.tail = this.head;
    } else {
      this.tail.next = node;
      this.tail = this.tail.next;
    }
    this.size++;
    return this;
  }
  at(index) {
    let i = 0;
    let ptr = this.head;
    while (i < index) {
      if (ptr == null) {
        throw "index out of bounds";
      }
      ptr = ptr.next;
      i++;
    }
    return ptr.value;
  }
  pop() {
    let ptr = this.head;
    if (ptr == null) {
      throw "list is empty";
    } else if (ptr.next == null) {
      let temp = this.head;
      this.head = null;
      this.tail = null;
      size--;
      return temp.value;
    }
    while (ptr.next.next != null) {
      ptr = ptr.next;
    }
    this.tail = ptr;
    let temp = this.tail.next;
    this.tail.next = null;
    this.size--;
    return temp.value;
  }
  contains(value) {
    let res = this.find(value);
    if (res != null) return true;
    return false;
  }
  find(value) {
    let ptr = this.head;
    let counter = 0;
    while (ptr != null) {
      if (ptr.value == value) {
        return counter;
      }
      ptr = ptr.next;
      counter++;
    }
    return null;
  }
  insertAt(value, index) {
    if (index > this.size || index < 0) throw "index out of bounds";
    if (index == 0) {
      this.prepend(value);
      return this;
    }
    if (index == this.size) {
      this.append(value);
      return this;
    }
    let ptr = this.head;
    let counter = 0;
    while (counter < index - 1) {
      ptr = ptr.next;
      counter++;
    }
    let node = new this.Node(value);
    node.next = ptr.next;
    ptr.next = node;
    this.size++;
    return this;
  }
  removeAt(index) {
    if (index >= this.size || index < 0) throw "index out of bounds";
    if (index == 0) {
      let temp = this.head;
      this.head = this.head.next;
      this.size--;
      return temp.value;
    }
    if (index == this.size - 1) {
      return this.pop(value);
    }
    let ptr = this.head;
    let counter = 0;
    while (counter < index - 1) {
      ptr = ptr.next;
      counter++;
    }
    let temp = ptr.next;
    ptr.next = ptr.next.next;
    this.size--;
    return temp.value;
  }
  toString() {
    let ptr = this.head;
    let retval = "";
    while (ptr != null) {
      retval += ` ( ${ptr.value} ) -> `;
      ptr = ptr.next;
    }
    retval += "null";
    return retval;
  }
}

export { LinkedList };
