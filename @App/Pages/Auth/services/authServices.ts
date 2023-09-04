import { BaseService } from "@/@App/@Core/service/BaseService";

class Auth extends BaseService {
  register = (data: any) => {
    const endpoint = "/api/auth/register";
    return this.post({ endpoint, data });
  };

  login = (data: any) => {
    const endpoint = "/api/auth/login";
    return this.post({ endpoint, data });
  };

  me = () => {
    const endpoint = "/api/auth/me";
    return this.get({ endpoint });
  };
}
export const authService = new Auth();
