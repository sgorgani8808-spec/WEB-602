import React from 'react';
//impoert ReactDOM from 'react-dom';
import { render, screen} from '@testing-library/react';
import  userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import App from './App';
describe('Addition',()=>{
  it('knows that 2 and 2 make 4',()=>{
    expect(2+2).toBe(4);
  });
});
describe('App component',()=>{
  it('should render App component correctly',()=>{
    render(<App/>);
  });
  it("should find text element",()=>{
    render(<App/>);
    const textElement = screen.getByText('Register Form');
    expect(textElement).toBeInTheDocument();
  });
  it("should find input element",()=>{
    render(<App/>);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });
  it("should show error messages when all fields are not entered",async()=>{
    render(<App/>);
    const btnelement= screen.getByRole('button');
    userEvent.click(btnelement);
  });
  it('performs snapshot testing',()=>{
    const tree = renderer.create(<App/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});