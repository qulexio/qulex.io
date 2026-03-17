import React from 'react';
import { supabase } from '../lib/supabase';

const SocialLogin = () => {
    const handleGoogleSignIn = async () => {
        await supabase.auth.signInWithOAuth({ provider: 'google' });
    };

    const handleGithubSignIn = async () => {
        await supabase.auth.signInWithOAuth({ provider: 'github' });
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            padding: '20px'
        }}>
            <button
                onClick={handleGoogleSignIn}
                style={{
                    margin: '10px',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    cursor: 'pointer'
                }}
            >
                Sign Up with Google
            </button>
            <button
                onClick={handleGithubSignIn}
                style={{
                    margin: '10px',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    cursor: 'pointer'
                }}
            >
                Sign Up with GitHub
            </button>
        </div>
    );
};

export default SocialLogin;