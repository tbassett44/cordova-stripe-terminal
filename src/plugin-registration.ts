//CAPACITOR ONLY IMPLEMENTIONATION
// import { registerPlugin } from '@capacitor/core'

// import type { StripeTerminalInterface } from './definitions'

// /**
//  * This should NOT be used directly.
//  * @ignore
//  */
// export const StripeTerminal = registerPlugin<StripeTerminalInterface>(
//   'StripeTerminal',
//   {
//     web: () => import('./web').then(m => new m.StripeTerminalWeb())
//   }
// )

///
import { registerPlugin } from '@capacitor/core';

import type { StripeTerminalInterface } from './definitions'

let StripeTerminalImpl;

if (
  (window as any).cordova !== undefined &&
  (window as any).cordova.platformVersion !== undefined &&
  (window as any).cordova.platformVersion !== '1.0.0'
) {
  StripeTerminalImpl = new Proxy({}, {
    get(_target, property) {
      return (window as any).StripeTerminal[property];
    }
  });
  const StripeTerminal = StripeTerminalImpl as StripeTerminalInterface;
} else {
  const StripeTerminal = registerPlugin<StripeTerminalInterface>('StripeTerminal', {
    web: () => import('./web').then(m => new m.StripeTerminalWeb()),
  });
}

export * from './definitions';
export { StripeTerminal };