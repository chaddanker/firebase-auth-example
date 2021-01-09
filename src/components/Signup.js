import React, { useRef, useState } from 'react'
import { IonCard, IonText, IonButton, IonCardContent, IonItem, IonInput, IonLabel, IonGrid, IonRow, IonCol, IonAlert } from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup, currentUser} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError('passwords do not match');
            return;
        }
        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch {
            setError('failed to create account');
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
                                <h1 style={{textAlign: 'center'}}>Sign Up</h1>
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
                                    <IonItem>
                                        <IonLabel position="floating">
                                            Password Confirm
                                        </IonLabel>
                                        <IonInput type="password" required ref={passwordConfirmRef}>
                                        </IonInput>
                                    </IonItem>
                                    <IonButton type="submit" expand="full" style={{marginTop: '1em'}} disabled={loading}>
                                        Sign Up
                                    </IonButton>
                                </form>
                            </IonCardContent>
                        </IonCard>
                        <div style={{
                            width: '100%',
                            textAlign: 'center',
                            marginTop: '2em'
                        }}>
                            <IonText>
                                Already have an account? <Link to="/login">Log In</Link>
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
