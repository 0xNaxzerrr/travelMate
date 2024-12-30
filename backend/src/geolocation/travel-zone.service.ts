import { Injectable } from '@nestjs/common';
import { DistanceCalculatorService } from './distance-calculator.service';

export interface GeographicBoundary {
  northEast: { latitude: number; longitude: number };
  southWest: { latitude: number; longitude: number };
}

@Injectable()
export class TravelZoneService {
  constructor(private readonly distanceCalculator: DistanceCalculatorService) {}

  /**
   * Détermine si un point est à l'intérieur d'une zone géographique
   * @param point Point à vérifier
   * @param boundary Limites géographiques
   * @returns true si le point est dans la zone, false sinon
   */
  isPointInZone(point: { latitude: number; longitude: number }, boundary: GeographicBoundary): boolean {
    return (
      point.latitude <= boundary.northEast.latitude &&
      point.latitude >= boundary.southWest.latitude &&
      point.longitude >= boundary.southWest.longitude &&
      point.longitude <= boundary.northEast.longitude
    );
  }

  /**
   * Calcule la zone de voyage autour d'un point central
   * @param center Point central
   * @param radiusKm Rayon en kilomètres
   * @returns Limites géographiques
   */
  calculateTravelZone(center: { latitude: number; longitude: number }, radiusKm: number): GeographicBoundary {
    const latChange = radiusKm / 111; // Approximation : 1 degré de latitude ≈ 111 km
    const lonChange = radiusKm / (111 * Math.cos(this.toRadians(center.latitude)));

    return {
      northEast: {
        latitude: center.latitude + latChange,
        longitude: center.longitude + lonChange
      },
      southWest: {
        latitude: center.latitude - latChange,
        longitude: center.longitude - lonChange
      }
    };
  }

  /**
   * Calcule la distance entre deux zones géographiques
   * @param zone1 Première zone
   * @param zone2 Deuxième zone
   * @returns Distance en kilomètres entre les centres des zones
   */
  calculateDistanceBetweenZones(zone1: GeographicBoundary, zone2: GeographicBoundary): number {
    const center1 = this.calculateZoneCenter(zone1);
    const center2 = this.calculateZoneCenter(zone2);

    return this.distanceCalculator.calculateDistance(
      center1.latitude, center1.longitude,
      center2.latitude, center2.longitude
    );
  }

  /**
   * Calcule le centre d'une zone géographique
   * @param zone Zone géographique
   * @returns Point central de la zone
   */
  private calculateZoneCenter(zone: GeographicBoundary): { latitude: number; longitude: number } {
    return {
      latitude: (zone.northEast.latitude + zone.southWest.latitude) / 2,
      longitude: (zone.northEast.longitude + zone.southWest.longitude) / 2
    };
  }

  /**
   * Convertit des degrés en radians
   * @param degrees Angle en degrés
   * @returns Angle en radians
   */
  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}