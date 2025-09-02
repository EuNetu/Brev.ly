import { Slot } from '@radix-ui/react-slot'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
    base: [
        'flex items-center justify-center gap-2 rounded-lg text-sm font-semibold shadow-sm outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-base',
        'disabled:cursor-not-allowed disabled:opacity-60',
    ],

    variants: {
        variant: {
            primary: 'bg-blue-base text-white hover:bg-blue-dark',
            secondary:
                'bg-gray-200 text-gray-500 hover:bg-gray-200',
            ghost: 'rounded-md p-0 shadow-none hover:bg-gray-200',
        },
        size: {
            default: 'h-11 px-4 py-2.5',
            icon: 'h-9 w-9 p-2',
        },
    },

    defaultVariants: {
        variant: 'primary',
        size: 'default',
    },
})

type ButtonProps = ComponentProps<'button'> &
    VariantProps<typeof button> & {
        asChild?: boolean
    }

export function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: ButtonProps) {
    const Component = asChild ? Slot : 'button'

    return <Component className={button({ variant, size, className })} {...props} />
}