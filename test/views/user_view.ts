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

views.describe('userRename', function() {

  this.allow([ 'email', 'firstName' ]);
  this.allow('lastName', { as: 'renamedLastName' });
  this.allow('address', { as: 'renamedAddress' });

});

views.describe('userTransform', function() {

  this.allow([ 'firstName' ]);

  this.transform('fullName', (obj: { [key: string]: any }) => {
    return obj['firstName'] + ' ' + obj['lastName'];
  });

  this.transform((obj: { [key: string]: any }) => {
    return obj['firstName'] + ' ' + obj['lastName'];
  }, { as: 'fullNameAs' })

});
