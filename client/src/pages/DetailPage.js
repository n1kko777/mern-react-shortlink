import React, { useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";

export const DetailPage = () => {
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);
  const [currentLink, setCurrentLink] = React.useState(null);
  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const data = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });

      setCurrentLink(data);
    } catch (error) {}
  }, [token, linkId, request]);

  React.useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && currentLink && <LinkCard link={currentLink} />}</>;
};
