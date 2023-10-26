import Avatar, { AvatarProps } from 'boring-avatars';

type GradientAvatarProps = {
  size?: number;
  name?: string;
} & AvatarProps;

export const GradientAvatar = ({
  name = '',
  size = 40,
  variant = 'marble',
  colors = ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'],
  ...rest
}: GradientAvatarProps) => {
  return (
    <Avatar
      {...rest}
      size={size}
      name={name ?? ''}
      variant={variant}
      colors={colors}
    />
  );
};
