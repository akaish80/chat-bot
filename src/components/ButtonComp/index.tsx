/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, type ButtonPropsSizeOverrides } from "@mui/material";
import type { OverridableStringUnion } from '@mui/types';
import { memo } from "react";

const ButtonCompNonMemo = (props: {
  label: string;
  handleClick: () => void;
  variant: any
  size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides>
}) => {
  const { label, size, handleClick, variant } = props
  return (
<Button size={size} variant={variant} onClick={handleClick}>
{label}
</Button>
);
};

const ButtonComp = memo(ButtonCompNonMemo);

export default ButtonComp;