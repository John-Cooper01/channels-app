import { useSelector, TypedUseSelectorHook } from 'react-redux';

import { ReduxStore } from '../../features/types';

export const useReduxSelector: TypedUseSelectorHook<ReduxStore> = useSelector;
