import { useState, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const useHttp = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "POST", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }
        const res = await fetch(url, {
          method,
          body,
          headers,
        });

        if (res.status === 401) {
          auth.logout();
          history.push("/");
        }

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Что-то пощло не так...");
        }

        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        setError(error.message);
        throw error;
      }
    },
    [auth, history]
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, request, clearError, setLoading };
};
