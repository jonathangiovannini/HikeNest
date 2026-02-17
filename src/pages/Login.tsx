import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import SimpleFooter from "../components/SimpleFooter";

const inputTxtStyle =
    "w-full px-4 py-3 bg-white border border-mine-shaft-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mine-shaft-950 focus:border-transparent transition-all";

function Login() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const location = useLocation();
    useDocumentTitle("Login - HikeNest");

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const from = (location.state as any)?.from ?? "/";

    const handleAuthSuccess = (data: any) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.mail);
        localStorage.setItem("userId", data.id);
        navigate(from, { replace: true });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(apiUrl + "/autenticazione", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mail: email, password: password }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Errore di login");
            }

            const data = await response.json();
            handleAuthSuccess(data);
        } catch (err: any) {
            alert(err.message ?? "Errore di login");
        }
    };


    const handleGoogleSuccess = async (credentialResponse: { credential?: string }) => {
        if (!credentialResponse.credential) {
            alert("Impossibile ottenere il token Google.");
            return;
        }
        setIsGoogleLoading(true);
        try {
            const response = await fetch(apiUrl + "/autenticazione", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ googleToken: credentialResponse.credential }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Errore di login con Google");
            }

            const data = await response.json();
            handleAuthSuccess(data);
        } catch (err: any) {
            alert(err.message ?? "Errore di login con Google");
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <>
            

            <div className="mt-8 flex items-center justify-center p-4 bg-mine-shaft-50">
                <div className="max-w-md w-full space-y-6">
                    <div className="text-center">
                        <Link to="/" className="inline-block">
                            <img
                                src="/Logo.png"
                                alt="logo-hikenest"
                                className="w-36 mx-auto mb-4"
                            />
                        </Link>
                        <h1 className="text-3xl font-bold text-mine-shaft-950 mb-2">
                            Bentornato!
                        </h1>
                        <p className="text-mine-shaft-600">
                            Accedi per continuare la tua avventura
                        </p>
                    </div>

                    <form className="bg-white rounded-lg shadow-sm border border-mine-shaft-200 p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-mine-shaft-700 mb-2">
                                Email
                            </label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="@email.com"
                                className={inputTxtStyle}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-mine-shaft-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={inputTxtStyle}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-mine-shaft-500 hover:text-mine-shaft-700"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-mine-shaft-300 text-mine-shaft-950 focus:ring-mine-shaft-950 cursor-pointer"
                                />
                                <span className="text-sm text-mine-shaft-600">Ricordami</span>
                            </label>
                            <a href="#" className="text-sm text-mine-shaft-950 hover:underline font-medium">
                                Password dimenticata?
                            </a>
                        </div>

                        <input
                            type="button"
                            className="w-full py-3 px-4 bg-mine-shaft-950 text-white font-medium rounded-lg hover:bg-mine-shaft-800 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                            value="Login"
                            onClick={handleSubmit}
                        />
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-mine-shaft-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-mine-shaft-50 text-mine-shaft-500">oppure</span>
                        </div>
                    </div>

                    <div id="google-login-wrapper">
                        <GoogleLoginButton
                            onSuccess={handleGoogleSuccess}
                            isLoading={isGoogleLoading}
                        />
                    </div>

                    <p className="text-center text-sm text-mine-shaft-600">
                        Non hai un account?{" "}
                        <Link to="/signup" className="font-medium text-mine-shaft-950 hover:underline">
                            Registrati
                        </Link>
                    </p>
                </div>
            </div>
            <SimpleFooter />
        </>
    );
}

import { GoogleLogin } from "@react-oauth/google";

interface GoogleLoginButtonProps {
    onSuccess: (resp: { credential?: string }) => void;
    isLoading: boolean;
}

function GoogleLoginButton({ onSuccess, isLoading }: GoogleLoginButtonProps) {
    return (
        <div className="flex justify-center mt-2">
            {isLoading ? (
                <div className="w-full max-w-md flex items-center justify-center gap-3 py-3 px-4 border-2 border-mine-shaft-200 rounded-lg text-sm font-medium bg-white text-mine-shaft-500">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Accesso con Google in corso...
                </div>
            ) : (
                <GoogleLogin
                    onSuccess={onSuccess}
                    onError={() => alert("Login con Google fallito. Riprova.")}
                    useOneTap={false}
                    text="continue_with"
                    shape="rectangular"
                    theme="outline"
                    size="large"
                    width="448"
                />
            )}
        </div>
    );
}

export default Login;
