
import { initializeApp } from 'firebase'

const app = initializeApp({
    apiKey: "AIzaSyBLBAXTTkYsV6cimw8bCbfG3s4ZxV-KCZs",
    authDomain: "node-ea286.firebaseapp.com",
    databaseURL: "https://node-ea286.firebaseio.com",
    projectId: "node-ea286",
    storageBucket: "node-ea286.firebaseio.com",
    messagingSenderId: "63912031259"
})

export const db = app.database()
export const shortRef = db.ref('short')