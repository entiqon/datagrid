'use client';

import { createContext } from 'react';
import type { DataGridContextType } from './DataGridState';

export const DataGridContext = createContext<DataGridContextType<any> | null>(null);
