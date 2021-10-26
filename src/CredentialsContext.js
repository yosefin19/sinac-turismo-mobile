import { createContext } from "react";

// Contexto de las credenciales
export const CredentialsContext = createContext({
  storedCredentials: {},
  setStoredCredentials: () => {},
});
