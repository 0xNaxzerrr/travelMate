import { Injectable } from '@nestjs/common';

@Injectable()
export class DistanceCalculatorService {
  /**
   * Calcule la distance entre deux points géographiques en utilisant la formule de Haversine
   * @param lat1 Latitude du premier point
   * @param lon1 Longitude du premier point
   * @param lat2 Latitude du deuxième point
   * @param lon2 Longitude du deuxième point
   * @returns Distance en kilomètres
   */
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return Math.round(distance * 100) / 100; // Arrondi à 2 décimales
  }

  /**
   * Convertit des degrés en radians
   * @param degrees Angle en degrés
   * @returns Angle en radians
   */
  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Calcule le point médian entre deux points géographiques
   * @param lat1 Latitude du premier point
   * @param lon1 Longitude du premier point
   * @param lat2 Latitude du deuxième point
   * @param lon2 Longitude du deuxième point
   * @returns Objet contenant les coordonnées du point médian
   */
  calculateMidpoint(lat1: number, lon1: number, lat2: number, lon2: number): { latitude: number, longitude: number } {
    const dLon = this.toRadians(lon2 - lon1);
    
    const Bx = Math.cos(this.toRadians(lat2)) * Math.cos(dLon);
    const By = Math.cos(this.toRadians(lat2)) * Math.sin(dLon);
    
    const lat3 = Math.atan2(Math.sin(this.toRadians(lat1)) + Math.sin(this.toRadians(lat2)),
                    Math.sqrt((Math.cos(this.toRadians(lat1)) + Bx) * 
                    (Math.cos(this.toRadians(lat1)) + Bx) + By * By));
    
    const lon3 = this.toRadians(lon1) + Math.atan2(By, Math.cos(this.toRadians(lat1)) + Bx);
    
    return {
      latitude: this.toDegrees(lat3),
      longitude: this.toDegrees(lon3)
    };
  }

  /**
   * Convertit des radians en degrés
   * @param radians Angle en radians
   * @returns Angle en degrés
   */
  private toDegrees(radians: number): number {
    return radians * (180 / Math.PI);
  }
}