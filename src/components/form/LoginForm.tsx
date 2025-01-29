import React, { useState } from "react";
import { Box, Button, defineStyle, Input, VStack, Field, IconButton } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import AuthService, { LoginRequest } from "../../service/AuthService";
import { useNavigate } from "react-router-dom";
import { toaster } from "../ui/toaster";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<LoginRequest>();
    const [showPassword, setShowPassword] = useState(false);


    const onSubmit = async (data: LoginRequest) => {
        try {
            const response = await AuthService.login(data);
            console.log("Login bem-sucedido:", response);

            localStorage.setItem("token", response.token);
            localStorage.setItem("userId", String(response.id));
            navigate("/");
            window.location.reload();
        } catch (error: any) {
            console.error("Erro ao fazer login:", error);
            toaster.create({
                title: "Erro ao realizar o cadastro.",
                type: "error",
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "1em", width: "100%" }}>
                <VStack gap="5" align="center" p={2}>
                    <Field.Root>
                        <Box pos="relative" w="full">
                            <Input
                                className="peer"
                                placeholder=""
                                type="email"
                                {...register("email")} />
                            <Field.Label css={floatingStyles}>E-mail</Field.Label>
                        </Box>
                    </Field.Root>

                    <Field.Root>
                        <Box pos="relative" w="full">
                            <Input
                                className="peer"
                                type={showPassword ? "text" : "password"}
                                {...register("senha", { required: "Preencha o campo de senha." })}
                                placeholder=""
                            />
                            <IconButton
                                pos="absolute"
                                top="50%"
                                right="1rem"
                                transform="translateY(-50%)"
                                size="xs"
                                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                onClick={() => setShowPassword(!showPassword)}
                                variant="ghost"
                                bg={"transparent"}
                                _hover={{bg:"gray.200"}}
                                >

                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </IconButton>
                            <Field.Label css={floatingStyles}>Senha</Field.Label>
                        </Box>
                    </Field.Root>
                    <Button type="submit" className="button">Entrar</Button>
                </VStack>
            </form>
        </>
    );
};

export default LoginForm;


const floatingStyles = defineStyle({
    pos: "absolute",
    bg: "bg",
    px: "0.5",
    top: "-3",
    insetStart: "2",
    fontWeight: "normal",
    pointerEvents: "none",
    transition: "all 0.2s ease",
    _peerPlaceholderShown: {
        color: "fg.muted",
        top: "2.5",
        insetStart: "3",
    },
    _peerFocusVisible: {
        color: "fg",
        top: "-3",
        insetStart: "2",
    },
});
