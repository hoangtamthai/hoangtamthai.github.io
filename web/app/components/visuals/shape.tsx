import { useEffect, useRef } from "react";

export default function Shape() {
  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const uniqueRand = (min: number, max: number, prev: number) => {
    let next = prev;
    while (prev === next) next = rand(min, max);
    return next;
  };

  const combinations = [
    { configuration: 1, roundness: 1 },
    { configuration: 1, roundness: 2 },
    { configuration: 1, roundness: 3 },
    { configuration: 2, roundness: 1 },
    { configuration: 2, roundness: 2 },
    { configuration: 2, roundness: 3 },
    { configuration: 3, roundness: 1 },
    { configuration: 3, roundness: 2 },
    { configuration: 3, roundness: 3 },
  ];

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let prev = 0;
    const interval = setInterval(() => {
      const index = uniqueRand(0, combinations.length - 1, prev);
      const combination = combinations[index];
      if (wrapperRef.current) {
        wrapperRef.current.dataset.configuration =
          combination.configuration.toString();
        wrapperRef.current.dataset.roundness = combination.roundness.toString();
      }
      prev = index;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={wrapperRef}
      id="wrapper"
      data-configuration="1"
      data-roundness="1"
    >
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <div>
        <i className="fish fa-solid fa-fish"></i>
        <i className="fish fa-solid fa-fish"></i>
        <i className="fish fa-solid fa-fish"></i>
        <i className="fish fa-solid fa-fish"></i>
        <i className="fish fa-solid fa-fish"></i>
      </div>
    </div>
  );
}
