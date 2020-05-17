import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { create } from "react-test-renderer";

import Image from "../components/Image";

let container = null;

beforeEach(() => {
    // ustaw element DOM jako cel renderowania
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    // posprzątaj po zakończeniu
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

    test("Matches the snapshot", () => {
      const button = create(<Image src={""} size={40} />);
      expect(button.toJSON()).toMatchSnapshot();
    });

