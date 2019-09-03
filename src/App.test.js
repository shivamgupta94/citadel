import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import App from "./App";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("renders without crashing", () => {
  ReactDOM.render(<App />, container);
  ReactDOM.unmountComponentAtNode(container);
});

it("should render an input by default", () => {
  ReactTestUtils.act(() => {
    ReactDOM.render(<App />, container);
  });
  const input = container.querySelector(".App__input");
  const list = container.querySelector(".App__list");

  expect(input).not.toBeNull();
  expect(list).toBeNull();
});

it("should render a list if you type a character that matches", () => {
  ReactTestUtils.act(() => {
    ReactDOM.render(<App />, container);
  });
  const input = container.querySelector(".App__input");

  input.focus();
  input.value = "d";
  ReactTestUtils.Simulate.change(input);

  const list = container.querySelector(".App__list");

  expect(list).not.toBeNull();
});

it("should not render the list with leading whitespace", () => {
  ReactTestUtils.act(() => {
    ReactDOM.render(<App />, container);
  });
  const input = container.querySelector(".App__input");

  input.focus();
  input.value = " d";
  ReactTestUtils.Simulate.change(input);

  const list = container.querySelector(".App__list");

  expect(list).toBeNull();
});

it("should hide the list if you click outside of it", () => {
  ReactTestUtils.act(() => {
    ReactDOM.render(<App />, container);
  });
  const input = container.querySelector(".App__input");

  input.focus();
  input.value = " d";
  ReactTestUtils.Simulate.change(input);

  ReactTestUtils.Simulate.click(container, { bubbles: true });

  const list = container.querySelector(".App__list");

  expect(list).toBeNull();
});

it("should highlight the section of the match", () => {
  ReactTestUtils.act(() => {
    ReactDOM.render(<App />, container);
  });
  const input = container.querySelector(".App__input");

  input.focus();
  input.value = "d";
  ReactTestUtils.Simulate.change(input);

  const highlight = container.querySelector(".App__listItem-highlight");

  expect(highlight.innerHTML).toEqual("D");
});

it("should populate the input with the city if clicked", () => {
  ReactTestUtils.act(() => {
    ReactDOM.render(<App />, container);
  });
  const input = container.querySelector(".App__input");

  input.focus();
  input.value = "d";
  ReactTestUtils.Simulate.change(input);

  const listItems = container.querySelectorAll(".App__listItem");

  ReactTestUtils.Simulate.click(listItems[0]);

  expect(input.value).toEqual("Detroit");
});

it("should sort the city matches alphabetically", () => {
  ReactTestUtils.act(() => {
    ReactDOM.render(<App />, container);
  });
  const input = container.querySelector(".App__input");

  input.focus();
  input.value = "s";
  ReactTestUtils.Simulate.change(input);

  const listItems = container.querySelectorAll(".App__listItem");

  expect(listItems[0].textContent).toEqual("Shanghai");
  expect(listItems[1].textContent).toEqual("Sydney");
});
