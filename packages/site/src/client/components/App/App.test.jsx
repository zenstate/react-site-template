import React from 'react';
import { cleanup, render } from '@testing-library/react';
import App from './index';
import '@testing-library/jest-dom/extend-expect';

describe('<App /> Component', () => {
    beforeEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it('renders hello world', () => {
        const { getByText } = render(<App />);
        expect(getByText('Hello World')).toBeInTheDocument();
    })
})