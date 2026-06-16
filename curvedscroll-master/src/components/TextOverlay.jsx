import React from "react";
import { textSlides } from "@/data/textSlides";

const TextOverlay = () => {
  return (
    <div className="text-overlay pointer-events-none fixed inset-0 z-20 flex items-center justify-center">
      {textSlides.map((slide, index) => (
        <div
          key={slide.hero}
          className="text-panel absolute flex w-full flex-col items-center px-6"
          data-index={index}
        >
          <div className="slide-hero">{slide.hero}</div>
          <div className="slide-columns">
            {slide.columns.map((col, colIndex) => (
              <div className="slide-col" key={`${slide.hero}-${colIndex}`}>
                {col.header ? (
                  <p className="slide-col-header">{col.header}</p>
                ) : (
                  <p
                    className="slide-col-header slide-col-header--spacer"
                    aria-hidden="true"
                  >
                    &nbsp;
                  </p>
                )}
                <ul className="slide-col-list">
                  {col.items.map((item) => (
                    <li className="slide-col-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TextOverlay;
