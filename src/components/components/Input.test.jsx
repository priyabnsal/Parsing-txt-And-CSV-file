// import Input from './Input'
import React from 'react'

const Input = require('./Input')
import { shallow, render, mount, configure } from 'enzyme'
const props = { delimiter: ',', rows: 2 }

describe('TargetPeriodsTableModal', () => {
  it('should match snapshot when loading false', () => {
    const wrapper = shallow(<Input {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})

// describe('sum module', () => {
//   test('adds 1 + 2 to equal 3', () => {
//     expect(Input(props.delimiter)).toBe(',')
//     expect(Input(props.rows)).toBe(2)
//   })
// })
