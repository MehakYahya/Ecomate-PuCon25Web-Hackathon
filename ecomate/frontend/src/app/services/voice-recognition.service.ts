import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

// Declare types for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {
  private recognition: any;
  private isListening = false;
  private textSubject = new Subject<string>();
  private errorSubject = new Subject<string>();
  private statusSubject = new Subject<boolean>();

  constructor() {
    this.initializeRecognition();
  }

  private initializeRecognition() {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.error('Speech Recognition not supported in this browser');
      return;
    }

    this.recognition = new SpeechRecognition();
    
    // Configure recognition settings
    this.recognition.lang = 'ur-PK'; // Urdu - Pakistan
    this.recognition.continuous = true; // Keep listening
    this.recognition.interimResults = true; // Get results while speaking
    this.recognition.maxAlternatives = 1;

    // Set up event handlers
    this.recognition.onstart = () => {
      this.isListening = true;
      this.statusSubject.next(true);
      console.log('Voice recognition started');
    };

    this.recognition.onresult = (event: any) => {
      let transcript = '';
      
      // Get all results
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      
      // Emit the recognized text
      if (transcript) {
        this.textSubject.next(transcript);
      }
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      this.errorSubject.next(event.error);
      this.isListening = false;
      this.statusSubject.next(false);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.statusSubject.next(false);
      console.log('Voice recognition ended');
    };
  }

  // Start listening
  start(): void {
    if (!this.recognition) {
      this.errorSubject.next('Speech Recognition not supported');
      return;
    }

    if (!this.isListening) {
      try {
        this.recognition.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        this.errorSubject.next('Failed to start voice recognition');
      }
    }
  }

  // Stop listening
  stop(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  // Get recognized text as Observable
  getText(): Observable<string> {
    return this.textSubject.asObservable();
  }

  // Get errors as Observable
  getErrors(): Observable<string> {
    return this.errorSubject.asObservable();
  }

  // Get listening status as Observable
  getStatus(): Observable<boolean> {
    return this.statusSubject.asObservable();
  }

  // Check if currently listening
  isRecording(): boolean {
    return this.isListening;
  }

  // Check if browser supports speech recognition
  isSupported(): boolean {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }
}
