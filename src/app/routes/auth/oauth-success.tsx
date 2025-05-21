// src/pages/OAuthSuccessPage.tsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { decodeBase64Url } from "../../../utils/url";
import { LoggedUser } from "../../../types/api";
import { TokenService } from "../../../lib/token-service";
import { paths } from "../../../config/paths";
import LoadingIndicator from "../../../components/ui/loading-indicator";
import { useQueryClient } from "@tanstack/react-query";

export default function OAuthSuccessPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryClient = useQueryClient();

  async function handleOAuth() {
    const params = new URLSearchParams(search);
    const token = params.get("token");
    const userEnc = params.get("user");

    if (!token || !userEnc) {
      navigate(paths.auth.login.getHref());
      return;
    }

    const user = decodeBase64Url<LoggedUser>(userEnc);
    if (!user) {
      navigate(paths.auth.login.getHref());
      return;
    }

    TokenService.setAccessToken(token);
    TokenService.saveUser(user);

    queryClient.clear();

    navigate(paths.app.getHref());
  }

  useEffect(() => {
    handleOAuth();
  }, [search, navigate]);

  return <LoadingIndicator message="Cargando..." />;;
}
function userQueryClient() {
  throw new Error("Function not implemented.");
}

