"use client";
import React, { ReactNode, createContext, useState } from "react";

type ILoaderContext = {
  showLoader: (message?: string) => void;
  hideLoader: () => void;
};

type LoaderContextProvider = {
  children: ReactNode;
};

export const LoaderContext = createContext<ILoaderContext | undefined>(
  undefined
);

export const LoaderProvider: React.FC<LoaderContextProvider> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loaderMessage, setLoaderMessage] = useState<string | undefined>();

  const contextValue: ILoaderContext = {
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

type ILoader = {
  message: string | undefined;
};

export const Loader: React.FC<ILoader> = ({ message }) => {
  return (
    <div className="loader">
      <span className="spinner"></span>
      <span className="loader-message">{message}</span>
    </div>
  );
};
