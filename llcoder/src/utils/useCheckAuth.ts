import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

export const useCheckAuth = () => {
  const navigattion = useNavigate();

  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (!loading) {
      if (!data?.me) navigattion("/");
    }
  }, [data, loading, navigattion]);

  return { data, loading };
};
