import React, { useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { LinkList } from "../components/LinkList";

export const LinksPage = () => {
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);

  const [links, setLinks] = React.useState([]);

  const fetchLinks = React.useCallback(async () => {
    try {
      const data = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`,
      });

      setLinks(data);
    } catch (error) {}
  }, [token, request]);

  React.useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && <LinkList links={links} />}</>;
};
