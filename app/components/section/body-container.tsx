import React from "react";

export const BodyContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <div className="mx-12 md:mx-42 lg:mx-90">{children}</div>;
};
