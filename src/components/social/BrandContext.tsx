'use client'

import { createContext, useContext } from 'react'
import { DEFAULT_BRAND, type BrandOverrides } from './templates/types'

const BrandContext = createContext<BrandOverrides>(DEFAULT_BRAND)

export const BrandProvider = BrandContext.Provider
export const useBrand = () => useContext(BrandContext)
