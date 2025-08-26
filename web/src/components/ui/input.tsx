import type { ComponentProps } from 'react'

type InputProps = ComponentProps<'input'>

export function Input(props: InputProps) {
    return (
        <input
            className="h-11 w-full rounded-lg border border-gray-300 bg-gray-100 px-4 text-sm text-gray-500 shadow-sm outline-none placeholder:text-gray-400 focus:border-blue-base focus:ring-1 focus:ring-blue-base"
            {...props}
        />
    )
}