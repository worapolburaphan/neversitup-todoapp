import React, { forwardRef, ForwardRefRenderFunction } from 'react'

import { cn, Input } from '@nextui-org/react'
import type { InputProps } from '@nextui-org/input'

import { Icon } from '@iconify/react'

interface Props extends InputProps {
  isVisible: boolean
  toggleVisibility: () => void
}

const SecretInput: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { toggleVisibility, isVisible, value, classNames, ...props },
  ref
) => {
  return (
    <Input
      ref={ref}
      endContent={
        <button type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <Icon
              className="text-default-400 pointer-events-none text-2xl"
              icon="solar:eye-closed-linear"
            />
          ) : (
            <Icon
              className="text-default-400 pointer-events-none text-2xl"
              icon="solar:eye-bold"
            />
          )}
        </button>
      }
      label="Secret"
      labelPlacement="outside"
      name="secret"
      placeholder="Enter your secret"
      type={isVisible ? 'text' : 'password'}
      variant="bordered"
      input
      classNames={{
        ...classNames,
        // Hack to make password placeholder look like big dots
        input: cn(
          !isVisible &&
            value &&
            'font-bold text-3xl placeholder:text-xs placeholder:font-normal'
        ),
      }}
      value={value}
      {...props}
    />
  )
}

export default forwardRef(SecretInput)
