import React from "react";
import { Button, Input, VStack} from "@chakra-ui/react";
import { Field } from "../ui/field";
import { FormControl } from "@chakra-ui/form-control"
import { useForm } from "react-hook-form";
import AuthService, { RegisterRequest } from "../../service/AuthService";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterRequest>();

  const onSubmit = async (data: RegisterRequest) => {
    try {
      const response = await AuthService.register(data);
      console.log("Cadastro realizado com sucedido:", response);

      navigate("/login");

    } catch (error: any) {
      console.error("Erro ao fazer o cadastro:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap="7" align="center" maxW="sm">
        <FormControl id="nome" isRequired className="control">
            <Field
              label="Nome de Usuario"
            >
              <Input
                type="text"
                {...register("nome", { required: "Preencha o campo de nome." })}
                placeholder="Fulano da Silva"
              />
            </Field>
          </FormControl>
          <FormControl id="email" isRequired className="control">
            <Field
              label="E-mail"
            >
              <Input
                type="email"
                {...register("email", { required: "Preencha o campo de e-mail." })}
                placeholder="fulano@gmail.com"
              />
            </Field>
          </FormControl>
          <Field
            label="Senha"
          >
            <Input
              type="password"
              {...register("senha", { required: "Preencha o campo de senha." })}
              placeholder="fulano123"
            />
          </Field>
          <Button type="submit" className="button-cadastrar">Cadastrar</Button>
        </VStack>
      </form>
    </>
  );
};

export default RegisterForm