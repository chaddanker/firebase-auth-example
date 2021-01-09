import React, { useRef, useState } from 'react';
import { IonCard, IonText, IonButton, IonCardContent, IonItem, IonInput, IonLabel, IonGrid, IonRow, IonCol, IonAlert } from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'; 

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch {
            setError('failed to sign in');
        }
        setLoading(false);
        
    }

    return (
        <div style={{height: '100vh', display: 'flex', alignItems: 'center'}}>
            <IonGrid>
                <IonRow>
                    <IonCol offset-md="3" size-md="6">
                        <IonCard>
                            <IonCardContent>
                                {/* {currentUser.email} */}
                                <h1 style={{textAlign: 'center'}}>Login</h1>
                                <form onSubmit={handleSubmit}>
                                    <IonItem>
                                        <IonLabel position="floating">
                                            Email
                                        </IonLabel>
                                        <IonInput type="email" required ref={emailRef}>
                                        </IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">
                                            Password
                                        </IonLabel>
                                        <IonInput type="password" required ref={passwordRef}>
                                        </IonInput>
                                    </IonItem>
                                    <IonButton type="submit" expand="full" style={{marginTop: '1em'}} disabled={loading}>
                                        Login
                                    </IonButton>
                                </form>
                                <div style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    marginTop: '1em'
                                }}>
                                    <IonText>
                                        <Link to="/forgot-password">forgot password?</Link>
                                    </IonText>
                                </div>
                            </IonCardContent>
                        </IonCard>
                        <div style={{
                            width: '100%',
                            textAlign: 'center',
                            marginTop: '2em'
                        }}>
                            <IonText>
                                Need in account? <Link to="/signup">Sign Up</Link>
                            </IonText>
                        </div>
                    </IonCol>
                </IonRow>
            </IonGrid>
            <IonAlert
                isOpen={error !== ''}
                onDidDismiss={() => setError('')}
                header={'Error'}
                message={error}
                buttons={['OK']}
            />
        </div>
    )
}
