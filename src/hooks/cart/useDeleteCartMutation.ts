import { useMutation } from "@tanstack/react-query";
import { DeleteCartApi } from "@api/shoppingCart/shoppingCartApi";

interface Delete {
  statusCode: number;
  message: string;
  successful?: boolean;
}

interface props {
  cart_ids: number[];
  accessToken: string;
}

interface returnType {
  statusCode: number;
  message: string;
  successful?: boolean;
}

export const useDeleteCart = () => {
  return useMutation<Delete, Error, props>({
    mutationFn: ({ accessToken, cart_ids }: props) =>
      DeleteCartApi({ accessToken, cart_ids }),
    onSuccess: (res) => {
      console.log(res.statusCode, res.message);
    },
    onError: (err) => {
      console.log(err);
    }
  });
};
