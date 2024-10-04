// export * from './lib.final'
import {jsx} from '@emotion/core'
import styled from '@emotion/styled'

export * from './lib.exercise'
export const FormGroup = styled.div(props => {
  return {
    // outline: '1px solid red',
    display: 'flex',
    flexDirection: 'column',
  }
})

export const Input = styled.input(props => {
  return {
    // outline: '1px solid red',
    backgroundColor: 'rgb(241, 242, 247)',
    borderRadius: '3px',
    padding: '8px 12px',
    border: 'none',
  }
})

export const Button = styled.button(props => ({
  backgroundColor: props.variant === 'primary' ? 'rgb(63, 81, 181)' : '',
  color: props.variant === 'primary' ? '#FFFFFF' : '',
  border: 'none',
  padding: '10px 15px',
  height: '36px',
  lineHeight: '1',
  width: '90px',
  borderRadius: '3px',
}))

// 💯 use the emotion macro
// export * from './lib.extra-1'

// 💯 use colors and media queries file
// export * from './lib.extra-2'

// 💯 make a loading spinner component
// export * from './lib.extra-3'
