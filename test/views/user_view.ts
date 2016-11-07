import views = require('../../index');

views.describe('userAll', function() {

  this.allowAll(true);
  this.reference('address', 'userAddress');

});

views.describe('userAllowAllDenyOne', function() {

  this.allowAll(true);
  this.deny('address');

});

views.describe('userMinimal', function() {

  this.allow([ 'email', 'firstName' ]);

});

views.describe('userAddress', function() {

  this.allow('city');
  this.allow('state');
  this.allow('zip');

});
