/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, type ButtonPropsSizeOverrides } from "@mui/material";
import type { OverridableStringUnion } from '@mui/types';
import { memo } from "react";

const ButtonCompNonMemo = (props: {
  label: string;
  handlClick: () => void;
  variant: any
  size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides>
}) => {
  const { label, size, handlClick, variant } = props
  return (
<Button size={size} variant={variant} onClick={handlClick}>
{label}
</Button>
);
};

const ButtonComp = memo(ButtonCompNonMemo);

export default ButtonComp;