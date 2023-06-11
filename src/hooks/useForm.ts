import React, { useState } from 'react'

export const useForm = <T extends Object>(form: T,auxFunc?:Function) => {
  const [state, setState] = useState(form);
  const onChange = (value: string, field: keyof T) => {
    setState({
      ...state,
      [field]: value
    })
    auxFunc && auxFunc({[field]:value});
  }

  return { ...state, onChange}
}