"use client";

import { ReactNode, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/store";
import { hydrateAuth } from "@/store/slices/authSlice";
import { AppDispatch } from "@/store";

// Inner component that uses hooks (must be inside Provider)
function AuthHydrator({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Hydrate auth state on app load
    dispatch(hydrateAuth());
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AuthHydrator>{children}</AuthHydrator>
    </Provider>
  );
}
