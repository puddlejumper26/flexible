"use client";

import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | undefined;
};

type Providers = Record<string, Provider>;

function AuthProvider(): JSX.Element {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      let res = await getProviders();
      console.log("AuthProvider: res -", res);

      setProviders(res);
    };
    fetchProviders();
  }, []);

  return (
    <div>
      {providers &&
        Object.values(providers).map((provider: Provider, i) => (
          <button key={i} type="button" onClick={() => signIn(provider.id)}>
            {provider.id}
          </button>
        ))}
    </div>
  );
}

export default AuthProvider;
