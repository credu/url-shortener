import { AuthContext } from "../../context/AuthContext";
import { Form } from "../../components/Form";
import { getDataFromForm } from "../../utils/getDataFromForm";
import { loginUser } from "../../services/authentication/loginUser";
import { useContext, useState } from "react";

export const Login = () => {
    const { setUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const { username, password } = getDataFromForm(form);

        setIsLoading(true);
        loginUser(username, password)
            .then((res) => {
                setUser(res);
            })
            .catch(() => {
                setIsLoading(false);
            });
    };

    return (
        <Form
            fieldList={[
                {
                    type: "text",
                    id: "username",
                    name: "username",
                    defaultValue: "user",
                    placeholder: "username",
                    required: true,
                },
                {
                    type: "password",
                    id: "password",
                    name: "password",
                    defaultValue: "1234",
                    placeholder: "password",
                    required: true,
                },
            ]}
            externalLink={{
                message: "I don't have account",
                path: "/register",
            }}
            buttonText="Login"
            isLoading={isLoading}
            onSubmit={handleSubmit}
        />
    );
};
