json-serializers: a simple DSL for defining JSON views
======================================================

What is a json-serializer? A json-serializer allows you to map internal objects to external views.

[![Build Status](https://travis-ci.org/justinm/node-json-serializers.svg?branch=develop)](https://travis-ci.org/justinm/node-json-serializers)
  [![Code Climate](https://codeclimate.com/github/justinm/node-json-serializers/badges/gpa.svg)](https://codeclimate.com/github/justinm/node-json-serializers)
 
Why use json-serializers
------------------------

There are two common reasons for using json-serializers, consistency and security. By using serializers
we ensure consistency to how objects are presented. Since attributes are whitelisted, this also increases
security by limiting the chance of accidental internal value exposure.


Basic Example
-------------

The following example simply creates a new object that lacks the "password" field.

```javascript

var user = {
  firstName: 'First',
  lastName: 'Last',
  email: 'test@example.com',
  password: 'password'
};

serializer.describe('user', function () {
    this.allow([ 'firstName', 'lastName', 'email' ]);
    this.deny('password');
});

var results = serializer.serialize('user', user);

results === {
  firstName: 'First',
  lastName: 'Last',
  email: 'test@example.com'  
}

```


Allowing and Denying
--------------------

JSON serializers works as a combination whitelist/blacklist for object attributes where attributes must first 
 be this.allow()'ed. this.deny() will always take priority in cases where an attribute is both allowed and denied.
  
```javascript

var user = {
  firstName: 'First',
  lastName: 'Last',
  email: 'test@example.com',
  password: 'password'
};

serializer.describe('user', function () {
    this.allowAll();
    this.deny('password');
});

var results = serializer.serialize('user', user);

results === {
  firstName: 'First',
  lastName: 'Last',
  email: 'test@example.com'  
}

```


Nested Objects
--------------

Serializers can also be nested using this.reference().

```javascript

var user = {
  firstName: 'First',
  lastName: 'Last',
  email: 'test@example.com',
  password: 'password',
  address: {
    street: '1234 Example',
    city: 'Indianapolis',
    state: 'IN'
  }
};

serialize.describe('user.address', function() {
  this.allow('state');
});

serializer.describe('user', function() {
    this.allow([ 'firstName', 'lastName', 'email', 'address' ]);
    this.deny('password');
    this.reference('address', 'user.address');
});

var results = serializer.serialize('user', user);

results === {
  firstName: 'First',
  lastName: 'Last',
  email: 'test@example.com',
  address: {
    state: 'IN'
  }
}

```
