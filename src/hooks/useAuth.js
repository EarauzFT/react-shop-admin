import React, { useState, useContext, createContext } from "react";
import Cookie from "js-cookie";
import jwt from 'jsonwebtoken';
import axios from "axios";
import endPoints from "@services/api/"

const AuthContext = createContext();

const jwtKey = process.env.JWT_SECRET;

export function ProviderAuth({ children }) {
    const auth = useProviderAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
    return useContext(AuthContext);
};

function useProviderAuth() {
    const [user, setUser] = useState(null);

    const signIn = async (email, password) => {
        const options = {
            headers: {
                accept: '*/*',
                'Content-Type': 'application/json',
            },
        };
        const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);

        if (access_token) {
            const token = access_token.access_token;
            Cookie.set('token', token, { expires: 5 });
            console.log(token)
            axios.defaults.headers.Authorization = `Bearer ${token}`;
            // axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            const { data: user } = await axios.get(endPoints.auth.profile);
            console.log(user)
            setUser(user);
        }
    };

    const logOut = () => {
        Cookie.remove('token');
        setUser(null);
        delete axios.defaults.headers.Authorization;
        window.location.href = '/login'
    }

    const validateSession = async () => {
        const token = Cookie.get('token');
        if (!token) {
            console.log('No active session')
            return false;
        }
        const decodified = jwt.decode(token, jwtKey);
        console.log('key', jwtKey)
        const newToken = jwt.sign({ decodified }, 'VU68i17xT4bYjNdyoMwuSk2sZWCHgJO5', { expiresIn: '15min' });

        try {
            var decoded = jwt.verify(newToken, 'VU68i17xT4bYjNdyoMwuSk2sZWCHgJO5');
            console.log('Valid Session', decoded)
            return true;
        } catch (err) {
            console.log('error', err)
            return false;
        }
    }

    return { user, signIn, logOut, validateSession };
}