import { SvgIcon, SvgIconProps } from "@mui/material";

export function DiceIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 50% 50%">
      <image href="/fire_dice.svg" width="100%" height="100%" />
    </SvgIcon>
  );
}
