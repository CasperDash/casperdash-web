import { Story, Meta } from '@storybook/react/types-6-0';

import Example from '.';

export default {
  title: 'Example',
  component: Example,
} as Meta;

export const Default: Story = () => <Example />;
