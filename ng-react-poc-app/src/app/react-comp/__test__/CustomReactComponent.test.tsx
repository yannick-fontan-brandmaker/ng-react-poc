import {CustomReactComponent} from "../CustomReactComponent";
import {cleanup, render} from "@testing-library/react";
import {expect} from '@jest/globals';
import * as React from "react";
import {createRoot} from "react-dom/client";
import {act} from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

// you can run the test with yarn jest (package.json > "scripts": { ..., "jest": "jest --watch --env=jsdom" })
// clean the dom after each it(...) test
afterEach(cleanup)

// use react-dom/client and react-dom/test-utils
it("render without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  act(() => { //  https://reactjs.org/link/wrap-tests-with-act
    root.render(<CustomReactComponent counter={3}/>);
  });
})

// use the data-testid attribute with @testing-library/react/render
it("render the good text content", () => {
  const {getByTestId} = render(<CustomReactComponent counter={4}/>);
  expect(getByTestId('increase-btn').textContent).toBe("click to increase");
})

// use react-test-renderer, snapshot are automatically saved in __snapshot__
// press u in the interactive watch mode to update the snapshot if needed
it("matches snapshot", () => {
  const tree = renderer.create(<CustomReactComponent counter={6}/>).toJSON();
  expect(tree).toMatchSnapshot();
})
