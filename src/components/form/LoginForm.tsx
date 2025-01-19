import React, { useState } from "react";
import { Field } from "../ui/field";
import { Button, Input, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import AuthService, { LoginRequest } from "../../service/AuthService";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../alert/ErrorAlert";
import { FormControl } from "@chakra-ui/form-control";

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const onSubmit = async (data: LoginRequest) => {
        try {
            const response = await AuthService.login(data);
            console.log("Login bem-sucedido:", response);

            localStorage.setItem("token", response.token);
            localStorage.setItem("userId", String(response.id));

            navigate("/home");
        } catch (error: any) {
            console.error("Erro ao fazer login:", error);
            setErrorMessage("Credenciais inválidas. Tente novamente.");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap="7" align="center" maxW="sm">
                    <FormControl id="nome" isRequired className="control">
                        <Field
                            label="E-mail"
                            invalid={!!errors.email}
                            errorText={errors.email?.message}
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
                        invalid={!!errors.senha}
                        errorText={errors.senha?.message}
                    >
                        <Input
                            type="password"
                            {...register("senha", { required: "Preencha o campo de senha." })}
                            placeholder="fulano123"
                        />
                    </Field>
                    {errorMessage && (
                        <ErrorAlert message={errorMessage} onClose={() => setErrorMessage("")} />
                    )}
                    <Button type="submit" className="button-entrar">Entrar</Button>
                </VStack>
            </form>
        </>
    );
};

export default LoginForm;
