import { Form } from "../../components/Form";
import { getDataFromForm } from "../../utils/getDataFromForm";
import { Navigate } from "react-router-dom";
import { registerUser } from "../../services/authentication/registerUser";
import { useState } from "react";

export const Register = () => {
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const { username, password } = getDataFromForm(form);

        setIsLoading(true);
        registerUser(username, password)
            .then(() => {
                setRegisterSuccess(true);
            })
            .catch(() => {
                setIsLoading(false);
            });
    };

    if (registerSuccess) {
        return <Navigate to="/login" />;
    }

    return (
        <Form
            fieldList={[
                {
                    type: "text",
                    id: "username",
                    name: "username",
                    placeholder: "username",
                    required: true,
                    defaultValue: "credu",
                },
                {
                    type: "password",
                    id: "password",
                    name: "password",
                    placeholder: "password",
                    required: true,
                    defaultValue: "1234",
                },
                {
                    type: "password",
                    id: "repeatPassword",
                    name: "repeatPassword",
                    placeholder: "repeat password",
                    required: true,
                    defaultValue: "1234",
                },
            ]}
            externalLink={{ message: "I already have account", path: "/login" }}
            buttonText="Register"
            isLoading={isLoading}
            onSubmit={handleSubmit}
        />
    );
};
