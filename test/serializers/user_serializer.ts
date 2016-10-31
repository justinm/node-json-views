import serializer = require('../../index');

serializer.describe('userAll', function() {

  this.allowAll(true);
  this.reference('address', 'userAddress');

});

serializer.describe('userAllowAllDenyOne', function() {

  this.allowAll(true);
  this.deny('address');

});

serializer.describe('userMinimal', function() {

  this.allow([ 'email', 'firstName' ]);

});

serializer.describe('userAddress', function() {

  this.allow('city');
  this.allow('state');
  this.allow('zip');

});
