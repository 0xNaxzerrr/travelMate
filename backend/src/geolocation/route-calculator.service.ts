import { Injectable } from '@nestjs/common';
import { DistanceCalculatorService } from './distance-calculator.service';

export interface RoutePoint {
  latitude: number;
  longitude: number;
  name?: string;
  description?: string;
}

@Injectable()
export class RouteCalculatorService {
  constructor(private readonly distanceCalculator: DistanceCalculatorService) {}

  /**
   * Calcule l'itinéraire optimal entre plusieurs points
   * @param points Liste des points à visiter
   * @returns Itinéraire optimisé
   */
  calculateOptimalRoute(points: RoutePoint[]): RoutePoint[] {
    if (points.length <= 1) return points;

    const route: RoutePoint[] = [points[0]]; // Commence par le premier point
    const remainingPoints = points.slice(1);

    while (remainingPoints.length > 0) {
      const lastPoint = route[route.length - 1];
      const nearestPointIndex = this.findNearestPoint(lastPoint, remainingPoints);
      route.push(remainingPoints[nearestPointIndex]);
      remainingPoints.splice(nearestPointIndex, 1);
    }

    return route;
  }

  /**
   * Trouve l'index du point le plus proche
   * @param currentPoint Point de référence
   * @param points Liste de points à comparer
   * @returns Index du point le plus proche
   */
  private findNearestPoint(currentPoint: RoutePoint, points: RoutePoint[]): number {
    let minDistance = Infinity;
    let nearestIndex = 0;

    points.forEach((point, index) => {
      const distance = this.distanceCalculator.calculateDistance(
        currentPoint.latitude, currentPoint.longitude,
        point.latitude, point.longitude
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = index;
      }
    });

    return nearestIndex;
  }

  /**
   * Calcule la distance totale d'un itinéraire
   * @param route Liste de points de l'itinéraire
   * @returns Distance totale en kilomètres
   */
  calculateTotalRouteDistance(route: RoutePoint[]): number {
    let totalDistance = 0;

    for (let i = 0; i < route.length - 1; i++) {
      const distance = this.distanceCalculator.calculateDistance(
        route[i].latitude, route[i].longitude,
        route[i + 1].latitude, route[i + 1].longitude
      );
      totalDistance += distance;
    }

    return Math.round(totalDistance * 100) / 100;
  }
}