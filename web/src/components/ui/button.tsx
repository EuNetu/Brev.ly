import { Slot } from '@radix-ui/react-slot'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
    base: [
        'flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-base',
        'disabled:cursor-not-allowed disabled:opacity-60',
    ],

    variants: {
        variant: {
            primary: 'bg-blue-base text-white hover:bg-blue-dark',
            secondary:
                'border border-gray-300 bg-gray-100 text-gray-500 hover:bg-gray-200',
            ghost: 'rounded-md px-2 py-1.5 shadow-none hover:bg-gray-200',
        },
    },

    defaultVariants: {
        variant: 'primary',
    },
})

type ButtonProps = ComponentProps<'button'> &
    VariantProps<typeof button> & {
        asChild?: boolean
    }

export function Button({
    className,
    variant,
    asChild = false,
    ...props
}: ButtonProps) {
    const Component = asChild ? Slot : 'button'

    return <Component className={button({ variant, className })} {...props} />
}