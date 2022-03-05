import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../features/types';

export const useReduxDispatch = () => useDispatch<AppDispatch>();
