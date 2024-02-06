import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getCookie, setCookie } from '../../apis/util/cookieUtil';
import { userInfo } from '../../apis/api/user';

export default function tokenSave() {
    const redirect_uri = 'http://localhost:5173/profile'; //Redirect URI

    async function authRedirect() {
        const access_token = new URL(window.location.href).searchParams.get('access_token');
        const refresh_token = new URL(window.location.href).searchParams.get('refresh_token');
        await setCookie('access_token', access_token);
        await setCookie('refresh_token', refresh_token);

        userInfo(
            ({ data }) => {
                console.log('auth : ', data);
            },
            (error) => {
                console.log('error : ', error);
            }
        );

        // window.location.href = redirect_uri;
    }

    useEffect(() => {
        authRedirect();
    }, []);
    return (
        <div>
            <p>토큰저장</p>
        </div>
    );
}
