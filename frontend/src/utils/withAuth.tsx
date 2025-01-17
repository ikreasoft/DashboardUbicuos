import React from "react";
import { useAuth } from "@contexts/AuthContext";
import { useRouter } from "next/navigation";

const withAuth = (Component: React.ComponentType) => {
  return function ProtectedRoute(props: any) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null; // Renderizar algo mientras redirige
    }

    return <Component {...props} />;
  };
};

export default withAuth;
