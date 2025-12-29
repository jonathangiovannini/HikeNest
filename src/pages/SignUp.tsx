import { useState } from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";

const inputTxtStyle = "w-full px-4 py-3 bg-white border border-mine-shaft-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mine-shaft-950 focus:border-transparent transition-all";


function SignUp() {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    useDocumentTitle('Sign Up - HikeNest');


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleSubmit = async() => {
        if (password !== confirmPassword) {
            alert("Le password non corrispondono");
            return;
        }
        try {
            const response = await fetch(apiUrl + "/registrazione", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mail: email,
                password: password,
                username: username
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.message || "Errore di login");
        }

        alert("Account creato con successo");
        console.log("Registrazione riuscita!");
        
        navigate("/login");
        } catch (err) {
            console.error("Errore login:");
            alert("err.message");
        }
    };

    return (
        <>
            <div className="mt-8 flex items-center justify-center p-4 bg-mine-shaft-50">
                <div className="max-w-2xl w-full space-y-6">
                    <div className="text-center">
                        <Link to="/" className="inline-block">
                            <img src="images/Logo.png" alt="logo-hikenest" className="w-36 mx-auto mb-4" />
                        </Link>
                        <h1 className="text-3xl font-bold text-mine-shaft-950 mb-2">
                            Crea il tuo account
                        </h1>
                        <p className="text-mine-shaft-600">
                            Unisciti alla community di HikeNest
                        </p>
                    </div>

                    <form className="bg-white rounded-lg shadow-sm border border-mine-shaft-200 p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-mine-shaft-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Il tuo username"
                                className={`${inputTxtStyle}`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-mine-shaft-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="@email.com"
                                className={`${inputTxtStyle}`}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-mine-shaft-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className={`${inputTxtStyle}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-mine-shaft-500 hover:text-mine-shaft-700"
                                    >
                                        {showPassword ? (
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-mine-shaft-700 mb-2">
                                    Conferma Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className={`${inputTxtStyle}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-mine-shaft-500 hover:text-mine-shaft-700"
                                    >
                                        {showConfirmPassword ? (
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <input
                                type="checkbox"
                                id="terms"
                                className="w-4 h-4 rounded border-mine-shaft-300 text-mine-shaft-950 focus:ring-mine-shaft-950 cursor-pointer"
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm text-mine-shaft-600 cursor-pointer"
                            >
                                Accetto i{" "}
                                <a
                                    href="#"
                                    className="text-mine-shaft-950 hover:underline font-medium"
                                >
                                    Termini e Condizioni
                                </a>{" "}
                                e la{" "}
                                <a
                                    href="#"
                                    className="text-mine-shaft-950 hover:underline font-medium"
                                >
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        <input
                            type="button"
                            onClick={handleSubmit}
                            className="w-full py-3 px-4 bg-mine-shaft-950 text-white font-medium rounded-lg hover:bg-mine-shaft-800 transition-all duration-200 shadow-md hover:shadow-lg"
                            value='Crea Account'
                        />
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-mine-shaft-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-mine-shaft-50 text-mine-shaft-500">
                                oppure
                            </span>
                        </div>
                    </div>

                    <button
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-mine-shaft-200 rounded-lg text-sm font-medium hover:bg-mine-shaft-100 transition-all duration-200 bg-white">
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_17_40)">
                                <path
                                    d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                                    fill="#FBBC04"
                                />
                                <path
                                    d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                                    fill="#EA4335"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_17_40">
                                    <rect width="48" height="48" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        Registrati con Google
                    </button>

                    <p className="text-center text-sm text-mine-shaft-600 mb-8">
                        Hai già un account?{" "}
                        <a
                            href="/login"
                            className="font-medium text-mine-shaft-950 hover:underline"
                        >
                            Accedi
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default SignUp;
