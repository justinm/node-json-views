import views = require('../../index');

views.describe('userAll', function(desc) {

  desc.allowAll();
  desc.reference('address', 'userAddress');

});

views.describe('userAllowAllDenyOne', function(desc) {

  desc.allowAll();
  desc.deny('address');

});

views.describe('userMinimal', function(desc) {

  desc.allow([ 'email', 'firstName' ]);

});

views.describe('userAddress', function(desc) {

  desc.allow('city');
  desc.allow('state');
  desc.allow('zip');

});

views.describe('userRename', function(desc) {

  desc.allow([ 'email', 'firstName' ]);
  desc.allow('lastName', { as: 'renamedLastName' });
  desc.allow('address', { as: 'renamedAddress' });

});

views.describe('userTransform', function(desc) {

  desc.allow([ 'firstName' ]);

  desc.transform('fullName', (obj: { [key: string]: any }) => {
    return obj['firstName'] + ' ' + obj['lastName'];
  });

  desc.transform((obj: { [key: string]: any }) => {
    return obj['firstName'] + ' ' + obj['lastName'];
  }, { as: 'fullNameAs' })

});
