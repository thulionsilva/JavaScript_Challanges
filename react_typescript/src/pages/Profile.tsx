import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/LoginContext';

function Profile() {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');

    const {user, login, logout} = useAuth();
    console.log(user);
    if (!user){
        window.location.href = '/login';
    }

    useEffect(() => {
    fetch('http://localhost:3030/api/userData?user_name='+user).then((response) => {
        const user_info = response.json();
        user_info.then((data) => {
            setUsername(data[0].user_name);
            setEmail(data[0].email);
            setName(data[0].nome);
        })
    });
    },[user]);
    

    const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Enviar os dados de login para o servidor
        const res = await fetch('http://localhost:3030/api/updateProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username : username, password : password, email : email, nome : name }),
        });

        // Redirecionar para a página inicial após o login
        window.location.href = '/';

    }
    return (
        <div className="App-header">
            <div className="login">
                <div>
                    <h3>Informações do Perfil</h3>
                </div>
                <div>
                    <form onSubmit={handleProfileUpdate}>
                        <div className="input_login">
                            <label htmlFor="username">Usuário:</label>
                            <input className="input_box" type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
                        </div>
                        <div className="input_login">
                            <label htmlFor="email">e-mail:</label>
                            <input className="input_box" type="text" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="input_login">
                            <label htmlFor="nome">nome:</label>
                            <input className="input_box" type="text" id="nome" name="nome" value={name} onChange={e => setName(e.target.value)}/>
                        </div>
                        <div className="input_login">
                            <label htmlFor="password">Senha:</label>
                            <input className="input_box" type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <button type="submit" >Salvar</button>
                    </form>
                    
                </div>
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
export default Profile;
