import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { loginApi } from "../../services/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ phone, password }) => loginApi({ phone, password }),
    onSuccess: (user) => {
      toast.success("Đăng nhập thành công");
      queryClient.setQueryData(["user"], {
        ...user.user,
        role: "authenticated",
      });

      navigate("/profile", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Tài khoản hoặc mật khẩu không chính xác");
    },
  });

  return { login, isLoading };
}
