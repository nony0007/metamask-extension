import { endowmentPermissionBuilders } from '@metamask/snaps-controllers';
import { restrictedMethodPermissionBuilders } from '@metamask/rpc-methods';
import {
  EndowmentPermissions,
  ExcludedSnapEndowments,
  RestrictedMethods,
} from './permissions';

describe('EndowmentPermissions', () => {
  it('has the expected permission keys', () => {
    // Since some permissions are fenced out, this causes problems with the
    // test, so we re-add them here.
    expect(Object.keys(EndowmentPermissions).sort()).toStrictEqual(
      [
        'endowment:long-running',
        'endowment:lifecycle-hooks',
        'endowment:name-lookup',
        ...Object.keys(endowmentPermissionBuilders).filter(
          (targetName) =>
            !Object.keys(ExcludedSnapEndowments).includes(targetName),
        ),
      ].sort(),
    );
  });
});

// This test is flawed because it doesn't take fencing into consideration
// TODO: Figure out a better way to test this
describe('RestrictedMethods', () => {
  it('has the expected permission keys', () => {
    expect(Object.keys(RestrictedMethods).sort()).toStrictEqual(
      [
        'eth_accounts',
        ...Object.keys(restrictedMethodPermissionBuilders),
      ].sort(),
    );
  });
});
