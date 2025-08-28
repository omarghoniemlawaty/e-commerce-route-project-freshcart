import React, { createContext, useState } from "react";

export const PurchaseHistoryContext = createContext({
  purchases: [],
  addPurchase: () => {},
});

const PurchaseHistoryProvider = ({ children }) => {
  const [purchases, setPurchases] = useState(
    JSON.parse(localStorage.getItem("purchases")) || []
  );

  const addPurchase = (order) => {
    setPurchases((prev) => {
      const updated = [...prev, order];
      localStorage.setItem("purchases", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <PurchaseHistoryContext.Provider value={{ purchases, addPurchase }}>
      {children}
    </PurchaseHistoryContext.Provider>
  );
};

export default PurchaseHistoryProvider;
