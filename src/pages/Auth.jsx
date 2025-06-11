import React, { useState } from 'react';
import api from '../services/api';
import './Auth.css'; 

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      if (isLogin) {
        const res = await api.post('/api/users/login', { email, password });
        alert(`Bem-vindo, ${res.data.name}`);

      } else {
        const res = await api.post('/api/users/register', { name, email, password });
        alert(res.data.message);
        setIsLogin(true);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Erro na requisição';
      alert(msg);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Cadastro'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isLogin ? 'Entrar' : 'Cadastrar'}</button>
      </form>
      <p onClick={toggleMode} className="auth-toggle">
        {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
      </p>
    </div>
  );
};

export default Auth;
