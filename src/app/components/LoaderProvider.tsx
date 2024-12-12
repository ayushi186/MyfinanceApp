"use client";
import React, { ReactNode, createContext, useState } from "react";

type LoaderContext = {
  showLoader: (message: string) => void;
  hideLoader: () => void;
};

type LoaderContextProvider = {
  children: ReactNode;
};

export const LoaderContext = createContext<LoaderContext | undefined>(
  undefined
);

export const LoaderProvider: React.FC<LoaderContextProvider> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loaderMessage, setLoaderMessage] = useState<string | undefined>();

  const contextValue: LoaderContext = {
    showLoader: (message) => {
      setLoaderMessage(message);
      setIsVisible(true);
    },
    hideLoader: () => {
      setIsVisible(false);
    },
  };

  return (
    <LoaderContext.Provider value={contextValue}>
      {isVisible && <Loader message={loaderMessage} />}
      {children}
    </LoaderContext.Provider>
  );
};

type Loader = {
  message: string | undefined;
};

export const Loader: React.FC<Loader> = ({ message }) => {
  return (
    <div className="loader">
      <span className="spinner"></span>
      <span className="loader-message">{message}</span>
    </div>
  );
};
