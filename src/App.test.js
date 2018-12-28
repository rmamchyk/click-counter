import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App from './App';

Enzyme.configure({adapter: new EnzymeAdapter()});

const setup = (props={}, state=null) => {
    const wrapper = shallow(<App {...props}/>)
    if (state) wrapper.setState(state);
    return wrapper;
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
}

it('renders without error', () => {
    const wrapper = setup();
    expect(findByTestAttr(wrapper, 'component-app').length).toBe(1);
});

it('renders increment button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'increment-button');
    expect(button.length).toBe(1); 
});

it('renders counter display', () => {
    const wrapper = setup();
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.length).toBe(1); 
});

it('counter starts at zero', () => {
    const wrapper = setup();
    const initialState = wrapper.state('counter');
    expect(initialState).toBe(0);
});

it('clicking button increments counter display', () => {
    const counter  = 7;
    const wrapper = setup(null, {counter});

    // find button and click
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');
    wrapper.update();

    // find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter + 1);
});