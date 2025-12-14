import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evaluador-contrasenas',
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluador-contrasenas.html',
  styleUrl: './evaluador-contrasenas.css',
})
export class EvaluadorContrasenas {
  activeTab: 'evaluador' | 'generador' = 'evaluador';

  constructor() {
    setTimeout(() => {
      if (this.activeTab === 'generador') {
        this.generatePassword();
      }
    }, 100);
  }

  password: string = '';
  showPassword: boolean = false;

  generatedPassword: string = '';
  passwordLength: number = 16;
  includeUppercase: boolean = true;
  includeLowercase: boolean = true;
  includeNumbers: boolean = true;
  includeSymbols: boolean = true;
  excludeSimilar: boolean = true;
  passwordTheme: 'maxima' | 'facil' = 'maxima';
  showGeneratedPassword: boolean = false;
  copied: boolean = false;

  setTab(tab: 'evaluador' | 'generador') {
    this.activeTab = tab;
    if (tab === 'generador' && !this.generatedPassword) {
      this.generatePassword();
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleGeneratedPasswordVisibility() {
    this.showGeneratedPassword = !this.showGeneratedPassword;
  }

  evaluatePassword(): {
    strength: number;
    level: 'muy-debil' | 'debil' | 'media' | 'fuerte' | 'muy-fuerte';
    criteria: {
      length: boolean;
      uppercase: boolean;
      lowercase: boolean;
      numbers: boolean;
      symbols: boolean;
    };
    recommendations: string[];
    score: number;
  } {
    const pwd = this.password;
    const criteria = {
      length: pwd.length >= 12,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      numbers: /[0-9]/.test(pwd),
      symbols: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    };

    let score = 0;
    if (criteria.length) score += 2;
    if (criteria.uppercase) score += 1;
    if (criteria.lowercase) score += 1;
    if (criteria.numbers) score += 1;
    if (criteria.symbols) score += 1;

    const strength = Math.min(100, (score / 6) * 100);

    let level: 'muy-debil' | 'debil' | 'media' | 'fuerte' | 'muy-fuerte';
    if (strength < 20) level = 'muy-debil';
    else if (strength < 40) level = 'debil';
    else if (strength < 60) level = 'media';
    else if (strength < 80) level = 'fuerte';
    else level = 'muy-fuerte';

    const recommendations: string[] = [];
    if (!criteria.length) recommendations.push('Aumenta la longitud a al menos 12 caracteres');
    if (!criteria.uppercase) recommendations.push('Agrega letras mayúsculas');
    if (!criteria.lowercase) recommendations.push('Agrega letras minúsculas');
    if (!criteria.numbers) recommendations.push('Incluye números');
    if (!criteria.symbols) recommendations.push('Añade caracteres especiales (!@#$%^&*)');
    if (pwd.length > 0 && recommendations.length === 0) {
      recommendations.push('¡Excelente! Tu contraseña es muy segura');
    }
    if (pwd.length === 0) {
      recommendations.push('Intenta usar emojis permitidos para mayor seguridad');
      recommendations.push('Considera usar frases completas en lugar de palabras');
    }

    return { strength, level, criteria, recommendations, score };
  }

  getStrengthColor(): string {
    const evaluation = this.evaluatePassword();
    switch (evaluation.level) {
      case 'muy-debil':
        return '#dc3545';
      case 'debil':
        return '#fd7e14';
      case 'media':
        return '#ffc107';
      case 'fuerte':
        return '#28a745';
      case 'muy-fuerte':
        return '#20c997';
      default:
        return '#6c757d';
    }
  }

  generatePassword() {
    let charset = '';
    if (this.includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (this.includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (this.includeNumbers) charset += '0123456789';
    if (this.includeSymbols) charset += '!@#$%^&*(),.?":{}|<>';

    if (this.excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, '');
    }

    if (charset.length === 0) {
      this.generatedPassword = '';
      return;
    }

    let password = '';
    for (let i = 0; i < this.passwordLength; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    this.generatedPassword = password;
    this.showGeneratedPassword = true;
  }

  copyPassword() {
    if (this.generatedPassword) {
      navigator.clipboard.writeText(this.generatedPassword).then(() => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      });
    }
  }

  regeneratePassword() {
    this.generatePassword();
  }

  getGeneratedStrength(): number {
    if (!this.generatedPassword) return 0;
    const temp = this.password;
    this.password = this.generatedPassword;
    const strength = this.evaluatePassword().strength;
    this.password = temp;
    return strength;
  }

  getMnemonicSuggestion(): string {
    if (!this.generatedPassword) return '';
    const suggestions = [
      'Crea una frase con las primeras letras de cada palabra',
      'Asocia cada carácter con una palabra que recuerdes',
      'Divide la contraseña en grupos de 4 caracteres',
      'Usa un patrón personal que solo tú conozcas',
    ];
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  }

  Math = Math;
}
