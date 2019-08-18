import { css } from 'styled-components'

export const background: any = {
  dark: '#292B31',
  light: '#eef5f9',
}

export const borders: any = {
  cool: '#d7dfe3',
  dark: '#333',
  ghost: '#cad0d2',
}

export const primary: any = {
  dark: '#365F7C',
  darker: '#254154',
  light: '#72B7E8',
  main: '#5095C5',
}

export const secondary: any = {
  dark: '#6D3F90',
  light: '#9333DC',
  main: '#964AD1',
}

export const thirdary: any = {
  dark: '#247A6E',
  light: '#24D8C6',
  main: '#1DB8A2',
}

export const neutral: any = {
  dark: '',
  light: '',
  main: '#cbcbcb',
}

export const text: any = {
  light: '#bbbbbb',
  normal: '#333',
  soft: '#666',
}

export const warning: any = {
  main: '#d97741',
}

export const error: any = {
  main: '#fa5858',
  dark: '#c93131',
}

export const success: any = {
  main: '#43b05d',
}

export const link: any = {
  hoverDark: '#1DB8A2',
  hoverLight: '#7c04da',
  hovering: '#0070c2',
}

export const highlight: any = {
  teal: '#5BCEFF',
}

export const social: any = {
  amazon: '#ff9900',
  deviantart: '#05cc47',
  facebook: '#3b5998',
  googleplus: '#db4437',
  instagram: '#8a3ab9',
  linkedin: '#007bb5',
  medium: '#02b875',
  pinterest: '#bd081c',
  quora: '#aa2200',
  reddit: '#ff4500',
  skype: '#00aff0',
  snapchat: '#fffc00',
  spotify: '#1ed760',
  tumblr: '#35465d',
  twitter: '#1da1f2',
  vimeo: '#1ab7ea',
  vk: '#4a76a8',
  yahoo: '#430297',
  youtube: '#ff0000',
}

export const sizes: any = {
  widescreen: 1600,
  desktop: 992,
  tablet: 768,
  phone: 492,
  mini: 400,
}

interface Sizes {
  widescreen: (str: any) => any
  desktop: (str: any) => any
  tablet: (str: any) => any
  phone: (str: any) => any
  mini: (str: any) => any
}

export const media: Sizes = Object.keys(sizes).reduce((acc: any, label) => {
  acc[label] = (arg1: any, ...otherArgs: any[]) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(arg1, ...otherArgs)}
    }
  `
  return acc
}, {})

const theme: any = {
  background,
  borders,
  error,
  highlight,
  link,
  neutral,
  primary,
  secondary,
  social,
  success,
  text,
  thirdary,
  warning,
}

export default theme
