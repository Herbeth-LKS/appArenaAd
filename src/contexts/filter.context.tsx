import React, { createContext, useContext, useState, ReactNode } from 'react'

type FilterContextType = {
  formValues: Record<string, any>
  setFormValues: (values: Record<string, any>) => void
  removeFormValue: (name: string) => void
}

const FilterContext = createContext<FilterContextType>({} as FilterContextType)

export const useFilterContext = () => useContext(FilterContext)

type FilterProviderProps = {
  children: ReactNode
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [formValues, setFormValues] = useState<Record<string, any>>({})

  const removeFormValue = (name: string) => {
    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues }
      delete updatedValues[name]
      return updatedValues
    })
  }

  return (
    <FilterContext.Provider
      value={{ formValues, setFormValues, removeFormValue }}
    >
      {children}
    </FilterContext.Provider>
  )
}
