import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'

export interface IAlertProps {
  variant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
  message: string
  timeout?: number
}

export const AutoAlert = ({
  variant,
  message,
  timeout,
}: IAlertProps): React.ReactElement => {
  const [show, setShow] = useState(true)

  if (timeout) {
    setTimeout(() => setShow(false), timeout)
  }

  return show ? (
    <Alert variant={variant} onClose={() => setShow(false)} dismissible>
      {message}
    </Alert>
  ) : (
    <span />
  )
}
