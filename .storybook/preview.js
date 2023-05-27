import { addDecorator } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'


export const parameters = {
  backgrounds: {
    default: 'dark',
    layout: 'fullscreen',
  }
}

addDecorator(withNextRouter())
