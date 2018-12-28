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

it('renders decrement button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'decrement-button');
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

describe('when click increment button', () => {
    const counter  = 7;
    const wrapper = setup(null, {counter});

    // find button and click
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');

    it('shoud increment counter display by 1', () => {
        // find display and test value
        const counterDisplay = findByTestAttr(wrapper, 'counter-display');
        expect(counterDisplay.text()).toContain(counter + 1);
    });

    it('should not display error', () => {
        expect(wrapper.find('.error').prop('style')).toHaveProperty('display', 'none');
    });
});

describe('when click decrement button', () => {
    const counter = 12;
    const wrapper = setup(null, {counter});

    // find button and click
    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');

    it('should decrement counter display', () => {
        // find counter display and verify
        const counterDisplay = findByTestAttr(wrapper, 'counter-display');
        expect(counterDisplay.text()).toContain(counter - 1);
    });

    it('should not display error', () => {
        expect(wrapper.find('.error').prop('style')).toHaveProperty('display', 'none');
    });
});

describe('when initial counter is zero', () => {
    const counter = 0;
    const wrapper = setup(null, {counter});

    it('should not display error', () => {
        expect(wrapper.find('.error').prop('style')).toHaveProperty('display', 'inline');
    });

    describe('and user clicks decrement button', () => {
        // find decrement button and click
        const button = findByTestAttr(wrapper, 'decrement-button');
        button.simulate('click');

        it('should not decrement counter below zero', () => {
            // verify counter display is still zero
            const counterDisplay = findByTestAttr(wrapper, 'counter-display');
            expect(counterDisplay.text()).toContain(0);
        
            //verify error message is shown 
            const errorMsg = wrapper.find('span.error');
            expect(errorMsg.text()).toBe("the counter can't go below zero");
        });

        it('should display error', () => {
            expect(wrapper.find('.error').prop('style')).toHaveProperty('display', 'inline');
        });
    });
});