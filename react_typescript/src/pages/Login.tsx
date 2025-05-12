import { useState } from 'react';
import { useAuth } from '../contexts/LoginContext';

function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const {user, login, logout} = useAuth();
    console.log(user);


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Enviar os dados de login para o servidor
        const res = await fetch('http://localhost:3030/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username : username, password : password }),
        });
        const data = await res.json();
        if (data.length === 0) {
            alert("Usuário ou senha incorretos");
        }
        else {
            alert("Login realizado com sucesso");
            login(data[0].user_name);
            console.log(user);
        }

        // Redirecionar para a página inicial após o login
        window.location.href = '/';

    }
    return (
        <div className="App-header">
        <div className="login">
            <div>
                <h3>Login</h3>
            </div>
            <div>
                <form onSubmit={handleLogin}>
                    <div className="input_login">
                        <label htmlFor="username">Usuário:</label>
                        <input className="input_box" type="text" id="username" name="username" onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className="input_login">
                        <label htmlFor="password">Senha:</label>
                        <input className="input_box" type="password" id="password" name="password" onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" >Entrar</button>
            </form>
            </div>
        </div>
        </div>
    );
}
export default Login;
