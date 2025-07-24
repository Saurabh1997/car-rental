import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "./App";

jest.mock("axios");

const mockCars = [
  {
    brand: "Toyota",
    model: "Corolla",
    stock: 4,
    price: {
      peak: 90,
      mid: 70,
      off: 50,
    },
  },
  {
    brand: "Honda",
    model: "Civic",
    stock: 2,
    price: {
      peak: 100,
      mid: 80,
      off: 60,
    },
  },
];

describe("App", () => {
  it("fetches and displays a list of cars", async () => {
    axios.get.mockResolvedValueOnce({ data: mockCars });

    render(<App />);

    // Wait for car names to appear
    await waitFor(() => {
      expect(screen.getByText("Toyota Corolla")).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText("Honda Civic")).toBeInTheDocument();
    });

    // Check if prices and stock are rendered
    expect(screen.getByText("Stock: 4")).toBeInTheDocument();
    expect(screen.getByText("Stock: 2")).toBeInTheDocument();
    expect(screen.getByText("$90")).toBeInTheDocument();
    expect(screen.getByText("$80")).toBeInTheDocument();
  });
});
