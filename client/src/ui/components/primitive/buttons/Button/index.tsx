import React from 'react';
import styled from 'styled-components';
import Icon from '../../../icons';
import { getSizeValue, NumberSize } from '../../../../../core/entities/ui';
import ButtonWrapper, { ButtonWrapperProps } from '../ButtonWrapper';
import { useTheme } from '../../../../theme/useTheme';
import { ui } from '../../../../../core';

const iconSizes = {
  xs: 12,
  sm: 16,
  md: 26,
  lg: 32,
  xl: 48,
};

const buttonHeight = {
  xs: 44,
  sm: 54,
  md: 68,
  lg: 78,
  xl: 94,
};

const Button: React.FC<Props> = (props) => {
  const theme = useTheme();
  const {
    text,
    icon: DeclaredIcon,
    to,
    onClick,
    size = 'md',
    color = theme.colors.interactive.primary.p0,
    hoverColor = theme.colors.layout.rHc,
    target = '_self',
    className,
  } = props;
  const _size = ui.getSizeValue(size, iconSizes);

  return (
    <Container
      target={target}
      to={to}
      onClick={onClick}
      color={color}
      hoverColor={hoverColor}
      size={size}
      className={className}
    >
      {(isHovering: boolean) => (
        <>
          {DeclaredIcon != null && (
            <ButtonIcon
              as={DeclaredIcon}
              width={_size}
              height={_size}
              color={isHovering ? hoverColor : color}
            />
          )}
          <div>{text}</div>
        </>
      )}
    </Container>
  );
};

export default Button;

type Props = {
  text: string;
  icon?: ExtractComponents<typeof Icon>;
  size?: NumberSize;
  color?: string;
  hoverColor?: string;
} & ButtonWrapperProps;

type ExtractComponents<T> = {
  [K in keyof T]: T[K] extends typeof Icon.Dronies ? T[K] : never;
}[keyof T];

const ButtonIcon = styled(Icon.Twitter)`
  margin-right: 14px;
`;

const Container = styled(ButtonWrapper)<{
  color: string;
  hoverColor: string;
  size: NumberSize;
}>`
  display: flex;
  align-items: center;
  flex-direction: row;

  height: ${({ size }) => getSizeValue(size, buttonHeight)}px;
  padding: 0 28px 0 28px;

  border: 3px solid ${({ color }) => color};
  color: ${({ color }) => color};

  letter-spacing: 4px;
  text-decoration: none;
  text-transform: uppercase;
  font-family: Furore, serif;
  font-size: ${({ size, theme }) => getSizeValue(size, theme.fontSizes)}px;

  cursor: pointer;

  transition: color 0.3s, text-shadow 0.3s, box-shadow 0.3s;

  :hover {
    border-color: ${({ hoverColor }) => hoverColor};
    color: ${({ hoverColor }) => hoverColor};
    filter: drop-shadow(
      0px 0px 5px ${({ hoverColor }) => ui.hexToRgba(hoverColor, 0.5)}
    );

    ${ButtonIcon} {
      filter: drop-shadow(
        0px 0px 5px ${({ hoverColor }) => ui.hexToRgba(hoverColor, 0.5)}
      );
    }
  }
`;
