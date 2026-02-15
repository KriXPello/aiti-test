import { createToaster } from '@chakra-ui/react';

/** @private */
export const chakraToaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
});
