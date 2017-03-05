json-views: a simple DSL for defining JSON views
======================================================

What is a json-view? A json-view allows you to map internal objects to external views.

[![Build Status](https://travis-ci.org/justinm/node-json-views.svg?branch=master)](https://travis-ci.org/justinm/node-json-views)
  [![Code Climate](https://codeclimate.com/github/justinm/node-json-views/badges/gpa.svg)](https://codeclimate.com/github/justinm/node-json-views)
  [![Test Coverage](https://codeclimate.com/github/justinm/node-json-views/badges/coverage.svg)](https://codeclimate.com/github/justinm/node-json-views/coverage)
 
Why use json-views
------------------------

There are two common reasons for using json-views, consistency and security. By using views
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

views.describe('user', function (desc) {
    desc.allow([ 'firstName', 'lastName', 'email' ]);
    desc.deny('password');
});

var results = views.view('user', user);

results === {
  firstName: 'First',
  lastName: 'Last',
  email: 'test@example.com'  
}

```


Allowing and Denying
--------------------

JSON serializers works as a combination whitelist/blacklist for object attributes where attributes must first 
 be desc.allow()'ed. desc.deny() will always take priority in cases where an attribute is both allowed and denied.
  
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

views.describe('user.address', function(desc) {
  desc.allow('state');
});

views.describe('user', function(desc) {
  desc.allow([ 'firstName', 'lastName', 'email' ]);
  desc.deny('password');
  desc.reference('address', 'user.address');
  desc.transform(function(obj) { return obj.firstName + ' ' + obj.lastName }, { as: 'fullName' });
  desc.transform('fullName', function(obj) { return obj.firstName + ' ' + obj.lastName });
});

var results = views.view('user', user);

results === {
  firstName: 'First',
  lastName: 'Last',
  email: 'test@example.com',
  address: {
    state: 'IN'
  }
}

var results = views.view('user', user);

results === {
  firstName: 'First',
  lastName: 'Last',
  email: 'test@example.com'  
}

```


Nested Objects
--------------

Views can also be nested using desc.reference().

```javascript

var user = {
  firstName: 'First',
  lastName: 'Last',
  email: 'test@example.com',
  password: 'password',
};

views.describe('user.address', function(desc) {
  desc.allow('state');
});

views.describe('user', function(desc) {
  desc.allow([ 'firstName', 'lastName', 'email', 'address' ]);
  desc.deny('password');
  desc.reference('address', 'user.address');
});

var results = views.view('user', user);

results === {
  firstName: 'First',
  lastName: 'Last',
  email: 'test@example.com',
  address: {
    state: 'IN'
  }
}

```

