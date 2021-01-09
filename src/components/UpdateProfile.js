import React, { useRef, useState } from 'react'
import { IonCard, IonText, IonButton, IonCardContent, IonItem, IonInput, IonLabel, IonGrid, IonRow, IonCol, IonAlert } from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updatePassword, updateEmail } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError('passwords do not match');
            return;
        }

        const promises = [];
        setLoading(true);
        setError('');
        if(emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }

        if(passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises).then(() => {
            history.push('/');
        }).catch(() => {
            setError('Failed to update account.');
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div style={{height: '100vh', display: 'flex', alignItems: 'center'}}>
            <IonGrid>
                <IonRow>
                    <IonCol offset-md="3" size-md="6">
                        <IonCard>
                            <IonCardContent>
                                {/* {currentUser.email} */}
                                <h1 style={{textAlign: 'center'}}>Update Profile</h1>
                                <form onSubmit={handleSubmit}>
                                    <IonItem>
                                        <IonLabel position="floating">
                                            Email
                                        </IonLabel>
                                        <IonInput type="email" required ref={emailRef} defaultValue={currentUser.email}>
                                        </IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel>
                                            Password
                                        </IonLabel>
                                        <IonInput type="password" placeholder="leave blank to keep the same" ref={passwordRef}>
                                        </IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel>
                                            Password Confirm
                                        </IonLabel>
                                        <IonInput type="password" placeholder="leave blank to keep the same" ref={passwordConfirmRef}>
                                        </IonInput>
                                    </IonItem>
                                    <IonButton type="submit" expand="full" style={{marginTop: '1em'}} disabled={loading}>
                                        Update
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
                                <Link to="/">Cancel</Link>
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
