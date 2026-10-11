import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth"; // Path check karlein agar auth context use kar rahe hain

const Logout = () => {
    const { LogoutUser } = useAuth(); // Agar aapne auth provider mein logout function banaya hai

    useEffect(() => {
        // 1. Token ko Local Storage se khatam karein
        localStorage.removeItem("token");
        
        // 2. Agar context use kar rahe hain to wahan bhi state update karein
        if (LogoutUser) {
            LogoutUser();
        }
    }, [LogoutUser]);

    // 3. User ko foran Sign In page par redirect kar dein
    return <Navigate to="/signin" />;
};

// YEH LINE SAB SE ZARURI HAI (Aapka error isi wajah se tha)
export default Logout;