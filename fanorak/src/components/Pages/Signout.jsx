
import { getAuthToken, setAuthToken } from '../../AuthService';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const Signout = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        setAuthToken('');
        navigate('/');
    },[])
}