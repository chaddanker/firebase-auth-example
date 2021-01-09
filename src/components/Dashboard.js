import React, { useState } from 'react'
import { IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonText, IonAlert } from '@ionic/react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {

    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <div style={{height: '100vh', display: 'flex', alignItems: 'center'}}>
            <IonGrid>
                <IonRow>
                    <IonCol offset-md="3" size-md="6">
                        <IonCard>
                            <IonCardContent>
                                <h1>
                                    Profile
                                </h1>
                                <p>{currentUser.email}</p>
                                <Link to="update-profile">Update Profile</Link>
                            </IonCardContent>
                        </IonCard>
                        <div style={{
                            width: '100%',
                            textAlign: 'center',
                            marginTop: '2em'
                        }}>
                            <IonText>
                                <a onClick={handleLogout}>Logout</a>
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
