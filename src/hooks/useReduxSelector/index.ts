import { useSelector, TypedUseSelectorHook } from 'react-redux';

import { ReduxStore } from '../../store';

export const useReduxSelector: TypedUseSelectorHook<ReduxStore> = useSelector;
